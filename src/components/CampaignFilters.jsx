import { useState } from 'react';

export default function CampaignFilters({ products, towns, keywords, filters, onSearch }) {
    const [form, setForm] = useState(filters);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(form);
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-4 flex-wrap items-center">
            <input
                name="campaignName"
                placeholder="Search name"
                value={form.campaignName || ''}
                onChange={handleChange}
                className="border border-gray-500 p-2 rounded bg-gray-700 text-gray-200"
            />
            <select
                name="keyword"
                value={form.keyword || ''}
                onChange={handleChange}
                className="border border-gray-500 p-2 rounded bg-gray-700 text-gray-200"
            >
                <option value="">All keywords</option>
                {keywords.map(k => <option key={k} value={k}>{k}</option>)}
            </select>
            <select
                name="town"
                value={form.town || ''}
                onChange={handleChange}
                className="border border-gray-500 p-2 rounded bg-gray-700 text-gray-200"
            >
                <option value="">All towns</option>
                {towns.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <select
                name="productId"
                value={form.productId || ''}
                onChange={handleChange}
                className="border border-gray-500 p-2 rounded bg-gray-700 text-gray-200"
            >
                <option value="">All products</option>
                {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <select
                name="status"
                value={form.status || ''}
                onChange={handleChange}
                className="border border-gray-500 p-2 rounded bg-gray-700 text-gray-200"
            >
                <option value="">All statuses</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
            </select>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Search
            </button>
        </form>
    );
}
