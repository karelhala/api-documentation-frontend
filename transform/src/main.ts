import {Discovery, App} from "discovery/Discovery";
import {parse} from "yaml";
import prettier from 'prettier';
import pLimit from 'p-limit';
import {mkdirSync, readFileSync, writeFileSync} from "fs";
import path from "path";
import got from "got";
import {getCommand} from "./program.js";
import { fileURLToPath } from 'url'
import Dot, {templateSettings} from 'dot';
import * as Eta from "eta"
import render from "eta/dist/types/render";

interface Options {
    discoveryFile: string;
    outputDir: string;
}

type BuildApi = {
    path: Array<string>;
    apiContent: string;
    app: App;
}

const getApiContent = async (discoveryPath: string, app: App, group: string): Promise<string> => {
    if (app.useLocalFile) {
        return readFileSync(path.resolve(
            discoveryPath,
            'resources',
            'api',
            group,
            app.id,
            'openapi.json'
        )).toString();
    } else if (app.url) {
        return got.get(app.url).text();
    } else {
        throw new Error('API was not skipped, but is not using local file or url:' + app.id);
    }
}

export const execute = async (options: Options) => {
    const limit = pLimit(5); // 5 downloads at once

    const discoveryContent = parse(readFileSync(options.discoveryFile).toString()) as Discovery;
    const discoveryPath = path.dirname(options.discoveryFile);

    // Download all the APIs and build
    const buildApis: Array<BuildApi> = await Promise.all(discoveryContent.apis
        .flatMap(group => group.apps
            // Ignore apps that were skipped or are not openapiv3
            .filter(app => !app.skip && app.apiType === "openapi-v3")
            .map(async (app) => {
                return await limit(async (): Promise<BuildApi> => {
                    return ({
                        path: [ group.id, app.id ],
                        apiContent: await getApiContent(discoveryPath, app, group.id),
                        app
                    })
                });
            })
        ));

    // Write openapi files
    buildApis.forEach(api => {
        mkdirSync(
            path.resolve(
                options.outputDir,
                'apis',
                ...api.path
            ),
            {
                recursive: true
            }
        );

        writeFileSync(
            path.resolve(
                options.outputDir,
                'apis',
                ...api.path,
                'openapi.json'
            ),
            api.apiContent
        );
    });

    // Write ts file
    const templateFile = path.resolve('src', 'apis.eta');
    const templateString = readFileSync(templateFile).toString();
    /*const template = Dot.template(templateString, {
        ...Dot.templateSettings,
        strip: false,
        selfcontained: true,

    });
    const result = template({
        api: buildApis
    });*/

    const result = Eta.render(templateString, {
        api: buildApis
    }, {
        filename: templateFile
    }) as string;

    const prettyResult = prettier.format(
        result,
        {
            parser: 'typescript'
        }
    );

    writeFileSync(
        path.resolve(options.outputDir, 'apis.ts'),
        prettyResult
    );
}

if (process.argv) {
    const nodePath = path.resolve(process.argv[1]);
    const modulePath = path.resolve(fileURLToPath(import.meta.url))

    if (nodePath === modulePath) {
        const command = getCommand();
        command.parse(process.argv);
        execute(command.opts() as Options);
    }
}
