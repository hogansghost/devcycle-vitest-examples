import { RenderIfEnabled, useVariableValue } from "@devcycle/react-client-sdk";

export const FeatureFlagExample = () => {
  const isFeatureFlag01Enabled = useVariableValue("feature-flag-01", false);

  return (
    <div>
      <header>
        <h1>Feature flag examples</h1>
      </header>

      <div>
        <a
          href="https://github.com/DevCycleHQ-Labs/example-react-typescript/blob/main/src/components/Description.test.tsx"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mocking the "useVariableValue" hook example from DevCycle codebase
        </a>

        <p>{isFeatureFlag01Enabled ? "Flag enabled" : "Flag disabled"}</p>

        <RenderIfEnabled variableKey="feature-flag-02">
          <button type="button">Feature flag #02</button>
        </RenderIfEnabled>

        <RenderIfEnabled variableKey="feature-flag-03">
          <button type="button">Feature flag #03</button>
        </RenderIfEnabled>
      </div>
    </div>
  );
};
