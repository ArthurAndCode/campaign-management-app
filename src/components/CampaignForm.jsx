import { Form, useRouteLoaderData } from 'react-router-dom';
import KeywordInput from './KeywordInput';

export default function CampaignForm({ editing, towns, products, keywords, onSuccess, onCancelEdit }) {
    const user = useRouteLoaderData('root');
    const rowClass = "grid grid-cols-[1fr_auto_3fr] items-center gap-4";

    return (
        <Form
            method="post"
            className="space-y-6 text-gray-200 p-6 rounded max-w-screen mx-auto"
            onSubmit={() => {
                setTimeout(onSuccess, 500);
            }}
        >
            {editing && <input type="hidden" name="id" value={editing.id} />}
            <input type="hidden" name="ownerId" value={user.id} />

            {/* Campaign Name */}
            <div className={rowClass}>
                <label className="text-m font-medium min-w-[150px]">Campaign Name</label>
                <input
                    name="campaignName"
                    required
                    placeholder="Campaign Name"
                    defaultValue={editing?.campaignName}
                    className="border border-gray-500 p-2 rounded w-full bg-gray-700 text-gray-200"
                />
            </div>

            {/* Keywords */}
            <div className={rowClass}>
                <label className="text-m font-medium min-w-[150px]">Keywords</label>
                <KeywordInput allKeywords={keywords} defaultKeywords={editing?.keywords || []} />
            </div>

            {/* Bid Amount */}
            <div className={rowClass}>
                <label className="text-m font-medium min-w-[150px]">Bid Amount</label>
                <input
                    name="bidAmount"
                    type="number"
                    step="0.01"
                    placeholder="Bid Amount"
                    defaultValue={editing?.bidAmount}
                    className="border border-gray-500 p-2 rounded w-full bg-gray-700 text-gray-200"
                    required
                />
            </div>

            {/* Campaign Fund */}
            <div className={rowClass}>
                <label className="text-m font-medium min-w-[150px]">Campaign Fund</label>
                <input
                    name="campaignFund"
                    type="number"
                    step="0.01"
                    placeholder="Campaign Fund"
                    defaultValue={editing?.campaignFund}
                    className="border border-gray-500 p-2 rounded w-full bg-gray-700 text-gray-200"
                    required
                />
            </div>

            {/* Radius */}
            <div className={rowClass}>
                <label className="text-m font-medium min-w-[150px]">Radius</label>
                <input
                    name="radius"
                    type="number"
                    placeholder="Radius"
                    defaultValue={editing?.radius}
                    className="border border-gray-500 p-2 rounded w-full bg-gray-700 text-gray-200"
                    required
                />
            </div>

            {/* Status */}
            <div className={rowClass}>
                <label className="text-m font-medium min-w-[150px]">Status</label>
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        name="status"
                        checked={editing?.status}
                        className="h-5 w-5 appearance-none bg-gray-700 border-2 border-gray-500 rounded-md checked:bg-green-600 checked:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
                    />
                    <span className="text-m text-gray-300">Active</span>
                </div>
            </div>

            {/* Town */}
            <div className={rowClass}>
                <label className="text-m font-medium min-w-[150px]">Town</label>
                {editing ? (
                    <>
                        <input type="hidden" name="town" value={editing?.town ?? ''} />
                        <div className="p-2 border bg-gray-700 text-gray-200 rounded w-full">
                            {editing?.town ?? 'Unknown'}
                        </div>
                    </>
                ) : (
                    <select
                        name="town"
                        defaultValue=""
                        className="border border-gray-500 p-2 rounded w-full bg-gray-700 text-gray-200"
                        required
                    >
                        <option value="" disabled hidden>Select town</option>
                        {towns.map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                )}
            </div>

            {/* Product */}
            <div className={rowClass}>
                <label className="text-m font-medium min-w-[150px]">Product</label>
                {editing ? (
                    <>
                        <input type="hidden" name="productId" value={editing?.product?.id ?? ''} />
                        <div className="p-2 border text-gray-200 bg-gray-700 rounded w-full">
                            {editing?.productName ?? 'Unknown'}
                        </div>
                    </>
                ) : (
                    <select
                        name="productId"
                        defaultValue=""
                        className="border border-gray-500 p-2 rounded w-full bg-gray-700 text-gray-200"
                        required
                    >
                        <option value="" disabled hidden>Select product</option>
                        {products.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    {editing ? 'Update Campaign' : 'Create Campaign'}
                </button>
                {editing && (
                    <button
                        type="button"
                        onClick={onCancelEdit}
                        className="bg-green-600 hover:text-gray-200"
                    >
                        Cancel update
                    </button>
                )}
            </div>
        </Form>
    );
}
