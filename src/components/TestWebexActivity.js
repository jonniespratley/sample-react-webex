import React, {useContext, useEffect, useState} from 'react';
import {AdapterContext} from '@webex/components';
import { Panel } from './Panel';
import { useObservable } from '../hooks';
export const TestWebexActivity = ({ 
  title = "WebexActivityVirtualStream", 
  roomID 
}) => {

  let {activityAdapter} = useContext(AdapterContext);
  console.log('activityAdapter', activityAdapter);

    
    return (
      <Panel title={title}> 
        
        <p>This is the act</p>
      
      </Panel>
    );
  };  