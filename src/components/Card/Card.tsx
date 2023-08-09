import {FunctionComponent, PropsWithChildren, MouseEvent, KeyboardEvent} from 'react';
import {Card as PFCard, CardBody, Split, SplitItem, Text, TextContent, TextVariants} from '@patternfly/react-core';

import {APIConfigurationIcons} from '@apidocs/common';

export interface CardProps {
  apiId: string;
  displayName: string;
  icon?: keyof typeof APIConfigurationIcons;
  description: string;
}

export const Card: FunctionComponent<PropsWithChildren<CardProps>> = ({apiId, displayName, icon, description, children}) => {
  const TitleIcon = icon ? APIConfigurationIcons[icon] : APIConfigurationIcons.GenericIcon;

  return <PFCard
    role="link"
    isSelectableRaised
    isFullHeight
    ouiaId={apiId}
     >
      <CardBody>
        <Split className="pf-u-mb-sm">
          <SplitItem>
            <TitleIcon />
          </SplitItem>
          <SplitItem>
            <Text component="p" className="pf-u-font-size-md pf-u-m-sm pf-u-ml-md">
              {displayName}
            </Text>
          </SplitItem>
          </Split>
        <TextContent>

          <Text component={TextVariants.small}>
            {description}
          </Text>
        </TextContent>
        {children}
      </CardBody>
    </PFCard>
};
