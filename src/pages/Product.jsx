import { useRouteLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductForm from '../components/ProductForm';
import ProductItem from '../components/ProductItem';
import useProducts from '../hooks/useProducts';

export default function ProductPage() {
    const user = useRouteLoaderData('root');
    const ownerId = user?.id;

    const [page, setPage] = useState(0);
    const [errorMessage, setErrorMessage] = useState(null);

    const { products, reload, totalPages } = useProducts(ownerId, page);

    useEffect(() => {
        reload();
    }, [reload]);

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Products</h2>

            {errorMessage && (
                <div className="text-red-500 space-y-1">
                    <p className="font-semibold">{errorMessage.message || errorMessage}</p>
                    {errorMessage.details && (
                        <ul className="list-disc list-inside text-sm">
                            {Object.entries(errorMessage.details).map(([field, msg]) => (
                                <li key={field}><strong>{field}:</strong> {msg}</li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            <ProductForm ownerId={ownerId} onActionComplete={reload} setErrorMessage={setErrorMessage} />

            <div className="flex flex-wrap gap-6">
                {products.map(product => (
                    <ProductItem
                        key={product.id}
                        product={product}
                        ownerId={ownerId}
                        onActionComplete={reload}
                        setErrorMessage={setErrorMessage}
                    />
                ))}
            </div>

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
    );
}




