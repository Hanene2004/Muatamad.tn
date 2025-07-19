import { useEffect, useState } from 'react';

export default function useCommandeDetails() {
  const [commandeDetails, setCommandeDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost/projet_ministre_api/get_commande_details.php')
      .then(res => res.json())
      .then(data => {
        setCommandeDetails(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { commandeDetails, loading, error };
} 