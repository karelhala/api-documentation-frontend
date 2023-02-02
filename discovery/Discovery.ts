export interface Discovery {
    apis: {
        [id: string]: DiscoveryAPI
    }
}

export interface DiscoveryAPI {
    name: string;
    description: string;
    url?: string;
}

export const getPath = (key: string, discovery: Discovery): string => {
    const discoveryApi = discovery.apis[key];
    if (discoveryApi.url) {
        return discoveryApi.url;
    }

    return `./discovery/resources/api/${key}/openapi.json`;
}
