/* eslint-disable jsx-a11y/no-static-element-interactions */
import { addTodo, deleteTodo, todoState } from '@/lib/recoil/todo';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
// import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { i18n, withTranslation } from '../i18n';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

const useTodo = () => ({
  list: useRecoilValue(todoState),
  addItem: useSetRecoilState(addTodo),
  deleteItem: useSetRecoilState(deleteTodo)
});

const Counter = ({ t, currentLanguage }) => {
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
  const getLanguage = () => i18n.language || currentLanguage;

  return (
    <div>
      <Title>styled-component - {t('title')}</Title>
      <button
        onClick={() => {
          i18n.changeLanguage(i18n.language === 'en' ? 'tw' : 'en');
        }}
      >
        change language
      </button>
      <div>language: {getLanguage()}</div>
      <input type="text" value={todo} onChange={e => setTodo(e.target.value)} />
      <button onClick={() => addItem(todo)}>add</button>
      {renderTodo}
    </div>
  );
};

Counter.getInitialProps = async ctx => {
  const { req, pathname } = ctx;
  // 要判斷目前的語系需要改這樣抓
  let currentLanguage = '';
  // 官方文件有錯 req 會是undefined
  if (req === undefined || req === null) {
    currentLanguage = i18n.language;
  } else {
    currentLanguage = req.language;
  }
  const { query } = ctx;
  return {
    namespacesRequired: ['common'],
    currentLanguage,
    pathname,
    query
  };
};

Counter.propTypes = {
  t: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string
};

export default withTranslation('common')(Counter);
