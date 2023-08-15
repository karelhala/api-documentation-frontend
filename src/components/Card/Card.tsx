import {FunctionComponent, PropsWithChildren, MouseEvent} from 'react';
import {Card as PFCard, CardBody, Split, SplitItem, Text, TextContent, TextVariants} from '@patternfly/react-core';

import {APIConfigurationIcons} from '@apidocs/common';
import { Link, useNavigate } from 'react-router-dom';

export interface CardProps {
  apiId: string;
  displayName: string;
  icon?: keyof typeof APIConfigurationIcons;
  description: string;
  to: string;
}

export const Card: FunctionComponent<PropsWithChildren<CardProps>> = ({apiId, displayName, icon, description, to, children}) => {
  const navigate = useNavigate();

  const TitleIcon = icon ? APIConfigurationIcons[icon] : APIConfigurationIcons.GenericIcon;

  const onCardClick = (event: MouseEvent) => {
    // Allow default Link new tab on ctrl+click
    if (event.ctrlKey) {
      return;
    }

    event.preventDefault();

    // By-pass click if we actually clicked on a button (or it's children)
    const clickedAButton = event.target instanceof Element && event.target.closest('button');

    if (!clickedAButton) {
      navigate(to)
    }
  }

  return <Link to={to} onClick={onCardClick} style={{textDecoration: 'none'}} className="pf-u-color-100">
    <PFCard
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
  </Link>
};
