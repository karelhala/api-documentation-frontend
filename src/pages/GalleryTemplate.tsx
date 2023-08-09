import {APIConfiguration, APIConfigurationIcons, pages} from "@apidocs/common";
import {CSSProperties, FunctionComponent, useMemo} from "react";
import {Gallery, GalleryItem} from "@patternfly/react-core";
import {Card} from "../components/Card/Card";
import {Tag, Tags} from "../components/Tags";
import { Link } from "react-router-dom";

interface GaleryProps {
    id?: string;
    elements: ReadonlyArray<APIConfiguration>;
    isHidden?: boolean
}

export const GalleryTemplate: FunctionComponent<GaleryProps> = ({id, elements, isHidden}) => {

    const style = useMemo<CSSProperties>(() => (isHidden ? {
        visibility: 'hidden',
        overflow: 'hidden',
        height: 0
    } : {}), [isHidden]);

    return (
        <Gallery id={id} style={style} minWidths={{default: '300px'}} hasGutter>
            { elements.map(apiConfig => (
                <GalleryItem key={apiConfig.displayName}>
                    <Link to={pages.getApiPage(apiConfig.id)} style={{textDecoration: 'none'}}>
                        <Card
                            apiId={apiConfig.id}
                            displayName={apiConfig.displayName}
                            icon={apiConfig.icon ?? APIConfigurationIcons.GenericIcon}
                            description={apiConfig.description}
                        >
                            { apiConfig.tags.length > 0 && (
                                <div className="apid-tags__main">
                                    <Tags>
                                        {apiConfig.tags.map(t => <Tag key={t.id} value={t} />)}
                                    </Tags>
                                </div>
                            )}
                        </Card>
                    </Link>
                </GalleryItem>
            ))}
        </Gallery>
    );
}
