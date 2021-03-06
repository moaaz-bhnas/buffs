import Head from "next/head";
import Layout from "../containers/layout/Layout";
import { getSession } from "next-auth/client";

export default function Search({ session }) {
  return (
    <Layout>
      <Head>
        <title>Search | Buffs</title>
      </Head>
      Search
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
