import { proxy, useSnapshot } from "valtio";

type TextState = {
  text: string;
  setText: (arg: string) => string;
};

export const textState: TextState = proxy<TextState>({
  text: "test",
  setText: (newText) => (textState.text = newText),
});

export const useText = () => {
  const { text } = useSnapshot(textState);
  return { text };
};
