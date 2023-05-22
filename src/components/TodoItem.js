import React, { } from 'react';
import '../css/TodoItem.css';

//체크값이 활성화되어 있으면 우측에 체크마크를 보여주고, 마우스가 위에 있을 때 좌측에 엑스마크를 보여준다
/*
    //컴포넌트 최적화하기
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.checked !== nextProps.checked;
    }

    render() {
        //총 5가지의 props를 전달받음
        //text: todo의 내용
        //checked: 체크박스 상태
        //id: todo의 고유id
        //onToggle: 체크박스 켜고 끄는 함수
        //onRemove: 아이템 삭제 함수
    }
*/

function TodoItem({ text, checked, id, onToggle, onRemove }) {

    return (
        //최상위 DOM 클릭 이벤트에는 onToggle을 넣고, x가 있는 부분엔 onRemove 넣음
        <div className="todo-item" onClick={() => onToggle(id)}>
            <div className="remove" onClick={(e) => {
                e.stopPropagation(); //onToggle이 실행되지 않게 함
                //삭제부분에 들어간 이벤트가 해당 부모의 이벤트까지 전달되지 않도록 해준다.
                onRemove(id);
            }}>❌</div>
            <div className={`todo-text ${checked && 'checked'}`}>
                <div>{text}</div>
            </div>
            {
                checked && (<div className="check-mark">✅</div>)
            }
        </div>
    );
}

export default TodoItem;