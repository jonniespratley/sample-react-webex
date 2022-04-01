import React from "react";
import { Panel } from "./Panel";

export const TestPanel = ({ title = "Test Panel", roomID, activities }) => {
  
  return (
    <Panel>
      <h2>{title}</h2>
      <p>
        The following data is the result from the <code>useActivityStream</code>{" "}
        hook.
      </p>
      <pre>{JSON.stringify(activities, null, 2)}</pre>
    </Panel>
  );
};
