import DefaultLayout from '../components/common/Layout';
import '../styles/main.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
function MyApp({ Component, pageProps }: any) {
  const Layout = Component.Layout || DefaultLayout;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;
