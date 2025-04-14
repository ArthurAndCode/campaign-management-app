// App.jsx
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './pages/Root';
import HomePage from './pages/Home';
import ProductPage from './pages/Product';
import { action as productAction } from './services/productAction';
import CampaignPage, { action as campaignAction } from './pages/Campaign';
import { userLoader } from './util/auth';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        id: 'root',
        loader: userLoader,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'products',
                element: <ProductPage />,
                action: productAction,
            },
            {
                path: 'campaigns',
                element: <CampaignPage />,
                action: campaignAction,
            }
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}

