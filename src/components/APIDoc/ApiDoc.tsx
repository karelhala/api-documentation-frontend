import {FunctionComponent} from 'react';
import {OpenAPIV3} from "openapi-types";
import {deRef} from "../../utils/Openapi";
import {Divider, TextContent, Text, TextVariants, Stack, StackItem, Bullseye, Spinner} from "@patternfly/react-core";
import {ServerList} from "./ServerList";
import {SecuritySchemeList} from "./SecuritySchemeList";
import { SchemaViewer } from './SchemaViewer';
import {useTags} from "./hooks/useTags";
import {useGroupedOperations} from "./hooks/useGroupedOperations";
import {renderGroupOperations} from "./Operations/renderGroupedOperations";

interface ApiDocProps {
    openapi: OpenAPIV3.Document;
}

export const ApiDoc: FunctionComponent<ApiDocProps> = props => {
    const { openapi } = props;

    const tags = useTags(openapi);
    const groupedOperations = useGroupedOperations(openapi, tags);

    return <Stack hasGutter>
        <StackItem>
            <TextContent>
                <Text component={TextVariants.h1}>
                    { openapi.info.title } v{ openapi.info.version}
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
            <StackItem className="pf-u-pb-lg">
                <Divider
                    className="apid-c-divider pf-u-pb-md"
                    inset={{default: 'insetNone',}}
                />
                <SecuritySchemeList schemes={Object.values(openapi.components.securitySchemes).map(s => deRef(s, openapi))} />
            </StackItem>
        )}

        { groupedOperations.loading ? <Bullseye><Spinner /></Bullseye> :
            <StackItem>
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
                        groupedOperations: groupedOperations.value
                    }) }
                </Stack>
            </StackItem>
         }

        <StackItem>
            <Divider
                className="apid-c-divider pf-u-pb-md"
                inset={{default: 'insetNone',}}
            />
            <SchemaViewer document={ openapi }/>
        </StackItem>
    </Stack>;
}
