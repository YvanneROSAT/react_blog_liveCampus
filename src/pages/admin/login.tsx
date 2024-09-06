import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TypographyH2 } from '@/components/ui/typography';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
  console.log({email, password});

    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);  // Stocke le token JWT dans le localStorage
        navigate('/admin/dashboard');  // Redirige vers le tableau de bord
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Something went wrong : ' + error);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col gap-5 w-80">
        <TypographyH2 className="text-center">Log in</TypographyH2>
        {error && <p className="text-red-500">{error}</p>}
        <Input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Log in</Button>
      </div>
    </div>
  );
}
