import { useState } from 'react';
import { useRouter } from 'next/router';
import Button from '../components/Button';
import Input from '../components/Input';
import { emailRegex, passwordRegex, restrictedEmailsRegex, restrictedPasswordsRegex } from '../constants';
import { ButtonPreset } from '../enums';
import Head from 'next/head';

const RegisterPage = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    setError('');

    if (!userName) {
      setError('Username is required.');
      return;
    }
    if (!email) {
      setError('Email is required.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]') || [];
    const userExists = existingUsers.some(user => user.email === email);

    if (userExists) {
      setError('User with this email already exists.');
    } else if (!restrictedPasswordsRegex.test(password)) {
      setError(`${password} is not allowed. Select a different password.`);
    } else if (!passwordRegex.test(password)) {
      setError(`Password should contain min 6 characters and at least one symbol / number.`)
    } else if (!restrictedEmailsRegex.test(email)) {
    setError(`${email} is not allowed. Select a different email.`);
    } else if (!emailRegex.test(email)) {
      setError(`Email should answer the format aaa@xxx.yy where yy is at least 2 symbols long.`)
    } else {
      const newUser = { userName, email, password };
      localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));
      router.push('/login');
    }
  };
  
  const redirectToLogin = () => {
    router.push('/login');
  }

  return (
    <div>
      <Head>
        <title>Registration page</title>
        <meta name="description" content="Registration" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl mb-4">Register</h1>
        <span className="mb-4">The data isn't saved anywhere except Local Storage for demonstration purpose. </span>
        <Input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="mb-4"
        />
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
        <Button onClick={redirectToLogin} className="mb-4">Back to login</Button>
        <Button onClick={handleRegister} preset={ButtonPreset.Register}>Register</Button>
      </div>
    </div>
  );
};

export default RegisterPage;