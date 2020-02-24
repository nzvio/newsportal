import { AdmLangRepository } from '../services/repositories/admlang.repository';
import { AdmLang } from '../model/admlang.model';

export abstract class Page {
    constructor(protected admlangRepository: AdmLangRepository) {}
    get currentLang(): AdmLang {return this.admlangRepository.currentLang;}
}