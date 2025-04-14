import { Outlet, NavLink, useLoaderData } from "react-router-dom";

export default function RootLayout() {
    const user = useLoaderData();

    const navLinkStyles = "text-lg px-4 py-2 transition-all";
    const activeLinkStyles =
        "text-yellow-400 font-semibold border-b-2 border-yellow-400";
    const inactiveLinkStyles = "text-gray-200 hover:text-yellow-400";

    return (
        <div className="min-h-screen flex flex-col size-full">
            <header className="bg-gray-900 text-white p-8 flex items-center justify-between w-full">
                {/* Title Section */}
                <h1 className="text-xl font-bold ml-6">Campaign Manager</h1>

                {/* Menu Section */}
                <nav className="flex space-x-6 mx-auto">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `${navLinkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/products"
                        className={({ isActive }) =>
                            `${navLinkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`
                        }
                    >
                        Products
                    </NavLink>
                    <NavLink
                        to="/campaigns"
                        className={({ isActive }) =>
                            `${navLinkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`
                        }
                    >
                        Campaigns
                    </NavLink>
                </nav>

                {/* Fund Section */}
                <span className="text-2xl font-semibold text-white mr-6">
                    Funds: <strong className="text-emerald-400">${user?.emeraldFunds?.toFixed(2)}</strong>
                </span>
            </header>
            <main className="p-6 flex-1 size-full">
                <Outlet />
            </main>
        </div>
    );
}
