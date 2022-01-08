import { proxy, useSnapshot } from "valtio";

type CountState = {
  count: number;
  increment: () => number;
  decrement: () => number;
};

export const countState: CountState = proxy<CountState>({
  count: 0,
  increment: () => countState.count++,
  decrement: () => countState.count--,
});

export const useCount = () => {
  const { count } = useSnapshot(countState);
  return { count };
};
