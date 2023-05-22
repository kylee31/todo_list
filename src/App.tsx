import React, { useState,KeyboardEvent } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import { useNextId, useTodoActions} from './context/TodoProvider';

//상태 관리를 어떻게 해야하나
//컴포넌트들은 부모를 통하여 대화를 해야한다.
//App이 Form, TodoItemList의 부모 컴포넌트이므로 해당 컴포넌트에 input, todos 상태를 넣고
//해당 값 업데이트하는 함수들을 각각의 컴포넌트에 props로 전달해주어 기능구현

function App() {

  const [input, setInput] = useState('');
  const dispatch= useTodoActions();
  let nextId=useNextId();

  function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  //입력이 없어도(공백 상태) 추가되는 현상막기
  function handleCreate() {
    //if문 추가로 공백일 때는 추가x
    if (input !== '') {
      setInput('');
      dispatch({type:'ADD',todo:{
        id:nextId.current,
        text:input,
        checked:false
      }});
      nextId.current+=1;
    }
  }

  function handleKeyPress(e:KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleCreate();
    }
  }

  function handleToggle(id:number) {
    dispatch({type:'TOGGLE',id});
  }

  function handleRemove(id:number) {
    dispatch({type:'REMOVE',id});
  }

  return (
    <TodoListTemplate form={(
      <Form
        value={input}
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        onCreate={handleCreate}
      />
    )}>
      <TodoItemList onToggle={handleToggle} onRemove={handleRemove} />
    </TodoListTemplate>
  )
}

export default App;