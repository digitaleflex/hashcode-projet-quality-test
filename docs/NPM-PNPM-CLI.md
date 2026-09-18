# npm / pnpm / CLI Distribution

## Package

- Name: `hashcode-quality`
- Current repository version: `2.0.0`
- Runtime: Node.js `>=20`
- CLI binary: `hashcode-quality`
- Module export: `./src/index.mjs`
- License: MIT

## Zero-install usage

```bash
npx hashcode-quality init
npx hashcode-quality doctor
npx hashcode-quality audit
npx hashcode-quality check --profile standard
```

With pnpm:

```bash
pnpm dlx hashcode-quality init
pnpm dlx hashcode-quality doctor
pnpm dlx hashcode-quality audit
pnpm dlx hashcode-quality check --profile standard
```

## Local installation

```bash
npm install --save-dev hashcode-quality
```

```bash
pnpm add -D hashcode-quality
```

Then use:

```bash
npx hashcode-quality audit
```

## CLI contract

### `init`

Creates a starter `quality.yaml` if one does not already exist. It does not overwrite an existing configuration.

### `doctor`

Reports the detected stack and the availability of relevant command-line tools.

### `audit`

Maps the detected stack to recommended quality controls. Recommendations are advisory; the command does not claim that a tool was executed.

### `check`

Runs quality scripts exposed by the target project's `package.json` when they exist. Profiles currently define the intended depth of checking; unavailable scripts are not silently reported as successful.

Supported profiles:

- `minimal`
- `standard`
- `production`
- `ai`

### `prompt`

Prints a bundled quality-engineering prompt for use with an AI coding agent.

### `--json`

Supported commands can return machine-readable JSON for CI or automation.

## Package design rule

HashCode Quality is a coordinator and quality-engineering layer, not a bundle containing the entire JavaScript/Python/security ecosystem. External tools are selected according to stack and risk.

This keeps installation smaller, avoids redundant dependencies and lets projects retain control over their own tool versions.

## Release checklist

Before publishing a version:

```bash
npm pkg get name version bin exports files engines license
node --check src/index.mjs
node --check src/cli.mjs
npm pack --dry-run
```

Test the generated tarball in a clean directory before publication.

For npm publication, the version must not already exist for the same package name. Published name/version combinations are immutable in the registry.

The repository includes `.github/workflows/publish-npm.yml`, which publishes on a `vX.Y.Z` tag after verifying that the Git tag matches `package.json`. The workflow uses npm provenance and public access.

## First release procedure

1. Verify the package name on npm.
2. Verify the maintainer's npm account and publishing permissions.
3. Configure npm trusted publishing for this GitHub repository/workflow as required by npm.
4. Ensure `package.json` version matches the intended release tag.
5. Run the package checks locally.
6. Create and push the tag:

```bash
git tag v2.0.0
git push origin v2.0.0
```

7. Wait for the GitHub Actions publication workflow.
8. Verify installation from the public registry:

```bash
npx hashcode-quality --help
pnpm dlx hashcode-quality audit
```

9. Verify the npm package metadata and provenance information.

## What is deliberately not claimed

A repository commit that prepares a package for npm does not mean the package has been published. Publication is complete only after the registry contains the package and an external install succeeds.
