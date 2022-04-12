import React, {useState, useContext} from "react";
import {WebexActivity, hooks, AdapterContext}  from '@webex/components'

import { Panel } from "./Panel";


export const TestActivityPanel = ({ title }) => {
  const [activityID, setActivityID] = useState(null)
  //const adapter = useContext(AdapterContext);
  const {activitiesAdapter} = useContext(AdapterContext);

  const person = {}; //usePerson(activity?.personID);
  const greet$ = activityID;
  console.warn('got hook', hooks);

  React.useEffect(() => {
    console.log('value shange', greet$);
  }, [greet$])

  return (
    <div>
      <h2>Test Activity Panel</h2>
      <p>
        The following data is the result from the <code>activityID</code> hook.
      </p>
      <input type="text" onBlur={(e) => setActivityID(e.target.value)} />
      <Panel>
        {activityID && <WebexActivity activityID={activityID} />}
      </Panel>
      
    </div>
  );
};

