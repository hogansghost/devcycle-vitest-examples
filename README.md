# DevCycle React Vitest RTL testing examples

A series of examples making use of React Testing Library, Vite, Vitest, JSDOM and Mock Service Worker to demonstrate how you can unit test the DevCycle feature flags with and without needing to mock the entire providers, hooks, etc.

Primarily, we mock the network requests to ensure we can test both the on and off states (or multiple different matching states for feature flags with custom values) meaning we can test within the same test each permutation.

One caveat is the seeming need to have the RenderIfDevCycleInitialised function (see codebase) that will trigger a re-render in the test once the provider is initialised so we can test as expected whether an element exists or not, otherwise the test does not seem to update beyond the default value of said feature flag (even with awaiting of elements either being removed or being visible, etc.)

## Technologies

- [DevCycle](https://www.devcycle.com/).
- [Vite](https://vite.dev/).
- [Vitest](https://vitest.dev/).
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).
- [Mock Service Worker](https://mswjs.io/).
