import { NgModule } from '@angular/core';

import { AppService } from './app.service';
import { DataService } from './data.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ErrorService } from './error.service';
import { UsergroupRepository } from './repositories/usergroup.repository';
import { UserRepository } from './repositories/user.repository';
import { UploadService } from './upload.service';
import { AdmLangRepository } from './repositories/admlang.repository';
import { LangRepository } from './repositories/lang.repository';
import { PageRepository } from './repositories/page.repository';
import { SlugService } from './slug.service';
import { CategoryRepository } from './repositories/category.repository';
import { ArticleRepository } from './repositories/article.repository';
import { DonorRepository } from './repositories/donor.repository';
import { TargetRepository } from './repositories/target.repository';
import { SocketService } from './socket.service';
import { ParseerrorRepository } from './repositories/parseerror.repository';
import { CommentRepository } from './repositories/comment.repository';
import { TagRepository } from './repositories/tag.repository';
import { SettingRepository } from './repositories/setting.repository';
import { SitemapRepository } from './repositories/sitemap.repository';

@NgModule({
    declarations: [],
    imports: [],
    providers: [
		AppService,
		ErrorService,
		DataService,
		AdmLangRepository,
		AuthService,
		AuthGuard,
		UploadService,
		SlugService,
		SocketService,
		UsergroupRepository,
		UserRepository,
		LangRepository,
		PageRepository,
		CategoryRepository,
		ArticleRepository,
		DonorRepository,
		TargetRepository,
		ParseerrorRepository,
		CommentRepository,
		TagRepository,
		SettingRepository,
		SitemapRepository,
	],
})
export class ServicesModule { }
