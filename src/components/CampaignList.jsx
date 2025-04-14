import CampaignItem from './CampaignItem';

export default function CampaignList({ campaigns, onEdit, onDelete }) {
    return (
        <ul className="flex flex-wrap gap-4">
            {campaigns.map(campaign => (
                <CampaignItem
                    key={campaign.id}
                    campaign={campaign}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}
