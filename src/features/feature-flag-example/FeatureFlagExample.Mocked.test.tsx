import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { FeatureFlagExample } from "./FeatureFlagExample";

vi.mock("@devcycle/react-client-sdk", async (importOriginal) => {
  const actual =
    (await importOriginal()) as typeof import("@devcycle/react-client-sdk");

  return {
    ...actual,
    RenderIfEnabled: ({ children }: { children: ReactNode }) => (
      <div>{children}</div>
    ),
    useVariableValue: () => true,
  };
});

describe("FeatureFlagExample.Mocked", () => {
  it("renders all feature flag content when the DevCycle utils are mocked in a truthy state", async () => {
    render(<FeatureFlagExample />);

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
