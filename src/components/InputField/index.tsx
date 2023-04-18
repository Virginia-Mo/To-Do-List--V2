import { useAppDispatch } from '../../hooksRedux.ts/hooksTypes';
import { addTask } from '../../reducers/todoReducer';
import { useRef, useState } from 'react';

import "./styles.scss"

const InputField = () => {

const [inputValue, setInputValue] = useState<string>("")

const inputBox = useRef<HTMLInputElement>(null)

const dispatch = useAppDispatch();

const handleSubmit = (e :React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValue === ""){
        return
    }
    dispatch(addTask(inputValue))
    inputBox.current?.blur()
    setInputValue("")
}

    return (
       <form action="" className="input" onSubmit={handleSubmit}>
        <input 
        type="text" 
        ref={inputBox}
        className="input__box"
        name="todo_text"
        placeholder="Enter your task"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} />
        <button type="submit" className="input__button">GO</button>
       </form> 
    )
}

export default InputField;