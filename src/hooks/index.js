import {BehaviorSubject} from 'rxjs';
import { useState, useEffect, useRef } from "react";

export * from "./useWhyDidYouUpdate";
const useObservedValue = value => {
    const subject = useRef(new BehaviorSubject(value));
  
    useEffect(() => {
        subject.current.next(value);
    }, [value]);
  
    return React.useMemo(() => subject.current.asObservable(), [subject]);
  };
   
export const useObservable = (observable, initialState, onNext, onError, onComplete) => {
  const [state, setState] = useState(initialState);
    console.log('useObservable', state);
  useEffect(() => {
    const subscription = observable.subscribe(setState, onError, onComplete);
    return () => subscription.unsubscribe();
  }, [observable]);

  return state;
};
