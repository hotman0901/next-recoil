/* eslint-disable jsx-a11y/no-static-element-interactions */
import { addTodo, deleteTodo, todoState } from '@/lib/recoil/todo';
import { useMemo, useState } from 'react';
// import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

const useTodo = () => ({
  list: useRecoilValue(todoState),
  addItem: useSetRecoilState(addTodo),
  deleteItem: useSetRecoilState(deleteTodo)
});

const Counter = () => {
  const [todo, setTodo] = useState('');
  const { list, addItem, deleteItem } = useTodo();

  const renderTodo = useMemo(
    () =>
      list.map((o, index) => (
        <div key={index} onClick={() => deleteItem(index)}>
          <span>{o}</span>
          <span style={{ color: 'red', marginLeft: '60px' }}>x</span>
        </div>
      )),
    [list]
  );

  return (
    <div>
      <Title>styled-component</Title>
      <input type="text" value={todo} onChange={e => setTodo(e.target.value)} />
      <button onClick={() => addItem(todo)}>add</button>
      {renderTodo}
    </div>
  );
};

export default Counter;
