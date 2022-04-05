import React, {useState, useEffect, useCallback, memo} from "react";

import { useWhyDidYouUpdate } from "../hooks";


import { fromSDKRoom } from "../utils";

export function SpaceList(props) {
  const { adapter, onClick, selectedRoom } = props;

   useWhyDidYouUpdate("SpaceList", props);
   const [rooms, setRooms] = useState([]);

   const loadRooms = (e) => {
     return adapter.datasource.internal.conversation
       .list()
       .then((convos) => {
         const data = convos
           .filter((c) => c.displayName !== undefined)
           .map((c) => fromSDKRoom(c));
 
         console.table(data);
 
         setRooms(data);
       });
   };


   useEffect(() => {
    console.log('Adapter changed', adapter)
    if(rooms.length === 0){
        loadRooms();
    }
   }, [adapter])

   const handleClick = useCallback((room) => {
       if(onClick){
        onClick(room)
       }
   })

  return (
    <ul className="space-list">
      {rooms && rooms.map(room => (
          <li className={`space-list-item ${selectedRoom && selectedRoom.ID === room.ID ? 'selected': '' }`} key={room.ID} 
          onClick={() => {
              handleClick(room);
          }}>
              {room.title}
              </li>
      ))}
    </ul>
  );
}
