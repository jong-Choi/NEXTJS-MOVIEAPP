import type { AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
// import Header from "../components/Header";
import wrapper, { persistor } from "../store";
import { Provider } from "react-redux";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import { PersistGate } from "redux-persist/integration/react";
import GrayScaleMastheadH1 from "../styles/GrayScaleMastheadH1";

function App({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Head>
          <title>Teal And Orange</title>
        </Head>
        <GlobalStyle />
        <ToastContainer />
        <>
          <Navbar></Navbar>
          <Component {...props} />
        </>
      </PersistGate>
    </Provider>
  );
}

export default App;
