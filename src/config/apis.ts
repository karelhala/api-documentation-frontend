// Auto generated file, do not modify directly.
// See api-documentation-frontend/transform for more info on how to generate this file.

import { OpenAPIV3 } from "openapi-types";

import APIConfigurationIcons from "./APIConfigurationIcons";

export interface APIConfiguration {
  id: string;
  displayName: string;
  icon: keyof typeof APIConfigurationIcons;
  description: string;
  getApi: () => Promise<OpenAPIV3.Document>;
  tags: ReadonlyArray<Readonly<APILabel>>;
}

export interface APILabel {
  id: string;
  name: string;
  type: "use-case" | "service" | "platform";
}

export const apiLabelsMap: Record<string, Readonly<APILabel>> = {
  ansible: {
    id: "ansible",
    name: "Ansible",
    type: "service",
  },
  "application-services": {
    id: "application-services",
    name: "Application Services",
    type: "service",
  },
  automation: {
    id: "automation",
    name: "Automation",
    type: "use-case",
  },
  "data-services": {
    id: "data-services",
    name: "Data Services",
    type: "use-case",
  },
  deploy: {
    id: "deploy",
    name: "Deploy",
    type: "use-case",
  },
  edge: {
    id: "edge",
    name: "Edge",
    type: "service",
  },
  infrastructure: {
    id: "infrastructure",
    name: "Infrastructure",
    type: "use-case",
  },
  insights: {
    id: "insights",
    name: "Insights",
    type: "service",
  },
  "integrations-and-notifications": {
    id: "integrations-and-notifications",
    name: "Integrations and Notifications",
    type: "use-case",
  },
  inventories: {
    id: "inventories",
    name: "Inventories",
    type: "service",
  },
  "identify-and-access-management": {
    id: "identify-and-access-management",
    name: "Identify and Access Management",
    type: "use-case",
  },
  observe: {
    id: "observe",
    name: "Observe",
    type: "use-case",
  },
  openshift: {
    id: "openshift",
    name: "Openshift",
    type: "platform",
  },
  rhel: {
    id: "rhel",
    name: "RHEL",
    type: "platform",
  },
  security: {
    id: "security",
    name: "Security",
    type: "use-case",
  },
  "spend-management": {
    id: "spend-management",
    name: "Spend Management",
    type: "use-case",
  },
  "system-configuration": {
    id: "system-configuration",
    name: "System Configuration",
    type: "use-case",
  },
};

export const apiLabels = Object.values(apiLabelsMap) as ReadonlyArray<
  Readonly<APILabel>
>;

export const apiConfigurations: ReadonlyArray<Readonly<APIConfiguration>> = [
  {
    id: "insights",
    displayName: "Advisor",
    description: "The API of the Advisor project in Insights",
    icon: "InsightsIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/insights/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [
      apiLabelsMap["rhel"],
      apiLabelsMap["insights"],
      apiLabelsMap["observe"],
    ],
  },
  {
    id: "automation-hub",
    displayName: "Automation Hub",
    description: "Fetch, Upload, Organize, and Distribute Ansible Collections",
    icon: "AnsibleIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/automation-hub/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["automation"]],
  },
  {
    id: "cost-management",
    displayName: "Cost Management",
    description:
      "The API for Project Koku and OpenShift cost management. You can find out more about Project Koku at https://github.com/project-koku",
    icon: "OpenShiftIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/cost-management/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["spend-management"]],
  },
  {
    id: "drift",
    displayName: "Drift Backend Service",
    description: "Service that returns differences between systems.",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/drift/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [
      apiLabelsMap["ansible"],
      apiLabelsMap["rhel"],
      apiLabelsMap["observe"],
      apiLabelsMap["openshift"],
    ],
  },
  {
    id: "system-baseline",
    displayName: "Drift Baseline",
    description: "Service that returns system baselines",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/system-baseline/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [
      apiLabelsMap["ansible"],
      apiLabelsMap["rhel"],
      apiLabelsMap["observe"],
      apiLabelsMap["openshift"],
    ],
  },
  {
    id: "historical-system-profiles",
    displayName: "Drift Historical Systems Profile Service ",
    description: "Service that returns system baselines",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/historical-system-profiles/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [
      apiLabelsMap["ansible"],
      apiLabelsMap["rhel"],
      apiLabelsMap["observe"],
      apiLabelsMap["openshift"],
    ],
  },
  {
    id: "image-builder",
    displayName: "Image Builder",
    description: "Service that relays image build requests",
    icon: "InsightsIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/image-builder/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["deploy"]],
  },
  {
    id: "integrations",
    displayName: "Integrations",
    description: "The API for Integrations",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/integrations/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["integrations-and-notifications"]],
  },
  {
    id: "inventory",
    displayName: "Managed Inventory",
    description:
      "REST interface for the Insights Platform Host Inventory application",
    icon: "InsightsIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/inventory/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [
      apiLabelsMap["inventories"],
      apiLabelsMap["rhel"],
      apiLabelsMap["insights"],
    ],
  },
  {
    id: "notifications",
    displayName: "Notifications",
    description: "The API for Notifications",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/notifications/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["integrations-and-notifications"]],
  },
  {
    id: "gathering",
    displayName: "Operator Gathering Conditions Service",
    description: "Gathering Conditions Services to Insights Operator",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/gathering/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["infrastructure"], apiLabelsMap["openshift"]],
  },
  {
    id: "insights-results-aggregator",
    displayName: "Results Aggregator",
    description:
      "Aggregation service for the results of running Insights rules",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/insights-results-aggregator/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["infrastructure"], apiLabelsMap["openshift"]],
  },
  {
    id: "patch",
    displayName: "Patch",
    description: "API of the Patch application on console.redhat.com",
    icon: "InsightsIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/patch/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [
      apiLabelsMap["security"],
      apiLabelsMap["rhel"],
      apiLabelsMap["observe"],
    ],
  },
  {
    id: "playbook-dispatcher",
    displayName: "Playbook Dispatcher",
    description:
      "Playbook Dispatcher is a service for running Ansible Playbooks on hosts connected via Cloud Connector",
    icon: "AnsibleIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/playbook-dispatcher/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["insights"], apiLabelsMap["rhel"]],
  },
  {
    id: "policies",
    displayName: "Policies",
    description: "The API for Policies",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/policies/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [
      apiLabelsMap["ansible"],
      apiLabelsMap["rhel"],
      apiLabelsMap["observe"],
    ],
  },
  {
    id: "remediations",
    displayName: "Remediations",
    description: "Insights Remediations Service",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/remediations/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [
      apiLabelsMap["automation"],
      apiLabelsMap["rhel"],
      apiLabelsMap["observe"],
      apiLabelsMap["security"],
      apiLabelsMap["ansible"],
    ],
  },
  {
    id: "ros",
    displayName: "Resource Optimization",
    description: "Flask Backend API for Resource Optimization Service",
    icon: "InsightsIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/ros/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["observe"], apiLabelsMap["rhel"]],
  },
  {
    id: "edge",
    displayName: "RHEL for Edge",
    description: "RHEL for Edge API",
    icon: "EdgeIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/edge/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["edge"], apiLabelsMap["rhel"]],
  },
  {
    id: "rbac",
    displayName: "Role-based Access Control",
    description: "The API for Role Based Access Control",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/rbac/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["identify-and-access-management"]],
  },
  {
    id: "sources",
    displayName: "Sources",
    description: "Sources API",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/sources/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["identify-and-access-management"]],
  },
  {
    id: "rhsm-subscriptions",
    displayName: "Subscriptions",
    description:
      "REST interface for the rhsm-subscriptions service. Please note any deprecated APIs. Our current deprecation policy is to keep deprecated APIs around for at least 6 months",
    icon: "SubscriptionsIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/rhsm-subscriptions/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [
      apiLabelsMap["inventories"],
      apiLabelsMap["openshift"],
      apiLabelsMap["edge"],
      apiLabelsMap["rhel"],
    ],
  },
  {
    id: "vulnerability",
    displayName: "Vulnerability Management",
    description: "Vulnerability API",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/vulnerability/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [
      apiLabelsMap["observe"],
      apiLabelsMap["openshift"],
      apiLabelsMap["security"],
      apiLabelsMap["rhel"],
    ],
  },
  {
    id: "accounts-management-service",
    displayName: "Account Management Service",
    description: "Manage user subscriptions and clusters",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/openshift/accounts-management-service/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["openshift"], apiLabelsMap["infrastructure"]],
  },
  {
    id: "authorization-service",
    displayName: "Authorization Service",
    description: "Enables access control on resources of OCM services",
    icon: "OpenShiftIcon",
    getApi: () =>
      import(
        "./apis/openshift/authorization-service/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["openshift"], apiLabelsMap["infrastructure"]],
  },
  {
    id: "connector-management",
    displayName: "Connector Management",
    description: "Connector Management API is a REST API to manage connectors.",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/openshift/connector-management/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["openshift"], apiLabelsMap["infrastructure"]],
  },
  {
    id: "kafka-service-fleet-manager-service",
    displayName: "Kafka Service Fleet Manager Service",
    description: "Kafka Management API is a REST API to manage Kafka instances",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/openshift/kafka-service-fleet-manager-service/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["openshift"], apiLabelsMap["infrastructure"]],
  },
  {
    id: "rhacs-service-fleet-manager",
    displayName: "RHACS Service Fleet Manager",
    description:
      "Red Hat Advanced Cluster Security (RHACS) Service Fleet Manager is a Rest API to manage instances of ACS components.",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/openshift/rhacs-service-fleet-manager/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["openshift"], apiLabelsMap["infrastructure"]],
  },
  {
    id: "service-logs",
    displayName: "Service Logs",
    description:
      "Receives and maintains logs from internal sources related to OpenShift clusters.",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/openshift/service-logs/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["openshift"], apiLabelsMap["infrastructure"]],
  },
  {
    id: "service-registry-management",
    displayName: "Service Registry Management",
    description:
      "Service Registry Management API is a REST API for managing Service Registry instances. Service Registry is a datastore for event schemas and API designs, which is based on the open source Apicurio Registry project",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/openshift/service-registry-management/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["openshift"], apiLabelsMap["infrastructure"]],
  },
  {
    id: "upgrades-information-service",
    displayName: "Upgrades Information Service",
    description: "Upgrades Information Service API",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/openshift/upgrades-information-service/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["openshift"], apiLabelsMap["infrastructure"]],
  },
  {
    id: "web-rca-service",
    displayName: "Web-RCA Service",
    description: "Web-RCA Service API",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/openshift/web-rca-service/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["openshift"], apiLabelsMap["infrastructure"]],
  },
];
