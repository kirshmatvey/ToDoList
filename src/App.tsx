import './App.css'
import {TodoList} from "./components/todolist/TodoList.tsx";
import {useState} from "react";
import {handleTaskFiltering} from "./utils.ts";
import type {FilterType, TaskType, TodolistType} from "./types.ts";
import {v1} from "uuid";
import {Input} from "./components/input/Input.tsx";
import {AppBar, Box, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';

function App() {

    //Task manipulation
    function removeTask(id: TaskType['id'], todolistId: TodolistType['id']) {
        const newTasks = tasks[todolistId].filter((t) => t.id !== id);
        setTasks({...tasks, [todolistId]: newTasks});
    }

    function filterTasks(value: FilterType, todolistId: TodolistType['id']) {
        const newTodo = todolists.map( t => t.id === todolistId ? {...t, filter: value} : t )
        setTodolists([...newTodo]);
    }

    function updateTask(id: TaskType['id'], todolistId: TodolistType['id']) {
        const newTasks = tasks[todolistId].map((t) => t.id === id ? {...t, status: !t.status} : t);
        setTasks({...tasks, [todolistId]: newTasks})
    }

    function addTask(title: TaskType['taskName'], todolistId: TodolistType['id']) {
        const task = {
            taskName: title,
            id: v1(),
            status: false,
        }
        const newTasks = [task, ...tasks[todolistId]]
        setTasks({...tasks, [todolistId]: newTasks})
    }

    function changeTaskTitle(newTitle: TaskType['taskName'], todolistId: TodolistType['id'], id: TaskType['id']) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map((t) => t.id === id ? {...t, taskName: newTitle} : t)})
    }

    //Todolist manipulation
    function addTodolist(title: string) {
        const newTodolistId = v1()
        setTodolists([{title: title, id: newTodolistId, filter: 'all'}, ...todolists])
        setTasks({[newTodolistId]: [], ...tasks})
    }

    function removeTodolist(todolistId: TodolistType['id']) {
        const newTodo = todolists.filter( (t) => t.id !== todolistId)
        delete tasks[todolistId]
        setTodolists([...newTodo])
    }

    function changeTodolistTitle(title: TodolistType['title'], todolistId: TodolistType['id']) {
        setTodolists(todolists.map((t) => t.id === todolistId ? {...t, title: title} : t))
    }

    //стейты и моковые значения тудулистов
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [tasks, setTasks] = useState<Record<string, TaskType[]>>({
        [todolistId1]: [
            {taskName: 'Bread', id: v1(), status: false},
            {taskName: 'Milk', id: v1(), status: false},
            {taskName: 'Onions', id: v1(), status: true},
            {taskName: 'Meat', id: v1(), status: false},
        ],
        [todolistId2]: [
            {taskName: 'HTML', id: v1(), status: false},
            {taskName: 'CSS', id: v1(), status: true},
            {taskName: 'JS', id: v1(), status: false},
            {taskName: 'React', id: v1(), status: false},
        ]
    });

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {title: 'What to buy', id: todolistId1, filter: 'all'},
        {title: 'What to learn', id: todolistId2, filter: 'all'},
    ])

    return (
        <>
            <AppBar position="sticky">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            color: 'inherit',
                        }}
                    >
                        ToDoLists
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="xl">
                <Box sx={{margin: '20px 0'}}>
                    <Input inputSubmitHandler={addTodolist}/>
                </Box>
                <Grid container columns={4} spacing={'auto'}>
                    {todolists.map((t) => {
                        return (
                            <TodoList
                                key={t.id}
                                id={t.id}
                                removeTask={removeTask}
                                removeTodolist={removeTodolist}
                                filterTasks={filterTasks}
                                updateTask={updateTask}
                                addTask={addTask}
                                tasks={handleTaskFiltering(tasks[t.id], t.filter)}
                                title={t.title}
                                filter={t.filter}
                                changeTodolistTitle={changeTodolistTitle}
                                changeTaskTitle={changeTaskTitle}
                            />
                        )
                    })}
                </Grid>
            </Container>
        </>
    )
}

export default App
