import {useEffect, useState} from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, {signal: abortCont.signal})
                .then(response => {
                    if (!response.ok) {
                        throw Error('ERR_FETCH');
                    }
                    return response.json();
                })
                .then((data) => {
                    setData(data);
                    setIsPending(false);
                    setError(null);
                })
                .catch((e) => {
                    if (e.name !== 'AbortError') {
                        setError(e.message);
                        setIsPending(false);
                    }
                });
        }, 800);

        return () => abortCont.abort();

    }, [url]);


    return {data, isPending, error}
}

export default useFetch;