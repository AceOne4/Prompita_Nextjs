import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-w-sm:hidden" />
        <span className="orange_gradient text-center">
          AI - Powered Prompts
        </span>
      </h1>
      <p className="desc text-center">
        Prompita is an open-source AI Promptin tool for modern world to
        discover, create and Share creative Prompts
      </p>
      <Feed />
    </section>
  );
};

export default Home;
