import React, { useState } from 'react';
import useUserStore from '../stores/userStore';
import Input from '../components/Input';
import Button from '../components/Button';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useUserStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login to PicGal</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" fullWidth={true}>Login</Button>
        </form>
        {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}

export default Login;