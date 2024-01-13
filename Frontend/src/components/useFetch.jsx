import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error(`Data not fetched. Status: ${data.status}`);
                }
                const data = await res.json();
                setData(data);
                setLoading(false);
                setError(null);
            } catch (error) {
                setError(error.message);
                setLoading(false);
                setData(null);
            }
        };
        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
