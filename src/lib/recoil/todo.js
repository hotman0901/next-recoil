import { atom, selector } from 'recoil';

// 比較像 redux 的 reducer
export const todoState = atom({
  key: 'todo',
  default: []
});

// async
// selector 像是 redux  的 actions + epic
// 通常 key 名稱會跟 方法取一樣
export const addTodo = selector({
  key: 'addTodo',
  // text 是傳遞進來的 param
  set: ({ set }, text) =>
    set(todoState, current =>
      // return 就是更新資料
      [text, ...current]
    )
});

export const deleteTodo = selector({
  key: 'deleteTodo',
  set: ({ set }, idx) =>
    set(todoState, current => current.filter((arr, index) => index !== idx))
});
