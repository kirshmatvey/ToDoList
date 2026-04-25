import DeleteIcon from '@mui/icons-material/Delete';
import type {FilterType, TaskType, TodolistType} from "../../types.ts";
import {Input} from "../input/Input.tsx";
import {EditableSpan} from "../editableSpan/EditableSpan.tsx";
import {Button, IconButton, List, ListItem, Paper} from "@mui/material";

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
                <ListItem sx={{padding: '0'}} key={task.id}>
                    <input onChange={() => {
                        props.updateTask(task.id, props.id)
                    }}
                           type="checkbox"
                           checked={task.status}/>
                    <EditableSpan status={task.status} title={task.taskName}
                                  changeItemTitle={(title: string) => props.changeTaskTitle(title, props.id, task.id)}/>
                    <IconButton onClick={() => {
                        props.removeTask(task.id, props.id)
                    }}><DeleteIcon/></IconButton>
                </ListItem>
            )
        })
        : <span>No tasks to learn</span>

    return (
        <Paper sx={{padding: '0 20px 20px'}} elevation={3}>
            <h3>
                <EditableSpan title={props.title}
                              changeItemTitle={(title: string) => props.changeTodolistTitle(title, props.id)}/>
                <IconButton onClick={() => {
                    props.removeTodolist(props.id)
                }}><DeleteIcon/></IconButton>
            </h3>
            <Input inputSubmitHandler={taskAdditionHandler}/>
            <List>
                {taskList}
            </List>
            <div className={'filter-button-wrapper'}>
                <Button variant={props.filter === 'all' ? 'contained' : 'outlined'}
                        onClick={() => props.filterTasks('all', props.id)}>All</Button>
                <Button variant={props.filter === 'active' ? 'contained' : 'outlined'}
                        onClick={() => props.filterTasks('active', props.id)}>Active</Button>
                <Button variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                        onClick={() => props.filterTasks('completed', props.id)}>Completed</Button>
            </div>
        </Paper>
    )
}



