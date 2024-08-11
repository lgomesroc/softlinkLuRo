import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const LinkShortenerPage = () => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const shortenLink = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            const response = await axios.post(
                'https://localhost:7125/api/Link/shorten',
                { originalUrl },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setShortenedUrl(`https://lu.ro/${response.data.shortCode}`);
            setError('');
        } catch (error) {
            console.error('Error shortening link:', error);
            setError('Falha ao encurtar o link. Por favor, tente novamente.');
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Encurtador de Links</h1>
            <input
                type="text"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="Insira o URL original"
                className="border p-2 mb-4 w-full"
            />
            <button
                onClick={shortenLink}
                className="bg-blue-500 text-white p-2 rounded"
            >
                ENCURTAR
            </button>
            {shortenedUrl && (
                <div className="mt-4">
                    <p>Link encurtado:</p>
                    <a
                        href={shortenedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                    >
                        {shortenedUrl}
                    </a>
                </div>
            )}
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
};

export default LinkShortenerPage;
