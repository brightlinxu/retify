import Layout from '../components/Layout'
import { ParallaxProvider } from 'react-scroll-parallax';
import Head from 'next/head';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ParallaxProvider>
      <Layout>
        <Head>
          <title>retify</title>
          <link rel='icon' href='/favicon.png' />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </ParallaxProvider>
  );
}

export default MyApp
