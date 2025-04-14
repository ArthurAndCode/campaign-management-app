import api from './api';

export async function action({ request }) {
    try {
        const formData = await request.formData();
        const id = formData.get('id');
        const method = formData.get('_method');
        const name = formData.get('name');
        const ownerId = formData.get('ownerId');

        const data = { name, ownerId };

        if (method === 'DELETE') {
            await api.delete(`/products/${id}`);
        } else if (id) {
            await api.patch(`/products/${id}`, data);
        } else {
            await api.post('/products', data);
        }

        return null;
    } catch (error) {
        const status = error.response?.status;
        const data = error.response?.data;

        if (status === 409) {
            return {
                error: data?.error || {
                    message: "Cannot delete this product because it is assigned to an active campaign.",
                },
            };
        }

        if (status === 400 && data?.message && data?.details) {
            return { error: data };
        }

        return {
            error: {
                message: "An unexpected error occurred. Please try again later.",
            },
        };
    }
}


