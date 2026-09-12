import { NovayaGazetaEntityBase } from '../NovayaGazetaEntityBase';
import type { NovayaGazetaSDK } from '../NovayaGazetaSDK';
import type { Control } from '../types';
import type { Article, ArticleListMatch } from '../NovayaGazetaTypes';
declare class ArticleEntity extends NovayaGazetaEntityBase<Article> {
    constructor(client: NovayaGazetaSDK, entopts: any);
    make(this: ArticleEntity): ArticleEntity;
    list(this: any, reqmatch?: ArticleListMatch, ctrl?: Control): Promise<ArticleEntity[]>;
}
export { ArticleEntity };
