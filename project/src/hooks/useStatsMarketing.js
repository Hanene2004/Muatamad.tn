import { useEffect, useState } from 'react';

export default function useStatsMarketing() {
  const [statsMarketing, setStatsMarketing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost/projet_ministre_api/get_stats_marketing.php')
      .then(res => res.json())
      .then(data => {
        setStatsMarketing(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { statsMarketing, loading, error };
} 