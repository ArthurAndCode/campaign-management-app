import { useState, useEffect } from 'react';
import { useRouteLoaderData, useActionData, useNavigation } from 'react-router-dom';
import api from '../services/api';
import CampaignFilters from '../components/CampaignFilters';
import CampaignForm from '../components/CampaignForm';
import CampaignList from '../components/CampaignList';

export default function CampaignPage() {
    const user = useRouteLoaderData('root');
    const actionData = useActionData();
    const navigation = useNavigation();

    const [campaigns, setCampaigns] = useState([]);
    const [products, setProducts] = useState([]);
    const [towns, setTowns] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [filters, setFilters] = useState({});
    const [editingId, setEditingId] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async (query = {}, pageNum = 0) => {
        try {
            const queryString = new URLSearchParams({
                ...query,
                ownerId: user.id,
                page: pageNum,
            }).toString();

            const [campaignsRes, productsRes, townsRes, keywordsRes] = await Promise.all([
                api.get(`/campaigns?${queryString}`),
                api.get(`/products/owners/${user.id}?size=50`),
                api.get('/towns'),
                api.get('/keywords'),
            ]);

            setCampaigns(campaignsRes.data.content);
            setTotalPages(campaignsRes.data.totalPages);
            setProducts(productsRes.data.content);
            setTowns(townsRes.data);
            setKeywords(keywordsRes.data);
        } catch (error) {
            console.error("Error loading campaign data", error);
        }
    };

    useEffect(() => {
        fetchData(filters, page);
    }, [page]);

    const handleSearch = (query) => {
        setFilters(query);
        setPage(0);
        fetchData(query, 0);
    };

    const handleDelete = async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        await fetchData(filters, page);
    };

    const editingCampaign = editingId ? campaigns.find(c => c.id === editingId) : null;

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Campaigns</h2>

            <CampaignFilters
                products={products}
                towns={towns}
                keywords={keywords}
                filters={filters}
                onSearch={handleSearch}
            />
            {navigation.state === 'submitting' && <p className="text-gray-400">Saving...</p>}

            <div className="flex space-x-10">
                <div className="flex-5">
                    <CampaignList
                        campaigns={campaigns}
                        onEdit={setEditingId}
                        onDelete={handleDelete}
                    />
                                {/* Pagination controls */}
            <div className="flex gap-4 justify-center mt-4">
                <button
                    onClick={() => setPage(prev => Math.max(0, prev - 1))}
                    disabled={page === 0}
                    className="px-4 py-2 bg-gray-600 rounded text-white disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-white mt-2">Page {page + 1} of {totalPages}</span>
                <button
                    onClick={() => setPage(prev => Math.min(totalPages - 1, prev + 1))}
                    disabled={page >= totalPages - 1}
                    className="px-4 py-2 bg-gray-600 rounded text-white disabled:opacity-50"
                >
                    Next
                </button>
            </div>
                </div>
                <div className="flex-2">
                    <CampaignForm
                        editing={editingCampaign}
                        towns={towns}
                        products={products}
                        keywords={keywords}
                        onSuccess={() => fetchData(filters, page)}
                        onCancelEdit={() => setEditingId(null)}
                    />
                    
                    {actionData?.error && (
                        <div className="text-red-500 space-y-1">
                            <p className="font-semibold">{actionData.error.message || actionData.error}</p>
                            {actionData.error.details && (
                                <ul className="list-disc list-inside text-sm">
                                    {Object.entries(actionData.error.details).map(([field, msg]) => (
                                        <li key={field}><strong>{field}:</strong> {msg}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}


export async function action({ request }) {
    const formData = await request.formData();
    const id = formData.get('id');
    const method = formData.get('_method');
    const ownerIdRaw = formData.get('ownerId');
    const ownerId = parseInt(ownerIdRaw, 10);

    if (isNaN(ownerId)) {
        return { error: 'Invalid owner ID' };
    }

    try {
        if (method === 'DELETE') {
            await api.delete(`/campaigns/${id}/owners/${ownerId}`);
            return null;
        }

        const data = {
            campaignName: formData.get('campaignName'),
            keywords: formData.getAll('keywords'),
            bidAmount: parseFloat(formData.get('bidAmount')),
            campaignFund: parseFloat(formData.get('campaignFund')),
            status: formData.get('status') === 'on',
            town: formData.get('town'),
            radius: parseInt(formData.get('radius'), 10),
            productId: parseInt(formData.get('productId'), 10),
            ownerId,
        };

        if (id) {
            await api.patch(`/campaigns/${id}`, data);
        } else {
            await api.post('/campaigns', data);
        }

        return null;
    } catch (err) {
        return { error: err.response?.data || { message: 'Unexpected error' } };

    }
}



