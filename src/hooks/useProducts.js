import { useEffect, useState, useCallback } from 'react';
import api from '../services/api';

export default function useProducts(ownerId, page) {
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const reload = useCallback(async () => {
        if (!ownerId) return;
        try {
            const response = await api.get(`/products/owners/${ownerId}?page=${page}&size=8`);
            setProducts(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    }, [ownerId, page]);

    useEffect(() => {
        reload();
    }, [reload]);

    return { products, reload, totalPages };
}

