import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import DefaultLayout from '../components/common/Layout';
import '../styles/main.scss';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: any) {
  useEffect(() => {
    if (process.browser) {
      window.onbeforeunload = () => {
        // localStorage.removeItem('answers');
        // localStorage.removeItem('slug');
        console.log('onbeforeunload');
        alert('Alerted Browser Close');
      };
    }
    return () => {};
  }, []);

  const Layout = Component.Layout || DefaultLayout;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;
