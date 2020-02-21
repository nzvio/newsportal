export class URL {
    public parts: string[] = [];

    public build(currentUrl: string): void {
        this.parts = currentUrl.split("/");
        this.parts.splice(0, 1);
    }
}