/* eslint-disable jsx-a11y/no-static-element-interactions */
import { i18n, withTranslation } from '@/i18n';
import { addTodo, deleteTodo, todoState } from '@/lib/recoil/todo';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
// import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
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

const Counter = ({ t, currentLanguage }) => {
  const [todo, setTodo] = useState('');
  const [subject, setSubject] = useState(null);

  useEffect(() => {
    // BehaviorSubject init 也會 trigger，init 不 trigger 要改用 Subject
    const subscription = new Subject();
    setSubject(subscription);
    // eslint-disable-next-line no-console
    const sub$ = subscription.pipe(tap(v => console.log(v)));
    // 執行訂閱
    sub$.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

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

  const handleInput = e => {
    setTodo(e.target.value);
    // 執行 next 就會觸發 pipe
    subject.next(e.target.value);
  };

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
      <input type="text" value={todo} onChange={e => handleInput(e)} />
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
