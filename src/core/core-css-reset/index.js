import { createGlobalStyle } from "styled-components";

import reset from "./reset";
import fontFaces from "./fontFaces";
import globals from "./globals";

import { flexMain } from "./globalStyledComponents";

const Reset = createGlobalStyle(reset, fontFaces, globals);
export const GlobalFlexMain = createGlobalStyle(flexMain);

export { default as fonts } from "./fonts";
export default Reset;
