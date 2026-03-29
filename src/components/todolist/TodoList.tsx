import {Button} from "../button/Button.tsx";
import {type ChangeEvent, type KeyboardEvent, useState} from "react";
import type {FilterType, TaskType, TodolistType} from "../../types.ts";

type TodoListPropsType = {
    id: string;
    title: string
    removeTask: (id: string, todolistId: TodolistType['id']) => void;
    tasks: TaskType[]
    filterTasks: (value: FilterType, todolistId: TodolistType['id']) => void;
    updateTask: (id: string, todolistId: TodolistType['id']) => void;
    addTask: (title: string, todolistId: TodolistType['id']) => void;
    filter: FilterType
}

export const TodoList = (props: TodoListPropsType) => {

    const [input, setInput] = useState("");
    const error = 'Title is required';
    const isInputEmpty = input.trim() === ''

    const inputTitleUpdateHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.currentTarget.value)
    }
    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isInputEmpty) {
            props.addTask(input, props.id)
            setInput("")
        }
    }
    const taskAdditionHandler = () => {
        props.addTask(input, props.id);
        setInput("");
    }

    const taskList = props.tasks.length > 0 ? props.tasks.map(task => {
        return (
            <li key={task.id} className={task.status ? 'completed-task' : ''}>
                <input onChange={() => {props.updateTask(task.id, props.id)}}
                       type="checkbox"
                       checked={task.status}/>
                <span>{task.taskName}</span>
                <Button title={'x'}
                        onClickHandler={() => {props.removeTask(task.id, props.id)}}/>
            </li>
        )
    })
        : <span>No tasks to learn</span>

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input className={isInputEmpty ? 'error' : ''} value={input} onChange={inputTitleUpdateHandler} onKeyUp={onKeyPressHandler}/>
                <Button disabled={isInputEmpty} title={'+'} onClickHandler={taskAdditionHandler}/>
            </div>
            {isInputEmpty && <div className="error-message">{error}</div>}
            <ul>
                {taskList}
            </ul>
            <div className={'filter-button-wrapper'}>
                <Button title={'All'} className={props.filter === 'all' ? 'active-button' : ''} onClickHandler={() => props.filterTasks('all', props.id)}/>
                <Button title={'Active'} className={props.filter === 'active' ? 'active-button' : ''} onClickHandler={() => props.filterTasks('active', props.id)}/>
                <Button title={'Completed'} className={props.filter === 'completed' ? 'active-button' : ''} onClickHandler={() => props.filterTasks('completed', props.id)}/>
            </div>
        </div>
    )
}



