1. Scaffold (Angular 15)

```bash
# Use Angular CLI v15
npx -p @angular/cli@15 ng new resume-ng --routing --style=scss --strict

cd resume-ng
```

Why these flags

- `@angular/cli@15`: locks us to Angular 15 (you asked to stay pre‑signals).
- `--routing`: creates a router setup from day 1 so we can demo lazy loading, guards, etc.
- `--style=scss`: SCSS is friendlier for variables & mixins when we scale examples.
- `--strict`: enables strict TS and strict template checks. Concretely:
  - `tsconfig.json` gets `strict: true`, plus `noImplicitAny`, `strictNullChecks`, etc.
  - `angularCompilerOptions.strictTemplates: true` → the template type checker will catch unsafe bindings early. This is vital when we write custom directives/pipes and advanced forms.

This gives us strict TypeScript, Jasmine/Karma tests wired, and routing.

2. Add code‑quality & helper tooling

```bash
# ESLint for Angular 15
ng add @angular-eslint/schematics@15

# (Optional) Git hooks to keep things neat
npm i -D husky lint-staged
npx husky install
```

What this does

- `@angular-eslint` replaces old TSLint rules with ESLint tailored for Angular v15 projects (templates + TS). It scaffolds an `.eslintrc.json` with sensible Angular rules (e.g., selector conventions, lifecycle hook ordering, etc.).
- Prettier enforces format consistency. The sort‑imports plugin keeps imports deterministic, reducing noisy diffs.

- `OnPush` change detection: we’ll use this to demo performance and correctness later. OnPush re-checks when:
  - an `@Input()` reference changes,
  - an event fires in the component,
  - an `async` pipe emits, or
  - you call `markForCheck()` manually.
    This sets us up to discuss immutable patterns and RxJS streams the right way.

- Click spam? `exhaustMap`
- Route/search that changes often? `switchMap`
- Must keep order (writes)? `concatMap`
- Need parallelism? `mergeMap`
