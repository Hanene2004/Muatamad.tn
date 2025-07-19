import { useEffect, useState } from 'react';

export default function useTrafic() {
  const [trafic, setTrafic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost/projet_ministre_api/get_trafic.php')
      .then(res => res.json())
      .then(data => {
        setTrafic(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { trafic, loading, error };
} 