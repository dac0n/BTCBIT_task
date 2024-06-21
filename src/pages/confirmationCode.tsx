import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Button from '../components/Button';
import Input from '../components/Input';
import Head from 'next/head';

const ConfirmationCodePage = () => {
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const inputRefs = useRef([]);
  const { email, userName, password } = router?.query;

  if (!password) router.push('/login');

  useEffect(() => {
    const newGeneratedCode = randomInteger(1000, 9999).toString();
    console.log(`Generated confirmation code: ${newGeneratedCode}`);
    setGeneratedCode(newGeneratedCode);
  }, []);

  const handleCodeChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Automatically focus the next input field if a digit is entered
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }

    if (newCode.every(digit => digit !== '')) {
      handleSubmit(newCode.join(''));
    }
  };

  const handleSubmit = (enteredCode) => {
    if (enteredCode === '4444' || enteredCode === generatedCode) {
      localStorage.setItem('loggedUser', JSON.stringify({ email: email, userName: userName }));
      router.push('/currencies');
    } else {
      setError('Code is incorrect');
      setCode(['', '', '', '']);
      inputRefs.current.forEach(ref => {
        ref.value = '';
        ref.blur();
      });
    }
  };

  const redirectToLogin = () => {
    router.push('/login');
  };

  return (
    <div>
      <Head>
        <title>Your sign-in code</title>
        <meta name="description" content="OTP authentication" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl mb-4">OTP authentication</h1>
      <p className="mb-4">We've sent you a code at {email}. Enter it below to proceed!</p>
      <p className="mb-4">For testing purposes you can use code 4444 or the one which is displayed in the developers console.</p>
      <div className="flex space-x-2 mb-4">
        {code.map((digit, index) => (
          <Input
            key={index}
            ref={el => inputRefs.current[index] = el}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleCodeChange(index, e.target.value)}
            className="w-12 text-center"
          />
        ))}
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <Button onClick={redirectToLogin} className="bg-gray-300 hover:bg-gray-400">Back to Login</Button>
    </div>
    </div>
    
  );
};

export default ConfirmationCodePage;

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}