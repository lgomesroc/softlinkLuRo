import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          router.push('/linkshortener');
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        localStorage.removeItem('token');
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  return <div>Carregando...</div>;
};

export default Index;