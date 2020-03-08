export interface IAnswer<T> {
    readonly statusCode: number;
    readonly error?: string;
    readonly data?: T;
    readonly fullLength?: number; // quantity of all elements in table
}
