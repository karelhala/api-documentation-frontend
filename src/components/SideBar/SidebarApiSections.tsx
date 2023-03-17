import {Fragment, FunctionComponent, ReactNode, useEffect, useMemo, useState} from "react";
import {OpenAPIV3} from "openapi-types";
import {GroupedOperations} from "../APIDoc/hooks/useGroupedOperations";
import {JumpLinks, JumpLinksItem, JumpLinksList, Skeleton} from "@patternfly/react-core";
import {
    getAuthenticationId,
    getOperationGroupId,
    getOperationId,
    getSchemasId, getApiSidebarContentId,
    getUngroupedOperationsId
} from "../../utils/OpenapiHtmlIds";
import {BackgroundTaskState} from "../../hooks/useBackgroundTask";
import {getTitleWithVersion} from "../../utils/OpenapiSelectors";

export interface SidebarApiSectionsProps {
    openapi: OpenAPIV3.Document | undefined;
    groupedOperations: BackgroundTaskState<GroupedOperations>;
}

const scrollableSelector = `#${getApiSidebarContentId()}`;

export const SidebarApiSections: FunctionComponent<SidebarApiSectionsProps> = ({openapi, groupedOperations}) => {
    const jumpLinkContent = useMemo(() => {
        const links = [];

        if (openapi?.security) {
            links.push(<JumpLinksItem key="authentication" href={`#${getAuthenticationId()}`}>Authentication</JumpLinksItem>)
        }

        const operationSublinkContent: Array<ReactNode> = [];
        if (!groupedOperations.loading) {
            groupedOperations.value.groups
                .forEach(g => operationSublinkContent.push(
                    <JumpLinksItem
                        key={g.id}
                        href={`#${getOperationGroupId(g.id)}`}
                    >
                        {g.description || g.name}
                    </JumpLinksItem>
                ));

            if (groupedOperations.value.others.length > 0 && groupedOperations.value.groups.length > 0) {
                operationSublinkContent.push(<JumpLinksItem
                    key="others"
                    href={`#${getUngroupedOperationsId()}`}
                >
                    Other operations
                </JumpLinksItem>)
            }
        } else {
            operationSublinkContent.push(<Fragment key="loading">
                <JumpLinksItem>
                    <Skeleton />
                </JumpLinksItem>
                <JumpLinksItem>
                    <Skeleton />
                </JumpLinksItem>
                <JumpLinksItem>
                    <Skeleton />
                </JumpLinksItem>
            </Fragment>);
        }

        links.push(<JumpLinksItem href={`#${getOperationId()}`}>
            Operations
            {operationSublinkContent.length > 0 ? <JumpLinksList>{operationSublinkContent}</JumpLinksList> : []}
        </JumpLinksItem>);

        if (openapi?.components?.schemas) {
            links.push(<JumpLinksItem href={`#${getSchemasId()}`}>Schemas</JumpLinksItem>);
        }

        return links;
    }, [openapi, groupedOperations]);

    const [offset, setOffset] = useState(0);
    useEffect(() => {
        const sidebarContent = document.getElementById(getApiSidebarContentId());
        if (sidebarContent) {
            setOffset(window.scrollY + sidebarContent.getBoundingClientRect().top);
        }
    }, [setOffset]);

    return <>
        <div className="pf-u-pt-lg">
            <JumpLinks
                label={openapi && getTitleWithVersion(openapi)}
                scrollableSelector={scrollableSelector}
                offset={offset}
                className="apid-c-jump-links"
                isVertical
                isExpanded
                alwaysShowLabel
            >
                {jumpLinkContent}
            </JumpLinks>
        </div>
    </>;
};
