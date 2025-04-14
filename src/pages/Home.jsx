import { useRouteLoaderData } from 'react-router-dom';

export default function HomePage() {
    const user = useRouteLoaderData('root');

    return (
        <div className="flex items-center justify-center bg-gray-800 text-white px-6 md:px-20 lg:px-32 py-12">
            <div className="flex flex-col md:flex-row gap-10 max-w-7xl w-full">
                <div className="flex-1 bg-gray-700 rounded-2xl shadow-lg px-12 py-30 flex flex-col justify-between items-center">
                    <h2 className="text-4xl font-bold text-emerald-300 text-center">
                        Welcome, {user.firstName}!
                    </h2>
                    <div className="space-y-3 text-center">
                        <p className="text-lg">
                            Your email: <span className="font-medium text-gray-200">{user.email}</span>
                        </p>
                        <p className="text-2xl text-emerald-400 font-semibold">
                            Emerald Funds: <strong>${user.emeraldFunds.toFixed(2)}</strong>
                        </p>
                    </div>
                </div>

                <div className="flex-1 bg-gray-700 rounded-2xl shadow-lg px-12 py-10 flex items-center justify-end">
                    <p className="text-3xl text-gray-300 leading-snug text-right italic">
                        <span className="block font-semibold text-emerald-400 mb-2">About the App</span>
                        This app lets sellers manage separate ad campaigns for their products. Each campaign includes a name, keywords, bid, fund, status, town, and radius.
                    </p>
                </div>
            </div>
        </div>
    );
}
