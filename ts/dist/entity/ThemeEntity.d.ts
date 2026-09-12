import { NovayaGazetaEntityBase } from '../NovayaGazetaEntityBase';
import type { NovayaGazetaSDK } from '../NovayaGazetaSDK';
import type { Control } from '../types';
import type { Theme, ThemeListMatch } from '../NovayaGazetaTypes';
declare class ThemeEntity extends NovayaGazetaEntityBase<Theme> {
    constructor(client: NovayaGazetaSDK, entopts: any);
    make(this: ThemeEntity): ThemeEntity;
    list(this: any, reqmatch?: ThemeListMatch, ctrl?: Control): Promise<ThemeEntity[]>;
}
export { ThemeEntity };
