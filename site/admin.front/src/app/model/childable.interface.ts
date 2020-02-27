import { Category } from './category.model';
import { Page } from './page.model';

export interface Childable {
    __children: Category[] | Page[];     
    __shift: string; 
    __level: number;
}
