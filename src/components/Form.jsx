import React, { useState } from 'react'

function Form({inputText, setInputText, todos, setTodos, setStatus}) {
    const [alertWarning, setAlertWarning] = useState(false);
    const [alertSuccess, setAlertSuccess] = useState(false);

    const inputTextHandler = (e) => {
        setInputText(e.target.value)
    }

    const submitTodoHandler = (e) => {
        e.preventDefault();
        const isEmpty = str => !str.trim().length;
        if (isEmpty(inputText)) {
            setAlertWarning(true);
            setTimeout(() => {
                setAlertWarning(false);
            }, 1250);
        } else {
            setAlertSuccess(true);
            setTimeout(() => {
                setAlertSuccess(false);
            }, 1250);
            setTodos([
                ...todos,
                { text: inputText, completed: false, id: Math.random() }
            ]);
        }
        setInputText("")
    }

    const statusHandler = (e) => {
        setStatus(e.target.value)
    }
    

  return (
    <div>
        <form>
            <div className="search">
                <input value={inputText} type="text" className="todo-input" placeholder="Add..." onChange={inputTextHandler}/>
                <button onClick={submitTodoHandler} className="todo-button" type="submit">
                    <i className="fas fa-plus-circle"></i>
                </button>
            </div>

            <div className="select">
                <select name="todos" className="filter-todo" onChange={statusHandler}>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div>
            <div className="alert-wrapper">
                {alertWarning ? <div className="alert-warning">
                    <div>Input'u boş qoymaq olmaz!</div>
                </div> : ""}
                {alertSuccess ? <div className="alert-success">
                    <div>Uğurlu</div>
                </div> : ""}
            </div>
        </form>
    </div>
  );
}

export default Form