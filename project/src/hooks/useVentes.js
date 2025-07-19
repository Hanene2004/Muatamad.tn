import { useEffect, useState } from 'react';

export default function useVentes() {
  const [ventes, setVentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost/projet_ministre_api/get_ventes.php')
      .then(res => res.json())
      .then(data => {
        setVentes(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { ventes, loading, error };
} 