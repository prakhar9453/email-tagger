//componets
import Head from "next/head";
import EmailTaggerList from "../src/componets/EmailTaggerList";

const EmailTagger = () => {
  return (
    <div className="">
      <Head>
        <title>Email Tagger</title>
        <meta name="description" content="Email Tagger" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <EmailTaggerList />
      </main>
    </div>
  );
};

export default EmailTagger;
