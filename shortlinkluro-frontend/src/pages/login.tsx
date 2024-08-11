import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://localhost:7125/api/auth/login', {
                email,
                password,
            });

            localStorage.setItem('token', response.data.token);
            router.push('/linkshortener');
        } catch (error) {
            alert('Login ou senha incorretos!');
        }
    };

    return (
        <div>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginPage;
