import { proxy, useSnapshot } from "valtio";

type SearchState = {
  search: string;
  setText: (arg: string) => string;
};

export const textState: SearchState = proxy<SearchState>({
  search: "全学生",
  setText: (newSearch) => (textState.search = newSearch),
});

export const useText = () => {
  const { search } = useSnapshot(textState);
  return { search };
};
