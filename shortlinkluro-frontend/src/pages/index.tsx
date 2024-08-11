import { useEffect } from 'react';
import { useRouter } from 'next/router';
//import axios from 'axios';

const IndexPage = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        } else {
            router.push('/linkshortener');
        }
    }, []);

    return <div>Redirecionando...</div>;
};

export default IndexPage;
