export interface IAnswer<T> {
    statusCode: number;
    error?: string;
    data?: T;
    fullLength?: number; // quantity of all elements in table
}
