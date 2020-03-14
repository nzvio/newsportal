import { Category } from './orm/category.model';
import { Page } from './orm/page.model';

export interface Childable {
    __children: Category[] | Page[];     
    __shift: string; 
    __level: number;
}
