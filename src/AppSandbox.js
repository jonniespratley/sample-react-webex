import React, { useEffect, useState } from "react";

import { TestWebexActivity, TestActivityPanel, Panel } from "./components";
import './App.css';

const AppSandbox = () => {
  return (
    <div className="App">
      <div className="App-header">
        <div className="flex">
            <h2>Sample Webex App</h2>
        </div>
      </div>
      <div className="App-layout">
        <div className="App-sidebar">
          <Panel>Test</Panel>
        </div>
        <div className="App-content">
          <Panel>Test</Panel>
        </div>
      </div>
    </div>
  );
};

export default AppSandbox;
