import {FunctionComponent} from 'react';
import {OpenAPIV3} from "openapi-types";
import {deRef} from "../../utils/Openapi";
import {Divider, TextContent, Text, TextVariants, Stack, StackItem} from "@patternfly/react-core";
import {ServerList} from "./ServerList";
import {SecuritySchemeList} from "./SecuritySchemeList";
import { SchemaViewer } from './SchemaViewer';
import {GroupedOperations} from "./hooks/useGroupedOperations";
import {renderGroupOperations} from "./Operations/renderGroupedOperations";
import {getAuthenticationId, getOperationId, getSchemasId} from "../../utils/OpenapiHtmlIds";
import {getTitleWithVersion} from "../../utils/OpenapiSelectors";

interface ApiDocProps {
    openapi: OpenAPIV3.Document;
    groupedOperations: GroupedOperations;
}

export const ApiDoc: FunctionComponent<ApiDocProps> = props => {
    const { openapi, groupedOperations } = props;

    return <Stack hasGutter>
        <StackItem>
            <TextContent>
                <Text component={TextVariants.h1}>
                    {getTitleWithVersion(openapi)}
                </Text>
                <Text component={TextVariants.p}>
                    { openapi.info.description }
                </Text>
            </TextContent>
        </StackItem>
        { openapi.servers && (
            <StackItem>
                <ServerList servers={openapi.servers}/>
            </StackItem>

        )}
        { openapi.components?.securitySchemes && (
            <StackItem className="pf-u-pb-lg" id={getAuthenticationId()}>
                <Divider
                    className="apid-c-divider pf-u-pb-md"
                    inset={{default: 'insetNone',}}
                />
                <SecuritySchemeList schemes={Object.values(openapi.components.securitySchemes).map(s => deRef(s, openapi))} />
            </StackItem>
        )}

        <StackItem id={getOperationId()}>
            <Divider
                className="apid-c-divider pf-u-pb-md"
                inset={{default: 'insetNone',}}
            />
            <TextContent className="pf-u-pb-lg">
                <Text component={TextVariants.h2}>
                    Operations
                </Text>
            </TextContent>
            <Stack>
                { renderGroupOperations({
                    openapi,
                    groupedOperations: groupedOperations
                }) }
            </Stack>
        </StackItem>

        <StackItem id={getSchemasId()}>
            <Divider
                className="apid-c-divider pf-u-pb-md"
                inset={{default: 'insetNone',}}
            />
            <SchemaViewer document={ openapi }/>
        </StackItem>
    </Stack>;
}
