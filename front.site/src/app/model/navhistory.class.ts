import { INavScroll } from './navscroll.interface';

export class NavHistory {
    public states: INavScroll[] = [];
    public needScrollTo: number = 0;

    public processUrl (state: INavScroll): void {
        let currentState: INavScroll = this.states.find(s => s.url === state.url) || null;

        if (currentState) {
            currentState.scroll = state.scroll;
        } else {
            this.states.push(state);
        }
    }
}