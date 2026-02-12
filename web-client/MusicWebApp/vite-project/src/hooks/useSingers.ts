import { useEffect, useState } from 'react';
import { getSingersPaged, type Singer } from '../api/singer.api';

export function useSingers(pageSize = 8) {
    const [singers, setSingers] = useState<Singer[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        loadSingers();
    }, [page]);

    const loadSingers = async () => {
        try {
            const res = await getSingersPaged(page, pageSize);
            setSingers(res.data.content);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.error("Failed to load singers", error);
        }
    };
    return {
        singers,
        page,
        totalPages,
        setPage
    }
}
