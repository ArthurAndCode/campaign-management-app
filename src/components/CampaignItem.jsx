import { Form, useRouteLoaderData } from 'react-router-dom';

export default function CampaignItem({ campaign, onEdit, onDelete }) {
    const user = useRouteLoaderData('root');

    const handleDeleteClick = (event, callback) => {
        const confirmed = window.confirm('Are you sure you want to delete this campaign?');
        if (!confirmed) {
            event.preventDefault();
        } else {
            callback();
        }
    };

    return (
        <li className="border p-4 space-y-2 rounded-md shadow-sm w-80 bg-gray-700">
            <div className="font-semibold text-xl">
                {campaign.campaignName} ({campaign.town})
            </div>

            <div className="text-sm text-white-700 space-y-1">
                <div><strong>Product:</strong> {campaign.productName}</div>
                <div><strong>Keywords:</strong> {campaign.keywords.join(', ')}</div>
                <div><strong>Bid:</strong> ${campaign.bidAmount.toFixed(2)}</div>
                <div><strong>Campaign Fund:</strong> ${campaign.campaignFund.toFixed(2)}</div>
                <div><strong>Radius:</strong> {campaign.radius} km</div>
                <div>
                    <strong>Status:</strong>{' '}
                    <span className={campaign.status ? "text-green-600" : "text-red-500"}>
                        {campaign.status ? "Active" : "Inactive"}
                    </span>
                </div>
            </div>

            <div className="flex gap-4 mt-3">
                <button className="text-white-500 hover:underline" onClick={() => onEdit(campaign.id)}>
                    Update
                </button>
                <Form method="post" className="inline" onSubmit={(e) => handleDeleteClick(e, onDelete)}>
                    <input type="hidden" name="id" value={campaign.id} />
                    <input type="hidden" name="_method" value="DELETE" />
                    <input type="hidden" name="ownerId" value={user.id} />
                    <button className="text-red-600 hover:underline">Delete</button>
                </Form>
            </div>
        </li>
    );
}
