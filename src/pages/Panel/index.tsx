import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Loading from '../../components/Loading';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  // if (login) return <Navigate to="/" />;
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {loading && <Loading />}
      <h1>Painel de controle</h1>
    </>
  );
}
