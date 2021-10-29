import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0";
import Header from "../components/Header";
import Search from "../components/Search";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  return (
    <UserProvider>
      <div className="relative h-screen flex w-full overflow-hidden">
        {/* Narrow sidebar */}

        {/* Mobile menu */}

        {/* Content area */}
        <div className="flex-1 flex flex-col">
          <Header setShowSearch={setShowSearch} />
          {showSearch && <Search setShowSearch={setShowSearch} />}
          {/* Main content */}
          <Component {...pageProps} />
        </div>
      </div>
    </UserProvider>
  );
}
export default MyApp;
