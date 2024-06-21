import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LoadingSpinner from '../components/LoadingSpinner';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const handleStart = () => {
      setIsMounted(false);
      setLoading(true);
    };
    const handleComplete = () => {
      setTimeout(() => {
        setIsMounted(true);
        setLoading(false);
      }, 500);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className={`page-transition ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
        <Component {...pageProps} />
      </div>

    </>
  );
}

export default MyApp;