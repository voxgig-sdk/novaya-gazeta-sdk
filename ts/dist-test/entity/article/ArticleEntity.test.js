"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ArticleEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when NOVAYA_GAZETA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('NOVAYA_GAZETA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.NovayaGazetaSDK.test();
        const ent = testsdk.Article();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.NOVAYA_GAZETA_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'article.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "author": { "a": true, "h": "Author", "n": "author", "r": false, "sh": "Article author", "t": "`$STRING`", "key$": "author", "index$": 0 }, "category": { "a": true, "h": "Category", "n": "category", "r": false, "sh": "Article category", "t": "`$STRING`", "key$": "category", "index$": 1 }, "content": { "a": true, "h": "Content", "n": "content", "r": false, "sh": "Article content", "t": "`$STRING`", "key$": "content", "index$": 2 }, "publishedDate": { "a": true, "fo": "date-time", "h": "Published Date", "n": "publishedDate", "r": false, "sh": "Publication date", "t": "`$STRING`", "key$": "publishedDate", "index$": 3 }, "slug": { "a": true, "h": "Slug", "n": "slug", "r": false, "sh": "Article slug", "t": "`$STRING`", "key$": "slug", "index$": 4 }, "tags": { "a": true, "h": "Tags", "n": "tags", "r": false, "sh": "Article tags", "t": "`$ARRAY`", "key$": "tags", "index$": 5 }, "title": { "a": true, "h": "Title", "n": "title", "r": false, "sh": "Article title", "t": "`$STRING`", "key$": "title", "index$": 6 } }, "name": "article", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /get/slugs", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": false, "k": "query", "n": "eu", "or": "eu", "r": false, "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "k": "query", "n": "slug", "or": "slug", "r": true, "t": "`$ARRAY`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/get/slugs", "q": { "exist": ["eu", "slug"] }, "r": {}, "s": [{ "lit": "get" }, { "lit": "slugs" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "article", "name__orig": "article", "Name": "Article", "name_": "article", "name-": "article", "NAME": "ARTICLE", "index$": 0 }, { "active": true, "entity": "article", "key$": "BasicArticleFlow", "kind": "basic", "name": "BasicArticleFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "article_ref01" } }], "index$": 0 }] }, 'Article', { "GET /get/slugs": { "protocol": "http", "operationId": "getSlugsList", "responses": { "200": { "description": "Successfully retrieved articles", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "slug": { "type": "string", "description": "Article slug", "key$": "slug" }, "title": { "type": "string", "description": "Article title", "key$": "title" }, "content": { "type": "string", "description": "Article content", "key$": "content" }, "author": { "type": "string", "description": "Article author", "key$": "author" }, "publishedDate": { "type": "string", "format": "date-time", "description": "Publication date", "key$": "publishedDate" }, "category": { "type": "string", "description": "Article category", "key$": "category" }, "tags": { "type": "array", "items": { "type": "string" }, "description": "Article tags", "key$": "tags" } }, "index$": 0 } } } } }, "400": { "description": "Bad request - invalid slug format" }, "404": { "description": "Articles not found" }, "500": { "description": "Internal server error" } }, "parameters": [{ "name": "eu", "in": "query", "description": "Whether to use novayagazeta.eu (true) or novayagazeta.ru (false)", "required": false, "schema": { "type": "boolean", "default": false }, "index$": 0 }, { "name": "slugs", "in": "query", "description": "Array of article slugs to retrieve (e.g., 2026/04/24/daleko-idushchie-vyvody-nalichnykh)", "required": true, "schema": { "type": "array", "items": { "type": "string" } }, "style": "form", "explode": true, "index$": 1 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let article_ref01_data = Object.values(setup.data.existing.article)[0];
        // LIST
        const article_ref01_ent = client.Article();
        const article_ref01_match = {};
        const article_ref01_list = (await article_ref01_ent.list(article_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/article/ArticleTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.NovayaGazetaSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['article01', 'article02', 'article03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'NOVAYA_GAZETA_TEST_ARTICLE_ENTID': idmap,
        'NOVAYA_GAZETA_TEST_LIVE': 'FALSE',
        'NOVAYA_GAZETA_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['NOVAYA_GAZETA_TEST_ARTICLE_ENTID'];
    const live = 'TRUE' === env.NOVAYA_GAZETA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['NOVAYA_GAZETA_TEST_ARTICLE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.NovayaGazetaSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.NOVAYA_GAZETA_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ArticleEntity.test.js.map