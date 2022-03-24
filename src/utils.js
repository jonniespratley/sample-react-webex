import {constructHydraId} from '@webex/common';

export function fromSDKRoom(sdkConvo) {
    return {
      _id: sdkConvo.id,
      ID: constructHydraId("room", sdkConvo.id),
      type: sdkConvo.objectType,
      title: sdkConvo.displayName,
      created: sdkConvo.published,
      lastActivity: sdkConvo.lastReadableActivityDate,
      lastSeenActivityDate: sdkConvo.lastSeenActivityDate,
    };
  }
  