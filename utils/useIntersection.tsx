import { useEffect } from "react";

let listenerCallbacks = new WeakMap();

let observer;

function handleIntersections(entries) {
  entries.forEach((entry) => {
    if (listenerCallbacks.has(entry.target)) {
      let cb = listenerCallbacks.get(entry.target);

      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        if (entry.target.loop === false) {
          observer.unobserve(entry.target);
          listenerCallbacks.delete(entry.target);
        }
        cb();
      }
    }
  });
}

function getIntersectionObserver() {
  if (observer === undefined) {
    observer = new IntersectionObserver(handleIntersections, {
      rootMargin: "100px",
      threshold: 0,
    });
  }
  return observer;
}

export function useIntersection(elem, callback, loop: boolean = false) {
  useEffect(() => {
    let target = elem.current;
    target.loop = loop;
    let observer = getIntersectionObserver();
    listenerCallbacks.set(target, callback);
    observer.observe(target);

    return () => {
      listenerCallbacks.delete(target);
      observer.unobserve(target);
    };
  }, []);
}
