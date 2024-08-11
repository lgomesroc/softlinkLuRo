import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError('As senhas não coincidem');
            return;
        }

        try {
            const response = await axios.post('https://localhost:7125/api/auth/register', {
                email,
                password,
            });

            alert('Registro realizado com sucesso!');
            router.push('/login');
        } catch (error) {
            console.error('Error registering:', error);
            setError('Falha ao registrar. Por favor, tente novamente.');
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Registrar</h1>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="border p-2 mb-4 w-full"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                className="border p-2 mb-4 w-full"
            />
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirme a Senha"
                className="border p-2 mb-4 w-full"
            />
            <button
                onClick={handleRegister}
                className="bg-blue-500 text-white p-2 rounded"
            >
                REGISTRAR
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
};

export default RegisterPage;
