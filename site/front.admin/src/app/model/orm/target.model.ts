import { Model } from '../model';
import { Donor } from './donor.model';

export class Target extends Model {
    public _id: string;    
    public donor: string | Donor;
    public rss: string;
    public category: string;
    public lang: string;
    public active: boolean;
    public defended: boolean;

    public init(): Target {
        this.donor = null;
        this.category = null;
        this.lang = null;
        this.active = true;
        
        return this;
    }
}
