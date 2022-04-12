import React, {useReducer, useEffect} from "react";
import {WebexActivityStream} from '@webex/components';

import { Panel } from "./Panel";

function useForceRender(interval) {
  const render = useReducer(() => ({}))[1];
  useEffect(() => {
    const id = setInterval(render, interval);
    return () => clearInterval(id);
  }, [interval]);
}

export const ActivityStreamPanel = ({ title = "Test Panel", roomID, activities = [] }) => {
  //useForceRender(2000);
  return (
    <WebexActivityStream
      roomID={roomID}
      style={{ height: 500 }}
    />
  );
};
