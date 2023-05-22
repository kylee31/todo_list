import React, { KeyboardEvent } from 'react';
import '../css/Form.css';

//input과 button이 담겨있는 컴포넌트
interface FormData{
    value:string,
    onChange(e:React.ChangeEvent<HTMLInputElement>):void,
    onCreate():void,
    onKeyPress(e: KeyboardEvent<HTMLInputElement>):void
}

function Form({ value, onChange, onCreate, onKeyPress }:FormData) {
    return (
        <div className="form">
            <input value={value} onChange={onChange} onKeyPress={onKeyPress} />
            <div className="create-button" onClick={onCreate}>
                추가
            </div>
        </div>
    );
};

export default Form;