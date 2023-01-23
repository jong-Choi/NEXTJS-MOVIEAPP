import { createGlobalStyle } from "styled-components";
import GlobalFontFamily from "./GlobalFontFamily";
import GlobalResetStyle from "./GlobalStyleReset";

const GlobalStyle = createGlobalStyle`
  ${GlobalResetStyle}
  ${GlobalFontFamily}
`;

export default GlobalStyle;
