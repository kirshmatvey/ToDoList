import {Button} from "../button/Button.tsx";
import type {FilterType, TaskType, TodolistType} from "../../types.ts";
import {Input} from "../input/Input.tsx";
import {EditableSpan} from "../editableSpan/EditableSpan.tsx";

type TodoListPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    filter: FilterType
    removeTask: (id: string, todolistId: TodolistType['id']) => void
    removeTodolist: (todolistId: TodolistType['id']) => void
    filterTasks: (value: FilterType, todolistId: TodolistType['id']) => void
    updateTask: (id: string, todolistId: TodolistType['id']) => void
    addTask: (title: string, todolistId: TodolistType['id']) => void
    changeTodolistTitle: (title: TodolistType['title'], todolistId: TodolistType['id']) => void
    changeTaskTitle: (newTitle: TaskType['taskName'], todolistId: TodolistType['id'], id: TaskType['id']) => void
}

export const TodoList = (props: TodoListPropsType) => {

    const taskAdditionHandler = (input: string) => {
        props.addTask(input, props.id);
    }

    const taskList = props.tasks.length > 0 ? props.tasks.map(task => {
        return (
            <li key={task.id} className={task.status ? 'completed-task' : ''}>
                <input onChange={() => {props.updateTask(task.id, props.id)}}
                       type="checkbox"
                       checked={task.status}/>
                <EditableSpan title={task.taskName} changeItemTitle={(title: string) => props.changeTaskTitle(title, props.id, task.id)}/>
                <Button title={'x'}
                        onClickHandler={() => {props.removeTask(task.id, props.id)}}/>
            </li>
        )
    })
        : <span>No tasks to learn</span>

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeItemTitle={(title: string) => props.changeTodolistTitle(title, props.id)}/>
                <Button title={'x'} onClickHandler={() => {props.removeTodolist(props.id)}}/>
            </h3>
            <Input inputSubmitHandler={taskAdditionHandler}/>
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



