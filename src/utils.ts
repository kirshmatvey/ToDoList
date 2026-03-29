import type {FilterType, TaskType} from "./types.ts";

export function handleTaskFiltering(tasks: TaskType[], filter: FilterType) {
    return filter === 'active'
        ? tasks.filter((t) => !t.status)
        : filter === 'completed' ? tasks.filter((t) => t.status)
            : tasks
}

