import { useEffect } from 'react';

let listenerCallbacks = new WeakMap();

let defaultObserver;

function handleIntersections(entries, observer) {
  entries.forEach(entry => {
    if (listenerCallbacks.has(entry.target)) {
      let cb = listenerCallbacks.get(entry.target);

      if (entry.isIntersecting) cb(true);
      else if (entry.intersectionRatio > 0) cb(false);
    }
  });
}

function getIntersectionObserver() {
  if (defaultObserver === undefined) {
      defaultObserver = new IntersectionObserver(handleIntersections, {
        rootMargin: '0px',
        threshold: '0.7',
      });
  }
  return defaultObserver;
}

export function useIntersection(elem, callback) {
  useEffect(() => {
    let target = elem.current;
    let observer = getIntersectionObserver();
    listenerCallbacks.set(target, callback);
    observer.observe(target);

    return () => {
      listenerCallbacks.delete(target);
      observer.unobserve(target);
    };
  }, []);
}