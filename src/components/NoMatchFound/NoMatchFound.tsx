import {FunctionComponent} from "react";
import {Button, EmptyState, EmptyStateBody, EmptyStateIcon, EmptyStatePrimary, Title} from "@patternfly/react-core";
import {SearchIcon} from "@patternfly/react-icons";

interface NoMatchFoundProps {
    clearFilters: () => void;
}

export const NoMatchFound: FunctionComponent<NoMatchFoundProps> = ({clearFilters}) => <EmptyState>
    <EmptyStateIcon icon={SearchIcon} />
    <Title size="lg" headingLevel="h4">
        No results found
    </Title>
    <EmptyStateBody>
        No results match the filter criteria. Clear all filters and try again.
    </EmptyStateBody>
    <EmptyStatePrimary>
        <Button onClick={clearFilters} variant="link">Clear all filters</Button>
    </EmptyStatePrimary>
</EmptyState>;
