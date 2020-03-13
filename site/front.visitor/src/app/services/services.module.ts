import { NgModule } from '@angular/core';

import { AppService } from './app.service';
import { ErrorService } from './error.service';
import { DataService } from './data.service';
import { LangRepository } from './repositories/lang.repository';
import { PageRepository } from './repositories/page.repository';
import { CategoryRepository } from './repositories/category.repository';
import { ArticleTopRepository } from './repositories/article.top.repository';
import { ArticleMainRepository } from './repositories/article.main.repository';
import { ArticlePopularRepository } from './repositories/article.popular.repository';
import { ArticleRepository } from './repositories/article.repository';
import { ArticleRecommendedRepository } from './repositories/article.recommended.repository';
import { CommentRepository } from './repositories/comment.repository';
import { TagRepository } from './repositories/tag.repository';

@NgModule({
    imports: [                
        
    ],
    declarations: [],
    exports: [],
    providers: [
        AppService,
        ErrorService,
        DataService,
        LangRepository,
        PageRepository,
        CategoryRepository,
        ArticleRepository,
        ArticleTopRepository,
        ArticleMainRepository,
        ArticlePopularRepository,
        ArticleRecommendedRepository,
        CommentRepository,
        TagRepository,
    ],
})
export class ServicesModule {    
}
