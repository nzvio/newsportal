export abstract class APIService {
    protected isEmpty(v: any): boolean {
        return v === null || v === undefined;
    }
}
