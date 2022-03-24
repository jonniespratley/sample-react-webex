import React, { useEffect, useState, useRef } from "react";
import Webex from "webex";
import WebexSDKAdapter from "@webex/sdk-component-adapter";
import { WebexDataProvider } from "@webex/components";

import {
  TestWebexActivity,
  TestActivityPanel,
  Panel,
  SpaceList,
} from "./components";
import "./App.css";

if (window.webexSDKAdapterSetLogLevel) {
  window.webexSDKAdapterSetLogLevel("debug");
}

const AppSandbox = () => {
  const adapter = useRef();
  const [adapterConnected, setAdapterConnected] = useState(false);
  const [adapterConnecting, setAdapterConnecting] = useState(false);
  const [accessToken, setAccessToken] = useState(
    `${process.env.WEBEX_ACCESS_TOKEN}`
  );

  /**
   * Connection
   */

  const handleConnect = async () => {
    const webex = new Webex({
      credentials: accessToken,
    });
    adapter.current = new WebexSDKAdapter(webex);
    setAdapterConnecting(true);
    await adapter.current.connect();
    setAdapterConnected(true);
    setAdapterConnecting(false);
    window.webexSDKAdapter = adapter.current;
    console.log("window.webexSDKAdapter", window.webexSDKAdapter);
  };

  const handleDisconnect = async () => {
    console.log("Disconnecting....");
    setAdapterConnecting(false);
    await adapter.current.disconnect();
    setAdapterConnected(false);
  };

  const handleClick = (room) => {
      console.log('setRoom', room);
  }

  useEffect(() => {
    async function doConnect() {
      console.warn("doConnect");
      await handleConnect();
      //await loadRooms();
    }

    doConnect();

    return () => {
      handleDisconnect();
    };
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <div className="flex">
          <h2>Sample Webex App</h2>
        </div>
      </div>
      {adapterConnected && (
        <WebexDataProvider adapter={adapter.current}>
          <div className="App-layout">
            <div className="App-sidebar">
              <SpaceList adapter={adapter.current} onClick={handleClick}/>
            </div>
            <div className="App-content"></div>
          </div>
        </WebexDataProvider>
      )}
    </div>
  );
};

export default AppSandbox;
