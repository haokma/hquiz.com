import type { AppProps } from 'next/app';
import Layout from '../components/common/Layout';
import '../styles/main.scss';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;
