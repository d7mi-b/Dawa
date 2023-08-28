import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Head from "next/head";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { AuthProvider, ProtectRoute } from "~/context/AuthContext";

const MyApp: AppType = ({ Component, pageProps }) => {

  return (
    <AuthProvider>
      <Head>
        <title>دواء</title>
        <meta name="description" content="بتبرعك تخفف عنهم ما أصابهم وتكون خير عونٍ لهم" />
        <link rel="icon" href="images/Dawa.ico" />
      </Head>

      <Navbar />

      <ProtectRoute>
        <Component {...pageProps} />
      </ProtectRoute>
      
      <Footer />
    </AuthProvider>
  )
};

export default api.withTRPC(MyApp);
