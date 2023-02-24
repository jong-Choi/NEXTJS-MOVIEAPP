import type { AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
// import Header from "../components/Header";
import wrapper from "../store";
import { Provider } from "react-redux";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";

function App({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  const isLanding = Component.name === "Home";

  return (
    <Provider store={store}>
      <Head>
        <title>Create Next App</title>
      </Head>
      <GlobalStyle />
      <ToastContainer />
      <>
        {isLanding ? <></> : <Navbar />}
        <Component {...props} />
      </>
    </Provider>
  );
}

export default App;
