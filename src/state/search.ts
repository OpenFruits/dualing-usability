import { proxy, useSnapshot } from "valtio";

type SearchState = {
  result: string;
  setResult: (arg: string) => string;
};

export const searchState: SearchState = proxy<SearchState>({
  result: "全学生",
  setResult: (newResult) => (searchState.result = newResult),
});

export const useText = () => {
  const { result } = useSnapshot(searchState);
  return { result };
};
