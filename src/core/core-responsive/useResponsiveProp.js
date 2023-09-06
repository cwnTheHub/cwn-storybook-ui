import { useEffect, useRef, useState } from "react";
import { useViewport } from "./useViewport";
import viewports from "./viewports";

export const hasOwnProperty = (object, key) => {
  return Object.prototype.hasOwnProperty.call(object, key);
};

const hasResponsiveProperties = (objectProp) =>
  viewports.keys.some((key) => hasOwnProperty(objectProp, key));

export const resolveResponsiveProp = (prop, viewport, defaultValue) => {
  if (prop === undefined) return defaultValue;
  if (!prop || typeof prop !== "object" || !hasResponsiveProperties(prop))
    return prop;
  let newViewport = null;
  if (typeof viewport === "number") {
    if (
      Number(viewports.values[0]) < Number(viewport) &&
      Number(viewports.values[1]) > Number(viewport)
    ) {
      newViewport = "sm";
    } else if (
      Number(viewports.values[1]) < Number(viewport) &&
      Number(viewports.values[2]) > Number(viewport)
    ) {
      newViewport = "md";
    } else if (
      Number(viewports.values[2]) < Number(viewport) &&
      Number(viewports.values[3]) > Number(viewport)
    ) {
      newViewport = "lg";
    } else if (Number(viewports.values[3]) < Number(viewport)) {
      newViewport = "xl";
    }
  } else {
    newViewport == viewport;
  }

  const value = viewports.keys.includes(newViewport)
    ? // If there's a current newViewport, return the closest match at or below it
      viewports.inherit(prop)[newViewport]
    : // If no current viewport is available, default to smallest viewport
      prop[viewports.keys.find((key) => hasOwnProperty(prop, key))];

  return value === undefined ? defaultValue : value;
};

const useResponsiveProp = (prop, defaultValue) => {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const viewport = windowSize[0] || useViewport();

  return resolveResponsiveProp(prop, viewport, defaultValue);
};

export default useResponsiveProp;
