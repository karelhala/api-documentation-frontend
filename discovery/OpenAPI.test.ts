import {App, Discovery, getPath, Group} from "./Discovery";
import SwaggerParser from '@apidevtools/swagger-parser';
import {readFileSync} from 'fs';
import {parse} from 'yaml';

const discovery: Discovery = parse(readFileSync('./discovery/Discovery.yml').toString());

const extractName = (app: App) => [`${app.name}(${app.id})`, app] as const;

describe('Discovered OpenAPI are valid OpenAPI3.0+', () => {
    const validApiTest = async (_ignore: string, app: App) => {
        const api = await SwaggerParser.validate(getPath(app));
        expect(api).toBeTruthy();

        expect(api).toHaveProperty('openapi');

        const version = (api as any).openapi as string;
        expect(version).toMatch(/^3(.\d(.\d)?)?/);
    }

    describe.each(Object.values(discovery.apis).map(a => [`${a.name}(${a.id})`, a.apps]))('%s', (_ignore, apps) => {
        const skipped = apps.filter(a => a.skip);

        const appsWithPublicUrls = apps.filter(a => a.url && !a.skip);
        const appsWithNonPublicUrls = apps.filter(a => !a.url && !a.skip);

        if (appsWithPublicUrls.length > 0) {
            describe('public url', () => {
                test.each(appsWithPublicUrls.map(extractName))('%s', validApiTest);
            });
        }

        if (appsWithNonPublicUrls.length > 0) {
            describe('local file', () => {
                test.each(appsWithNonPublicUrls.map(extractName))('%s', validApiTest);
            });
        }
        if (skipped.length > 0) {
            describe('Skipped', () => {
                test.skip.each(skipped.map(a => `${a.name}(${a.id}) - ${a.skipReason}`))('%s', () => {
                    fail('Should skip this test');
                });
            })
        }
    })
});
