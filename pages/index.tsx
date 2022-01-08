import type { CustomNextPage } from "next";
import Head from "next/head";
import { Button } from "src/component/Button";
import { FluidLayout } from "src/layout/FluidLayout";
import { countState, useCount } from "src/state/count";
import { useText } from "src/state/text";

const Home: CustomNextPage = () => {
  const { count } = useCount();
  const { text } = useText();
  const handleClick = countState.increment;

  return (
    <>
      <Head>
        <title>Index Page</title>
      </Head>

      <div className="space-y-4">
        <h2>Index</h2>
        <Button variant="solid-blue" className="p-2 rounded" onClick={handleClick}>
          Count up!
        </Button>
        <p>{count}</p>
        <p>{text}</p>
      </div>
    </>
  );
};

Home.getLayout = FluidLayout;

export default Home;
