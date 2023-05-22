import React from 'react';
import TodoItem from './TodoItem';
import { useTodoValue } from '../hook/TodoProvider';

//TodoItem 컴포넌트 여러 개를 렌더링해주는 역할
//template 컴포넌트를 만들었기 때문에 이 컴포넌트는 따로 스타일링이 필요하지 않다.
//'리스트'를 렌더링 할 때, 특히 보여주는 리스트가 동적일 때 함수형이 아닌 클래스형 컴포넌트로 작성하는 것이 
//컴포넌트 성능 최적화에 적합하다.
/* 

    //컴포넌트 최적화
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.todos !== nextProps.todos;
    }

*/
function TodoItemList({ onToggle, onRemove }) {

    //todos: todo객체들이 들어있는 배열
    //onToggle: 체크박스 켜고 끄는 함수
    //onRemove: 아이템 삭제 함수

    const todos = useTodoValue();

    return (
        <div>
            {todos.map((data, index) => {
                return <TodoItem id={data.id} text={data.text} checked={data.checked} onToggle={onToggle} onRemove={onRemove} key={data.id} />
            })}
        </div>
    );

}

export default TodoItemList;