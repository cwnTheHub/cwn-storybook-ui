import { createContext, useContext } from "react";

export const ViewportContext = createContext({});

export const useViewport = () => useContext(ViewportContext);
