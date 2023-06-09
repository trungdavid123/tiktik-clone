import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { SessionProvider } from "next-auth/react"
import Head from 'next/head';
export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [isSSR, setisSSR] = useState(true);

  useEffect(() => {
    setisSSR(false);
  }, [])

  if (isSSR) return null;

  return (
    <>
      <Head>
        <link rel="icon" sizes="76x76" href="/favicon.png" />
      </Head>
      <SessionProvider session={session}>
        <div className='xl:w-[1200px] m-auto overflow-hidden h-[100vh]'>
          <Navbar />
          <div className='flex gap-6 md:gap-20'>
            <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
              <Sidebar />
            </div>
            <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1' >
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </SessionProvider>

    </>
  )
}
