import { WebexActivityStream } from '@webex/components';
import React,  { useEffect } from 'react';

export const VirtualActivityStream = ({room}) => {
    useEffect(() => {
        console.log('use Effect', room);
    }, [room])
    return (
        <div>
          
            {room && <WebexActivityStream
                    roomID={room.ID}
                    style={{ height: 600 }}
                  />}
        </div>
    )
}