import React from 'react';
import { Form, PageSection, PageSectionVariants, Sidebar } from '@patternfly/react-core';
import { SearchInputBasic } from './SearchBar';
import { CheckboxControlled } from './CheckBox';

export const SidebarBasic: React.FunctionComponent = () => (
  <PageSection variant={PageSectionVariants.light} stickyOnBreakpoint={{ default: 'top' }}>
    <Sidebar hasGutter>
      <Form>
        <SearchInputBasic/>
        <CheckboxControlled/>
      </Form>
    </Sidebar>
  </PageSection>
);
