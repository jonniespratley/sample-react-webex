import React, { useEffect, useState, useRef } from "react";
import Webex from "webex";
import WebexSDKAdapter from "@webex/sdk-component-adapter";
import {
  WebexDataProvider,
  WebexMessaging,
  WebexActivityStream,
} from "@webex/components";

import {
  VirtualActivityStream,
  TestActivityPanel,
  Panel,
  SpaceList,
  ActivityStreamPanel,
} from "./components";

import "./App.css";

if (window.webexSDKAdapterSetLogLevel) {
  // window.webexSDKAdapterSetLogLevel("debug");
}


const AppSandbox = () => {
  const adapter = useRef();
  const [adapterConnected, setAdapterConnected] = useState(false);
  const [adapterConnecting, setAdapterConnecting] = useState(false);
  const [accessToken, setAccessToken] = useState(
    `${process.env.WEBEX_ACCESS_TOKEN}`
  );

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


  const [roomID, setRoomID] = useState();
  const [room, setRoom] = useState(null);
  const handleClick = (room) => {
    console.log("setRoom", room);
    window.roomID = room.ID;
    setRoom(room);
    setRoomID(room.ID);
  };

  const clearRoom = () => {
    setRoom(null);
  };


  const [text, setText] = useState("");
  const handleCreateMessage = (e) => {
    e.preventDefault();
    adapter.current.datasource.messages
      .create({ text, roomId: room.ID })
      .then(() => {
        setText("");
      });
    return false;
  };

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

      {!adapterConnected && <WebexMessaging />}


      {adapterConnected && (
        <WebexDataProvider adapter={adapter.current}>
          <div className="App-layout">
            <div className="App-sidebar">
              <fieldset>
                <legend>Settings</legend>
                <button onClick={clearRoom}>Clear Room</button>
              </fieldset>
              <SpaceList
                selectedRoom={room}
                adapter={adapter.current}
                onClick={handleClick}
              />
            </div>

            <div className="App-content">
              {room && (
                <Panel title={room.title}>
                 <ActivityStreamPanel roomID={roomID} />

                  <form onSubmit={handleCreateMessage}>
                    <fieldset className="flex">
                      <input
                        type="text"
                        placeholder="Write a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                      />
                      <button type="submit" disabled={text === ""}>
                        Send
                      </button>
                    </fieldset>
                  </form>
                </Panel>
              )}
            </div>
          </div>
        </WebexDataProvider>
      )}
    </div>
  );
};

export default AppSandbox;
