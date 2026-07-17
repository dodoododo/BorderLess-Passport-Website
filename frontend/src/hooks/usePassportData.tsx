import { useState, useEffect } from 'react';

export function usePassportData(iso: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!iso) return;

    const fetchPassport = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/passports/${iso}`);
        if (!response.ok) throw new Error("Failed to fetch passport data");
        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPassport();
  }, [iso]);

  return { data, loading, error };
}