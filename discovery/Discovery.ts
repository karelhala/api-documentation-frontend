export interface Discovery {
    apis: Array<Group>;
}

export interface Group {
    id: string;
    name: string;
    apps: Array<App>
}

export type App = {
    id: string;
    name: string;
    description: string;
    url?: string;
    skip?: boolean;
} & {
    skip: true;
    skipReason: string;
}

export const getPath = (app: App): string => {
    if (app.url) {
        return app.url;
    }

    return `./discovery/resources/api/${app.id}/openapi.json`;
}
