import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { CurrencyNames } from '../constants';
import CurrencyTable from '../components/CurrencyTable';
import Head from 'next/head';

const CurrenciesPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [columnsAmount, setColumnsAmount] = useState(2);
  const [loading, setLoading] = useState(true);
  const [useFaultyApi, setUseFaultyApi] = useState(false);
  const [error, setError] = useState(false);

  const apiUrl = useFaultyApi
    ? 'https://653fb0ea9e8bd3be29e10cd4.mockapi.io/api/v1/not-found'
    : 'https://653fb0ea9e8bd3be29e10cd4.mockapi.io/api/v1/currencies';

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          const mappedData = data.map(item => ({
            ...item,
            currencyName: CurrencyNames[item.currencyId]
          }));
          setCurrencies(mappedData);
          setError(false);
        })
        .catch(error => {
          setError(true);
          console.error('There was a problem with the fetch operation:', error);
        })
        .finally(() => setLoading(false));
    } else {
      router.push('/login');
    }
  }, [router, useFaultyApi]);

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    router.push('/login');
  };

  const toggleApi = () => setUseFaultyApi(prev => !prev);

  const increaseColumns = () => setColumnsAmount(prev => prev + 1);
  const decreaseColumns = () => setColumnsAmount(prev => Math.max(1, prev - 1));

  const handleCurrencyRemove = (currencyIndex) => {
    setCurrencies(currencies.filter((_, index) => index !== currencyIndex && index !== currencyIndex + 1));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <Head>
        <title>Currencies</title>
        <meta name="description" content="List of currencies" />
      </Head>
      <div className="min-h-screen py-2">
      <div className="flex justify-end p-4">
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <div className="text-center">
        <h1 className="text-4xl mb-4">Welcome, {user.userName}!</h1>
        <Button className="m-1 font-normal bg-gray-200 text-black hover:bg-gray-300" onClick={toggleApi}>
          {useFaultyApi ? 'Switch to normal table' : 'Click to switch to a result which displays "Not found" or other faulty responses'}
        </Button>
        {error ? <div className="mt-10 text-center">Seems like data has gone somewhere. Time to blame the devs!</div> : <>
        <span className="mb-4 block">Press & hold currencies to remove them from the list.</span>
        <div className="mb-4 flex justify-center items-center">
          Columns:
          <button onClick={decreaseColumns} className="mr-2 pl-4">-</button>
          <span>{columnsAmount * 2}</span>
          <button onClick={increaseColumns} className="ml-2">+</button>
        </div>
        <CurrencyTable
          currencies={currencies}
          columnsAmount={columnsAmount}
          onCurrencyRemove={handleCurrencyRemove}
        />
        </>}
      </div>
    </div>
    </div>
    
  );
};

export default CurrenciesPage;