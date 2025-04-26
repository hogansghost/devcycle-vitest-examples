import {
  DevCycleProvider,
  useIsDevCycleInitialized,
} from "@devcycle/react-client-sdk";
import { ReactNode } from "react";

/**
 * We await this with the children | null rendering as there seems to be an issue with the tests rendering
 * the components before the provider is initialised, meaning that we do not get the expected output.
 * This is, to say the least, not ideal and seeingly, trying to just await for elements does not work.
 * Initial speculation is that it does not trigger a rerender when the provider initialises so the tests
 * won't update and show the expected content based on the mock network requests.
 */
const RenderIfDevCycleInitialised = ({ children }: { children: ReactNode }) => {
  const isDevCycleInitialized = useIsDevCycleInitialized();

  // We render null so we can await in the test when content exists (thus the devCycle provider is initialised);
  return isDevCycleInitialized ? children : null;
};

export const DevCycleMockProvider = ({ children }: { children: ReactNode }) => (
  <DevCycleProvider
    config={{
      // Add your key to the .env file or just hardcode it here to test.
      sdkKey: import.meta.env.VITE_DEV_CYCLE_KEY,
      options: {
        deferInitialization: false,
      },
    }}
  >
    <RenderIfDevCycleInitialised>{children}</RenderIfDevCycleInitialised>
  </DevCycleProvider>
);
