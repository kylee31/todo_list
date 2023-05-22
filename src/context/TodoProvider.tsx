import React, { Dispatch, MutableRefObject, createContext, useContext, useMemo, useReducer, useRef, useState } from 'react';

//useReducer 없이 Context를 사용해서 전역 상태 관리를 하기 위해서
//아래와 같이 업데이트 함수들이 들어있는 객체를 바로 선언해주었다.

//위와 같은 방법은 typescript를 적용하면서 any로 선언해주어야 하는 일이 발생.. (해결책 있는지 찾아보기)

//useReducer 사용해서 dispatch, reducer 쓰는걸로 변경

export interface Todo{
    id: number,
    text: string, 
    checked: boolean
}

export type Action=
    | { type:'ADD',todo:Todo }
    | { type:'TOGGLE', id:number }
    | { type:'REMOVE', id:number }

type TodoDispatch=Dispatch<Action>;

function reducer(state:Todo[],action:Action){
    switch(action.type){
        case 'ADD':{
            return state.concat(action.todo)
        }
        case 'TOGGLE':{
            return state.map((todo:Todo)=>todo.id===action.id?{
                ...todo,
                checked:!todo.checked
            }:todo)
        }
        case 'REMOVE':{
            return state.filter((todo)=>todo.id!==action.id)
        }
        default:{
            return state
        }
    }
}

const IdContext=createContext<MutableRefObject<number>|undefined>(undefined);
const TodoValueContext = createContext<Todo[]|undefined>(undefined);
const TodoActionsContext = createContext<TodoDispatch|undefined>(undefined);

function TodoProvider({ children }:{children:React.ReactNode}) {

    const idRef = useRef(3);

    const init = [
        { id: 0, text: 'todo-list 소개', checked: false },
        { id: 1, text: '클릭하여 완료하세요.', checked: true },
        { id: 2, text: '❌를 눌러 제거하세요.', checked: false },
    ]

    //const [todos, setTodos] = useState(init);

    const [todos,dispatch]=useReducer(reducer,init);

    return (
        <TodoActionsContext.Provider value={dispatch}>
            <TodoValueContext.Provider value={todos}>
                <IdContext.Provider value={idRef}>
                {children}
                </IdContext.Provider>
            </TodoValueContext.Provider>
        </TodoActionsContext.Provider>
    )
}

export default TodoProvider;

export function useNextId(){
    const nextId=useContext(IdContext);
    if (nextId === undefined) {
        throw new Error('useTodosValue should be used within TodosProvider');
    }
    return nextId;
}

export function useTodoValue() {
    const value = useContext(TodoValueContext);
    if (value === undefined) {
        throw new Error('useTodosValue should be used within TodosProvider');
    }
    return value;
}

export function useTodoActions() {
    const action = useContext(TodoActionsContext);
    if (action === undefined) {
        throw new Error('useTodosValue should be used within TodosProvider');
    }
    return action;
}