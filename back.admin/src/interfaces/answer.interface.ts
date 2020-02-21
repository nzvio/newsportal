export interface IAnswer<T> {
    status: number;
    error?: string;
    data?: T;
    fullLength?: number; // quantity of all elements in table
}
