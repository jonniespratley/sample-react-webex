let str = 'image/jpeg';

import { sdkActs } from './sdk-acts';

console.log(str.includes('image'), sdkActs);
console.log('video/mp4'.includes('video'));
const getPublishedDate = (activity = {}) =>
  new Date(activity.published).getTime();
// use accessors for ease of refactoring underlying implementation
/**
 * @param {Map} destination destination map object for data. Currently a Map, but could be refactored to use any type.
 * @param {string} key
 * @param {any} value
 * @returns {Map}
 */
const setValue = (destination, key, value) => destination.set(key, value);
const getValue = (source, key) => source.get(key);
const getParentId = (act) => act?.parent?.id;
const getActivityObjectsFromMap = (hashMap) =>
  Array.from(hashMap).map(([, activity]) => activity);
/**
/**
 * encapsulates state and logic for managing root activities
 * @returns {object} setters and getters for activity state management
 */
const ActivityManager = (room) => {
  let acts = room?.activities?.items || [];

  const rootActivityHash = new Map();

  let replys = {};
  let edits = {};
  let activities = {};
  let reactions = {};

  const addRoot = (rootAct) => {
    setValue(rootActivityHash, rootAct.id, rootAct);
  };

  const processReply = (act) => {
    replys[getParentId(act)] = replys[getParentId(act)] || [];
  };

  const addReply = (act) => {
    //Get the parent activity
    let parentAct = getValue(rootActivityHash, getParentId(act));
    let replyIDs = [...new Set([...(cache.get(a.parent.id) || []), act.id])];
    let newAct = { ...parentAct, replyIDs };
    setValue(rootActivityHash, parentAct.id, newAct);
  };

  const getRootActivityHash = () => rootActivityHash;
  const getRootActivities = () => Object.values(rootActivityHash);

  const processActivities = (acts) => {
    acts.forEach((o) => {
      if (o.parent?.type === 'reply') {
        replys[getParentId(o)] = o.id;
      } else if (o.parent?.type === 'edit') {
        edits[getParentId(o)] = o.id;
      } else if (o.object?.objectType === 'reaction2Summary') {
        reactions[getParentId(o)] = o.id;
      }
    });
  };

  processActivities(acts);

  return {
    addRoot,
    addReply,
    getRootActivities,
    getRootActivityHash,
    replys,
    activities,
  };
};

let mgr = ActivityManager();

console.log(mgr);

let map = new Map([
  ['1', 'first element'],
  [1, 'second element'],
  [true, 'hello world'],
]);
console.log(map);
console.log(map.get(1));

const service = 'conversation';
const parentId = 'db2a22d0-b040-11ec-86d3-a13ff124d441';
const resource = `conversations/bc2266b0-d6c3-11eb-aef5-6d77908bfcbb/parents/${parentId}`;
//webexSDKAdapter.datasource.request({ service, resource }).then(console.log);
