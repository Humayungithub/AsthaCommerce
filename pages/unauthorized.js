import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';
import { NoSymbolIcon } from '@heroicons/react/24/outline';

export default function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;
  return (
    <Layout title="Unauthorized Page">
      <h1 className="mt-5 text-xl text-center">
        <span className="flex">
          <NoSymbolIcon className="mt-1 h-5 w-5"></NoSymbolIcon>&nbsp; Access
          Denied
        </span>
      </h1>
      {message && <div className="mb-4 mt-2 ml-8 text-red-500">{message}</div>}
    </Layout>
  );
}
