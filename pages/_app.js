import Layout from '../components/Layout'
import { ParallaxProvider } from 'react-scroll-parallax';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ParallaxProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ParallaxProvider>
  );
}

export default MyApp
