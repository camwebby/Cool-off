import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { oauthLink } from "../helpers/spotify";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cool off</title>
        <meta
          name="description"
          content="Cool Off automatically skips songs you&#39;re tired of. Choose a skip playlist, add songs to it, and let Cool Off do the rest."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-w-screen relative min-h-screen overflow-hidden bg-gradient-to-tr from-[#0A0112] via-[#241134] to-[#0A0112] p-5 md:p-10">
        <div className="blur-effect"></div>
        <div className="blur-effect-2"></div>

        <div className="my-40" />

        <div className="z-20 mx-auto max-w-3xl p-4">
          <h1 className="text-center text-5xl font-semibold text-transparent text-white md:text-7xl">
            <span
              className="text-gradient bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "conic-gradient(from 149.3deg at 50.42% 51.28%, #B6D0F7 0deg, #EEF4E1 82.5deg, #E2C1F9 155.62deg, #BFD1F9 209.31deg, #FAFCFE 252.65deg, #BAE4E2 288.75deg, #8C6BE3 341.25deg, #C0D7F3 360deg)",
              }}
            >
              Skip
            </span>{" "}
            just got real
          </h1>
          <p className="mt-4 text-center text-xl font-medium text-gray-400 text-opacity-100">
            Cool Off automatically skips songs you&#39;re tired of. Choose a
            skip playlist, add songs to it, and let Cool Off do the rest.
          </p>

          <div className="mt-10 flex justify-center">
            <Link
              className="glowing-box-button button text-xl font-medium text-white"
              href={oauthLink()}
            >
              Login with Spotify
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
