import Discovery from './Discovery.json';
import {DiscoveryAPI, getPath} from "./Discovery";
import SwaggerParser from '@apidevtools/swagger-parser';

describe('Discovered OpenAPI are valid OpenAPI3.0+', () => {
    const validApiTest = async (apiId: string, discoveryAPI: DiscoveryAPI) => {
        const api = await SwaggerParser.validate(getPath(apiId, Discovery));
        expect(api).toBeTruthy();

        expect(api).toHaveProperty('openapi');

        const version = (api as any).openapi as string;
        expect(version).toMatch(/^3(.\d(.\d)?)?/);
    }

    describe('local file', () => {
        test.each(Object.entries(Discovery.apis).filter(a => !('url' in a[1])))('%p', validApiTest)
    });

    describe('public url', () => {
        test.each(Object.entries(Discovery.apis).filter(a => 'url' in a[1]))('%p', validApiTest)
    });
});
