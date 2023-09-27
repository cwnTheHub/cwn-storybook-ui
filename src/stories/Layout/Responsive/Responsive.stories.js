import React, { useState } from "react";
import Responsive from "../../../core/core-responsive";
import Text from "../../../core/core-text/Text";

export default {
  title: "Core components/Layout /Responsive",
  component: Responsive,
};

export const ComponentUsage = (args) => {
  return (
    <div>
      <Responsive
        minWidth="sm"
        maxWidth="md"
        render={() => <Text>The document is at small.</Text>}
      />
      <Responsive
        minWidth="md"
        render={() => <Text>The document is at medium or above.</Text>}
      />
    </div>
  );
};

export const FunctionUsage = (args) => {
  return (
    <Responsive minWidth="md">
      {(matches) =>
        matches ? (
          <Text>The document is at medium or above.</Text>
        ) : (
          <Text>The document is less than medium.</Text>
        )
      }
    </Responsive>
  );
};

export const RenderWithBreakpoint = () => {
  const [initialState, setInitialState] = useState({
    device: "desktop",
  });

  return (
    <div>
      <Responsive
        maxWidth="md"
        defaultMatches={initialState.device === "mobile"}
        render={() => <Text>Render me below medium breakpoint.</Text>}
      />

      <Responsive
        minWidth="md"
        defaultMatches={initialState.device === "desktop"}
        render={() => <Text>Render me above medium breakpoint.</Text>}
      />
    </div>
  );
};
