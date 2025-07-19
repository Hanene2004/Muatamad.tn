import { useEffect, useState } from 'react';

export default function useStockLogs() {
  const [stockLogs, setStockLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost/projet_ministre_api/get_stock_logs.php')
      .then(res => res.json())
      .then(data => {
        setStockLogs(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { stockLogs, loading, error };
} 