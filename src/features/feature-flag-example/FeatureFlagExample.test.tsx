import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { ReactNode } from "react";
import { DevCycleMockProvider } from "../devcycle-mock-provider/DevCycleMockProvider";
import { FeatureFlagExample } from "./FeatureFlagExample";

const Providers = ({ children }: { children: ReactNode }) => (
  <DevCycleMockProvider>{children}</DevCycleMockProvider>
);

const handlers = [
  http.get("https://sdk-api.devcycle.com/*", () =>
    HttpResponse.json({
      variables: {
        "feature-flag-01": {
          key: "feature-flag-01",
          type: "Boolean",
          value: false,
        },

        "feature-flag-02": {
          key: "feature-flag-02",
          type: "Boolean",
          value: false,
        },

        "feature-flag-03": {
          key: "feature-flag-03",
          type: "Boolean",
          value: false,
        },
      },
    })
  ),
  http.post(
    "https://events.devcycle.com/*",
    () => new Response(JSON.stringify({}), { status: 201 })
  ),
];

const server = setupServer(...handlers);

describe("FeatureFlagExample", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('renders the hook disabled based feature check when the "feature-flag-01" is set to false', async () => {
    render(
      <Providers>
        <FeatureFlagExample />
      </Providers>
    );

    await screen.findByRole("heading", {
      level: 1,
      name: /feature flag examples/i,
    });

    expect(screen.getByText(/flag disabled/i)).toBeVisible();
    expect(screen.queryByText(/flag enabled/i)).not.toBeInTheDocument();
  });

  it('renders the hook enabled based feature check when the "feature-flag-01" is set to true', async () => {
    server.use(
      http.get("https://sdk-api.devcycle.com/*", () =>
        HttpResponse.json({
          variables: {
            "feature-flag-01": {
              key: "feature-flag-01",
              type: "Boolean",
              value: true,
            },
          },
        })
      )
    );

    render(
      <Providers>
        <FeatureFlagExample />
      </Providers>
    );

    // Because of the way the DevCycleProvider needs to initalise, it seems to not re-render
    await screen.findByRole("heading", {
      level: 1,
      name: /feature flag examples/i,
    });

    expect(screen.queryByText(/flag disabled/i)).not.toBeInTheDocument();
    expect(screen.getByText(/flag enabled/i)).toBeVisible();
  });

  it('renders the content of RenderIfEnabled  "feature-flag-02" component if the feature flag value is true', async () => {
    server.use(
      http.get("https://sdk-api.devcycle.com/*", () =>
        HttpResponse.json({
          variables: {
            "feature-flag-02": {
              key: "feature-flag-02",
              type: "Boolean",
              value: true,
            },
          },
        })
      )
    );

    render(
      <Providers>
        <FeatureFlagExample />
      </Providers>
    );

    // Because of the way the DevCycleProvider needs to initalise, it seems to not re-render
    await screen.findByRole("heading", {
      level: 1,
      name: /feature flag examples/i,
    });

    expect(
      await screen.findByRole("button", { name: /Feature flag #02/i })
    ).toBeVisible();
  });

  it('DOES NOT render the content of RenderIfEnabled  "feature-flag-02" component if the feature flag value is false', async () => {
    render(
      <Providers>
        <FeatureFlagExample />
      </Providers>
    );

    // Because of the way the DevCycleProvider needs to initalise, it seems to not re-render
    await screen.findByRole("heading", {
      level: 1,
      name: /feature flag examples/i,
    });

    expect(
      screen.queryByRole("button", { name: /Feature flag #02/i })
    ).not.toBeInTheDocument();
  });

  it('renders the content of RenderIfEnabled  "feature-flag-03" component if the feature flag value is true', async () => {
    server.use(
      http.get("https://sdk-api.devcycle.com/*", () =>
        HttpResponse.json({
          variables: {
            "feature-flag-03": {
              key: "feature-flag-03",
              type: "Boolean",
              value: true,
            },
          },
        })
      )
    );

    render(
      <Providers>
        <FeatureFlagExample />
      </Providers>
    );

    // Because of the way the DevCycleProvider needs to initalise, it seems to not re-render
    await screen.findByRole("heading", {
      level: 1,
      name: /feature flag examples/i,
    });

    expect(
      await screen.findByRole("button", { name: /Feature flag #03/i })
    ).toBeVisible();
  });

  it('DOES NOT render the content of RenderIfEnabled  "feature-flag-03" component if the feature flag value is false', async () => {
    render(
      <Providers>
        <FeatureFlagExample />
      </Providers>
    );

    // Because of the way the DevCycleProvider needs to initalise, it seems to not re-render
    await screen.findByRole("heading", {
      level: 1,
      name: /feature flag examples/i,
    });

    expect(
      screen.queryByRole("button", { name: /Feature flag #03/i })
    ).not.toBeInTheDocument();
  });

  it("renders the content of multiple enabled feature flags at the same time", async () => {
    server.use(
      http.get("https://sdk-api.devcycle.com/*", () =>
        HttpResponse.json({
          variables: {
            "feature-flag-01": {
              key: "feature-flag-01",
              type: "Boolean",
              value: true,
            },
            "feature-flag-02": {
              key: "feature-flag-02",
              type: "Boolean",
              value: true,
            },
            "feature-flag-03": {
              key: "feature-flag-03",
              type: "Boolean",
              value: true,
            },
          },
        })
      )
    );

    render(
      <Providers>
        <FeatureFlagExample />
      </Providers>
    );

    // Because of the way the DevCycleProvider needs to initalise, it seems to not re-render
    await screen.findByRole("heading", {
      level: 1,
      name: /feature flag examples/i,
    });

    expect(await screen.findByText(/flag enabled/i)).toBeVisible();
    expect(screen.queryByText(/flag disabled/i)).not.toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Feature flag #02/i })
    ).toBeVisible();
    expect(
      screen.getByRole("button", { name: /Feature flag #03/i })
    ).toBeVisible();
  });
});
