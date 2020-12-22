import { atom, selector } from 'recoil';

// 比較像 redux 的 reducer
export const countState = atom({
  key: 'count',
  default: 0
});

// selector 像是 redux  的 actions + epic
// 通常 key 名稱會跟 方法取一樣
export const incrementCount = selector({
  key: 'incrementCount',
  set: ({ set }) => set(countState, currCount => currCount + 1)
});

export const decrementCount = selector({
  key: 'decrementCount',
  set: ({ set }) => set(countState, currCount => currCount - 1)
});
