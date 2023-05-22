import React, { createContext, useContext, useMemo, useRef, useState } from 'react';

//useReducer 없이 Context를 사용해서 전역 상태 관리를 하기 위해서
//아래와 같이 업데이트 함수들이 들어있는 객체를 바로 선언해주었다

const TodoValueContext = createContext();
const TodoActionsContext = createContext();

function TodoProvider({ children }) {

    const idRef = useRef(3);

    const init = [
        { id: 0, text: 'todo-list 소개', checked: false },
        { id: 1, text: '클릭하여 완료하세요.', checked: true },
        { id: 2, text: '❌를 눌러 제거하세요.', checked: false },
    ]

    const [todos, setTodos] = useState(init);

    const actions = useMemo(() => ({
        add(input) {
            const id = idRef.current;
            idRef.current += 1;
            //왜 이렇게 해야하나여? useState의 set함수는 바로 실행하는 것이 아니라
            //
            setTodos((todos) => [...todos, {
                id: id,
                text: input,
                checked: false
            }])
        },
        toggle(id) {

            setTodos((todos) => todos.map((todo) => todo.id === id ? {
                ...todo,
                checked: !todo.checked
            } : todo));
        },
        remove(id) {
            setTodos((todos) => todos.filter(todo => todo.id !== id));
        }
    }), []);

    return (
        <TodoActionsContext.Provider value={actions}>
            <TodoValueContext.Provider value={todos}>
                {children}
            </TodoValueContext.Provider>
        </TodoActionsContext.Provider>
    )
}

export default TodoProvider;

export function useTodoValue() {
    const value = useContext(TodoValueContext);
    if (value === undefined) {
        throw new Error('useTodosValue should be used within TodosProvider');
    }
    return value;
}

export function useTodoActions() {
    const value = useContext(TodoActionsContext);
    if (value === undefined) {
        throw new Error('useTodosValue should be used within TodosProvider');
    }
    return value;
}