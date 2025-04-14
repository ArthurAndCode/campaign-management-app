import { useFetcher } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export default function ProductForm({ ownerId, onActionComplete, setErrorMessage }) {
    const fetcher = useFetcher();
    const inputRef = useRef();

    useEffect(() => {
        if (fetcher.state === 'idle') {
            if (fetcher.data?.error) {
                setErrorMessage(fetcher.data.error);
            } else {
                setErrorMessage(null);
                if (inputRef.current) {
                    inputRef.current.value = '';
                }
                onActionComplete?.();
            }
        }
    }, [fetcher.state, fetcher.data, onActionComplete, setErrorMessage]);

    return (
        <fetcher.Form
            method="post"
            className="flex gap-4 items-end bg-gray-800 p-4 rounded text-gray-200 w-full max-w-md"
        >
            <div className="flex flex-col w-full">
                <label className="text-sm font-medium mb-1">New Product</label>
                <input
                    ref={inputRef}
                    name="name"
                    required
                    placeholder="New Product Name"
                    className="border border-gray-500 p-2 rounded bg-gray-700 text-gray-200"
                />
            </div>
            <input type="hidden" name="ownerId" value={ownerId} />
            <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                Add
            </button>
        </fetcher.Form>
    );
}
