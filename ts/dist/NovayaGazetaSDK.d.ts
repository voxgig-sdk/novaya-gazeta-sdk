import { ArticleEntity } from './entity/ArticleEntity';
import { ThemeEntity } from './entity/ThemeEntity';
export type * from './NovayaGazetaTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { NovayaGazetaEntityBase } from './NovayaGazetaEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class NovayaGazetaSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Article(entopts?: Record<string, any>): ArticleEntity;
    Theme(entopts?: Record<string, any>): ThemeEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): NovayaGazetaSDK;
    tester(testopts?: any, sdkopts?: any): NovayaGazetaSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof NovayaGazetaSDK;
export { stdutil, config, BaseFeature, NovayaGazetaEntityBase, NovayaGazetaSDK, SDK, };
