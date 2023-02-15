import React from 'react';
import { Checkbox } from '@patternfly/react-core';

export const CheckboxControlled: React.FunctionComponent = () => {
    return (
        <div>
            <div className='pf-u-mt-m'>
                <strong>Use Case</strong>
                <Checkbox name="access-control" label="access control" id="checkbox-access-control"></Checkbox>
                <Checkbox name="compliance" label="compliance" id="checkbox-compliance"></Checkbox>
                <Checkbox name="monitoring spend" label="monitoring-spend" id="checkbox-monitoring-spend"></Checkbox>
                <Checkbox name="security" label="security" id="checkbox-security"></Checkbox>
            </div>
            <div className='pf-u-mt-lg'>
                <strong>Saas Services</strong>
                <Checkbox name="insights" label="insights" id="checkbox-insights"></Checkbox>
                <Checkbox name="rhel-edge" label="RHEL Edge" id="checkbox-rhel-edge"></Checkbox>
                <Checkbox name="ansible-automation-platform" label="Ansible Automation Platform"id="checkbox-ansible-automation-platform"></Checkbox>
                <Checkbox name="openShift" label="OpenShift" id="checkbox-OpenShift"></Checkbox>
                <Checkbox name="application-services" label="Application Services" id="checkbox-application-services"></Checkbox>
            </div>
            <div className='pf-u-mt-lg'>
                <strong>Supporting Red Hat Platform</strong>
                <Checkbox name="openShift" label="OpenShift" id="checkbox-OpenShift"></Checkbox>
                <Checkbox name="rhel" label="RHEL" id="checkbox-rhel"></Checkbox>
                <Checkbox name="ansible-automation" label="Ansible Automation" id="checkbox-ansible-automation"></Checkbox>
            </div>
        </div>
    );
};
