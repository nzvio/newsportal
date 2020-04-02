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
import { ArticleByCategoryRepository } from './repositories/article.bycategory.repository';
import { ArticleByUserRepository } from './repositories/article.byuser.repository';
import { ArticleByNameRepository } from './repositories/article.byname.repository';
import { ArticleByTagRepository } from './repositories/article.bytag.repository';
import { CommentRepository } from './repositories/comment.repository';
import { TagRepository } from './repositories/tag.repository';
import { SettingRepository } from './repositories/setting.repository';
import { UserRepository } from './repositories/user.repository';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { VoteService } from './vote.service';
import { UploadService } from './upload.service';
import { CommentByArticleRepository } from './repositories/commentbyarticle.repository';
import { SocketService } from './socket.service';

@NgModule({
    imports: [                
        
    ],
    declarations: [],
    exports: [],
    providers: [
        AppService,
        AuthService,
        AuthGuard,
        ErrorService,
        DataService,
        VoteService,
        LangRepository,
        PageRepository,
        CategoryRepository,
        ArticleRepository,
        ArticleTopRepository,
        ArticleMainRepository,
        ArticlePopularRepository,
        ArticleRecommendedRepository,
        ArticleByCategoryRepository,
        ArticleByUserRepository,
        ArticleByNameRepository,
        ArticleByTagRepository,
        CommentRepository,
        CommentByArticleRepository,
        TagRepository,
        SettingRepository,
        UserRepository,
        UploadService,
        SocketService,
    ],
})
export class ServicesModule {    
}
