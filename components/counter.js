import { countState, decrementCount, incrementCount } from '@/lib/recoil/count';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

// useSetRecoilState 主要拿來執行 selector 方法
// useSetRecoilState = useRecoilState 的 set
const useCounter = () => ({
  count: useRecoilValue(countState),
  increment: useSetRecoilState(incrementCount),
  decrement: useSetRecoilState(decrementCount),
  reset: useResetRecoilState(countState)
});

const Counter = () => {
  const { count, increment, decrement, reset } = useCounter();
  return (
    <div>
      <h1>
        Count: <span>{count}</span>
      </h1>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Counter;
