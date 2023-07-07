# api-documentation-frontend
Front-end repo for the API documentation site

## Releasing to Production

We use GitLab tags for deployment to Production. Follow these steps:

1. **Ensure code is ready:** Merge all changes for the release into `main` and ensure they are tested.

2. **Create a GitLab Release:** Go to "Releases" in [GitLab](https://gitlab.cee.redhat.com/insights-platform/api-documentation-frontend/-/releases), click "Create a new release". Add a tag name using [Semantic Versioning](https://semver.org/) (e.g., `v1.0.0`). Give it a title, and write any notes about this release.

   When naming your release, follow **Semantic Versioning** rules:
   - **Major version (e.g., v1.0.0 to v2.0.0)**: You made big changes. Old features might not work.
   - **Minor version (e.g., v1.0.0 to v1.1.0)**: You added something new, but the old features still work.
   - **Patch version (e.g., v1.0.0 to v1.0.1)**: You fixed a small bug and didn't change or add anything else.

3. **Trigger the deployment:** Creating the release generates a tag that triggers the production deployment pipeline. Our `.gitlab-ci.yml` includes:

   ```yaml
   rules:
     - if: $CI_COMMIT_TAG =~ /^v\d+/
       when: always
   ```
   
   This means the `deploy_prod` job executes when a tag like `v1.0.0` is added.

4. **Watch the pipeline:** Monitor the pipeline in GitLab's CI/CD > Pipelines section. If successful, your code is deployed to production.
