import {OpenAPIV3} from "openapi-types";
import {Tag} from "./useTags";
import {BackgroundTaskState, useBackgroundTask} from "../../../hooks/useBackgroundTask";

interface Operation {
    id: string;
    rawOperation: OpenAPIV3.OperationObject;
    verb: string;
    path: string;
}

interface Group extends Tag {
    operationIds: Array<string>;
}

export interface GroupedOperations {
    groups: Array<Group>;
    others: Array<string>;
    operations: Record<string, Operation>;
}

const operationVerbs: string[] = ["get", "post", "patch", "put", "delete", "options", "head", "trace"]

export const useGroupedOperations = (openapi: OpenAPIV3.Document, tags: Array<Tag>): BackgroundTaskState<GroupedOperations> => {
    return useBackgroundTask(() => {
        const grouped: GroupedOperations = {
            groups: tags.map(t => ({
                ...t,
                operationIds: []
            })),
            others: [],
            operations: {}
        };

        Object.entries(openapi.paths)
            // Looks like openapi v3.1 supports components here as well
            .forEach(([path, pathObject]) =>
                Object.entries(pathObject as Record<OpenAPIV3.HttpMethods, OpenAPIV3.OperationObject>)
                    .filter(([verb, _operation]) => operationVerbs.includes(verb))
                    .forEach(([verb, operation]) => {
                        const operationId = operation.operationId || `${verb}-${path}`;
                        grouped.operations[operationId] = {
                            id: operationId,
                            rawOperation: operation,
                            verb,
                            path
                        };

                        let found = false;

                        if (operation.tags) {
                            for (const group of grouped.groups) {
                                if (operation.tags.includes(group.id)) {
                                    found = true;
                                    group.operationIds.push(operationId);
                                }
                            }
                        }

                        if (!found) {
                            grouped.others.push(operationId);
                        }
                    })
            );

        grouped.groups = grouped.groups.filter(g => g.operationIds.length > 0);

        return grouped;
    }, [openapi, tags]);
}
