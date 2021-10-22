import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0";
import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <div className="relative h-screen  flex">
        {/* Narrow sidebar */}

        {/* Mobile menu */}

        {/* Content area */}
        <div className="flex-1 flex flex-col">
          <Header />
          <Component {...pageProps} />

          {/* Main content */}
        </div>
      </div>
    </UserProvider>
  );
}
export default MyApp;
