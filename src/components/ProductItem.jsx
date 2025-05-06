import { useFetcher } from 'react-router-dom';
import { useEffect } from 'react';

export default function ProductItem({ product, ownerId, onActionComplete, setErrorMessage }) {
    const fetcher = useFetcher();

    useEffect(() => {
        if (fetcher.state === 'idle') {
            if (fetcher.data?.error) {
                setErrorMessage(fetcher.data.error);
            } else {
                setErrorMessage(null);
                onActionComplete?.();
            }
        }
    }, [fetcher.state, fetcher.data, onActionComplete, setErrorMessage]);

    return (
        <div className="border p-4 space-y-3 rounded-md w-80 bg-gray-700 text-gray-200">
            <fetcher.Form method="post" className="flex flex-col gap-3">
                <input type="hidden" name="id" value={product.id} />
                <input type="hidden" name="ownerId" value={ownerId} />
                <input
                    name="name"
                    defaultValue={product.name}
                    className="border border-gray-500 p-2 rounded bg-gray-800 text-gray-200 w-full"
                />
                <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 hover:underline">
                    Update
                </button>
            </fetcher.Form>

            <fetcher.Form method="post" className="flex justify-center">
                <input type="hidden" name="id" value={product.id} />
                <input type="hidden" name="ownerId" value={ownerId} />
                <input type="hidden" name="_method" value="DELETE" />
                <button className="text-red-500 hover:underline">Delete</button>
            </fetcher.Form>
        </div>
    );
}

