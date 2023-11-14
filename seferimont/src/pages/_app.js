import styles from "../styles/global.scss";
import Layout from "src/components/Layout";
// This is your custom App component
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
