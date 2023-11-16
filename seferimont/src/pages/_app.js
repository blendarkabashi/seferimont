import styles from "../styles/global.scss";
import Layout from "src/components/Layout";
import { useRouter } from "next/router";
import { Provider } from "react-redux"; // Import Provider
import store from "src/store";
import { Toaster } from "react-hot-toast";
// This is your custom App component
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      {router.asPath == "/" ? (
        <Provider store={store}>
          <Component {...pageProps} />
          <Toaster
            toastOptions={{
              className: "bg-gray6 text-white text-sm",
            }}
            position="bottom-left"
          />
        </Provider>
      ) : (
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
            <Toaster
              toastOptions={{
                className: "bg-gray6 text-white text-sm",
              }}
              position="bottom-left"
            />
          </Layout>
        </Provider>
      )}
    </>
  );
}

export default MyApp;
