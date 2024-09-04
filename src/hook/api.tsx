import { useEffect, useState } from "react";

type FetchOptions = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
};

export const useFetch = <T,>(url: string, options?: FetchOptions) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          method: options?.method || "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: options?.body ? JSON.stringify(options.body) : null,
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        if(err instanceof Error) {
        setError(err.message);
        }else{
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, loading, error };
};