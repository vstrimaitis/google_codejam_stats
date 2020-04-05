import { Task } from "../model/RoundInfo";

export const totalValue = (task: Task): number =>
    task.tests.map(t => t.value).reduce((v, s) => v + s);

export const sortByTotalValue = (tasks: Task[]): Task[] =>
    tasks.sort((a, b) => totalValue(a) - totalValue(b));