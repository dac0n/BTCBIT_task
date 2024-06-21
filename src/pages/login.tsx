import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from '../components/Button';
import Input from '../components/Input';
import { ButtonPreset } from '../enums';
import Head from 'next/head';

type User = {
  email: string,
  password: string,
  userName: string,
}

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const testUser = {
    email: 'test',
    password: 'test',
    userName: 'test'
  };

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser');
    if (loggedUser) {
      router.replace('/currencies');
    }
  }, [router]);
  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]') || [];
    const user: User = users.find(user => user.email === email && user.password === password);
    if (email === testUser.email && password === testUser.password) {
      localStorage.setItem('loggedUser', JSON.stringify(testUser));
      router.push('/currencies');
    } else if (!user) {
      setError('Invalid credentials. Please try again.');
    } else {
      router.push({
        pathname: '/confirmationCode',
        query: { ...user }
      });
    }
  };

  const handleSignUp = () => {
    router.push('/register');
  };

  const isLoginDisabled = !email || !password;

  return (
    <div>
      <Head>
        <title>Login page</title>
        <meta name="description" content="Login" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl mb-4">Login</h1>
        <p className="mb-4 text-center"> 
          You can enter <span className='bg-blue-100 px-2 text-blue-600'>test | test</span> credentials to bypass registration & login checks for testing purposes.
        </p>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Button onClick={handleLogin} className="mb-4" disabled={isLoginDisabled}>
          Login
        </Button>
        <Button onClick={handleSignUp} preset={ButtonPreset.Register}>
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;