import React from 'react';
import '../css/TodoListTemplate.css';
//탬플릿 역할(틀)

//함수형 컴포넌트
//파라미터로 받는건 props이고 이를 비구조화 할당하였다.
//원래 (props)=>{} 형태를 ({form, chidren})=>{} 형태로

function TodoListTemplate({ form, children }:{form:React.ReactNode, children:React.ReactNode}) {
    //children은 태그사이 내용이 들어가고, 
    //form은 인풋과 버튼이 들어간 컴포넌트 렌더링 할 때 사용할 것
    return (
        <main className="todo-list-template">
            <div className="title">
                <b>Todo List</b>
            </div>
            <section className="form-wrapper">
                {form}
            </section>
            <section className="todos-wrapper">
                {children}
            </section>
        </main>
    );
};

export default TodoListTemplate;