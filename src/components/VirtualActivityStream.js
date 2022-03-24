import { WebexActivityStream } from '@webex/components';
import React from 'react';

export const VirtualActivityStream = ({room}) => {

    return (
        <div>
          
            {room && <WebexActivityStream
                    roomID={room.ID}
                    style={{ height: 600 }}
                  />}
        </div>
    )
}