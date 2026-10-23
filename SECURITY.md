# Security policy

- Dependency updates are reviewed through the GitHub Actions CI workflow.
- The CI workflow runs `npm audit --audit-level=high` and fails on High/Critical advisories.
- Do not suppress or ignore advisories merely to make the workflow pass. Update to a patched compatible release or document the remaining risk before release.
- The contact form in this prototype does not send or store submissions.
