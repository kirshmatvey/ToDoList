
export type FilterType = 'all' | 'active' | 'completed';

export type TaskType = {
    taskName: string
    id: string
    status: boolean
}

export type TodolistType = {
    title: string
    id: string
    filter: FilterType
}