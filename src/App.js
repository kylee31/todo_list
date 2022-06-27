import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';

//상태 관리를 어떻게 해야하나
//컴포넌트들은 부모를 통하여 대화를 해야한다.
//App이 Form, TodoItemList의 부모 컴포넌트이므로 해당 컴포넌트에 input, todos 상태를 넣고
//해당 값 업데이트하는 함수들을 각각의 컴포넌트에 props로 전달해주어 기능구현

class App extends Component {

  id = 3

  state = {
    input: '',
    todos: [
      { id: 0, text: 'todo-list 소개', checked: false },
      { id: 1, text: '클릭하여 완료하세요.', checked: true },
      { id: 2, text: '❌를 눌러 제거하세요.', checked: false },
    ]
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value //input의 다음 바뀔 값
    });
  }

  //입력이 없어도(공백 상태) 추가되는 현상막기
  handleCreate = () => {
    const { input, todos } = this.state;
    //if문 추가로 공백일 때는 추가x
    if (input != '') {
      this.setState({
        input: '', //인풋 비우고 concat사용하여 배열에 추가
        todos: todos.concat({
          id: this.id++,
          text: input,
          checked: false
        })
      });
    }
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];
    const nextTodos = [...todos];

    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };
    this.setState({
      todos: nextTodos
    });
  }

  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }

  render() {
    const { input, todos } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove
    } = this;

    return (
      <TodoListTemplate form={(
        <Form
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
        />
      )}>
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove} />
      </TodoListTemplate>
    )
  }
}

export default App;
