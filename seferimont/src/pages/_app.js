import styles from "../styles/global.scss";
import Layout from "src/components/Layout";
import { useRouter } from "next/router";
import { Provider } from "react-redux"; // Import Provider
import store from "src/store";
// This is your custom App component
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      {router.asPath == "/" ? (
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      ) : (
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      )}
    </>
  );
}

export default MyApp;
