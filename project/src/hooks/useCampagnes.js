import { useEffect, useState } from 'react';

export default function useCampagnes() {
  const [campagnes, setCampagnes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost/projet_ministre_api/get_campagnes.php')
      .then(res => res.json())
      .then(data => {
        setCampagnes(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { campagnes, loading, error };
} 