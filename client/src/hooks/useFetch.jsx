import { useEffect, useState, useRef } from "react";

export const useFetch = url => {
  const isCurrent = useRef(true);
  const [state, setState] = useState({ data: null, loading: true });

  useEffect(() => {
    return () => {
      // called when the component is going to unmount
      isCurrent.current = false;
    };
  }, []);

  useEffect(() => {
    setState(state => ({ data: state.data, loading: true }));
    fetch(url)
      .then(x => x.text())
      .then(y => {
        setTimeout(() => {
          if (isCurrent.current) {
            setState({ data: y, loading: false });
          }
        }, 1000);
      });
  }, [url, setState]);

  return state;
};

export const useFech = url => {
  const [state, setState] = useState(null);

  fetch(url)
    .then(data => data.json())
    .then(data => setState(state => data));

  return state;
};
