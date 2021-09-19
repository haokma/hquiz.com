import DefaultLayout from '../components/common/Layout';
import '../styles/main.scss';
function MyApp({ Component, pageProps }: any) {
  const Layout = Component.Layout || DefaultLayout;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;
