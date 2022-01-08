/* eslint-disable react/jsx-handler-names */
import type { CustomNextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Button } from "src/component/Button";
import { Button2 } from "src/component/Button2";
import { FixedLayout } from "src/layout/FixedLayout";
import { countState, useCount } from "src/state/count";
import { textState, useText } from "src/state/text";

const About: CustomNextPage = () => {
  const { count } = useCount();
  const { text } = useText();
  const [state, setState] = useState("");

  const handleClick = countState.decrement;
  const test = textState.setText;

  return (
    <>
      <Head>
        <title>About Page</title>
      </Head>

      <div>
        <h2>About</h2>
        <form>
          <input type="text" onChange={(e) => setState(e.target.value)} />
          <br />
          <Button2
            tag="input"
            type="button"
            value="Change text!"
            className="p-2 text-white bg-lime-400 hover:bg-lime-500 rounded cursor-pointer"
            onClick={() => test(state)}
          />
        </form>
        <p>text: {text}</p>
        <Button variant="solid-blue" className="p-2 rounded" onClick={handleClick}>
          Count down!
        </Button>
        <p>count: {count}</p>
      </div>
    </>
  );
};

About.getLayout = FixedLayout;

export default About;
