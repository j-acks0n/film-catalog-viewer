import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";

const Home: NextPage = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div>
        Welcome {user.name}! <link href="/api/auth/logout">Logout</link>
      </div>
    );
  }

  return <link href="/api/auth/login">Login</link>;
};

export default Home;
