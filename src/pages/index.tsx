import { useEffect } from 'react';
import { useRouter } from 'next/router';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser');
    if (loggedUser) {
      router.replace('/currencies');
    } else {
      router.replace('/login');
    }
  }, [router]);

  return null;
};

export default HomePage;