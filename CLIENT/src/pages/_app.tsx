import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import DefaultLayout from 'src/components/common/Layout';
import 'src/styles/main.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: any) {
  const Layout = Component.Layout || DefaultLayout;
  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer />
    </Layout>
  );
}
export default MyApp;
