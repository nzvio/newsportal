export class Phrase {
    public text: string;
    public mark: string;
    public note: string;
    public pos: number;

    public init(): Phrase {
        this.pos = 0;

        return this;
    }
}
