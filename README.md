# Turborepo Starter

This is an official starter Turborepo.

## Using this Example

To get started, run the following command:

```sh
npx create-turbo@latest
```

## What's Inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Build

To build all apps and packages, run the following command:

```sh
cd my-turborepo
yarn build
```

## Develop

To develop all apps and packages, run the following command:

```sh
cd my-turborepo
yarn dev
```

## Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```sh
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```sh
npx turbo link
```

## Additional Resources

For more information on how to use Turborepo, check out these resources:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

## Using Turborepo with Vite and Shadcn UI

For an in-depth guide on integrating Vite and Shadcn UI with Turborepo, you can refer to this article: [React + Vite with Shadcn UI for UI Components all in Turborepo](https://articles.wesionary.team/react-vite-with-shadcn-ui-for-ui-components-all-in-turborepo-8af3deafa58e).

This guide provides a comprehensive example of setting up a Turborepo with these technologies, ensuring a smooth development experience and optimal performance.

---

This README provides an overview of setting up and using Turborepo with Yarn, ensuring that you can get started quickly and take full advantage of Turborepo's powerful features for monorepo management. For detailed instructions and further customization, refer to the official documentation and resources linked above.
