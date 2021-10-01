import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import DefaultLayout from 'src/components/common/Layout';
import 'src/styles/main.scss';

function MyApp({ Component, pageProps }: any) {
  const Layout = Component.Layout || DefaultLayout;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;
