# api-documentation-frontend
Front-end repo for the API documentation site

## Releasing to Production

We use GitLab tags for deployment to Production. Follow these steps:

1. **Ensure code is ready:** Merge all changes for the release into `main` and ensure they are tested.

2. **Create a GitLab Release:** Go to "Releases" in [GitLab](https://gitlab.cee.redhat.com/insights-platform/api-documentation-frontend/-/releases), click "Create a new release". Add a versioned tag name (e.g., `v1.0.0`), a title, and any notes about the release.

3. **Trigger the deployment:** Creating the release generates a tag that triggers the production deployment pipeline. Our `.gitlab-ci.yml` includes:

   ```yaml
   rules:
     - if: $CI_COMMIT_TAG =~ /^v\d+/
       when: always
   ```
   
   This means the `deploy_prod` job executes when a tag like `v1.0.0` is added.

4. **Watch the pipeline:** Monitor the pipeline in GitLab's CI/CD > Pipelines section. If successful, your code is deployed to production.
