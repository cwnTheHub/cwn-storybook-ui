import React from "react";
import SVGIcon from "../SVGIcon";

const Tv = (props) => (
  <SVGIcon {...props}>
    <svg width="24" height="20" viewBox="0 0 24 20">
      <path
        fillRule="evenodd"
        transform="translate(0 -2)"
        d="M22.5,2 L1.5,2 C0.673,2 0,2.673 0,3.5 L0,17.5 C0,18.327 0.673,19 1.5,19 L10,19 L10,20.077 L4.418,21.007 C4.146,21.052 3.962,21.31 4.007,21.582 C4.048,21.827 4.26,22 4.5,22 C4.527,22 4.554,21.998 4.582,21.993 L10.54,21 L13.459,21 L19.417,21.993 C19.445,21.998 19.473,22 19.5,22 C19.741,22 19.953,21.827 19.992,21.582 C20.038,21.31 19.853,21.052 19.581,21.007 L14,20.077 L14,19 L22.5,19 C23.327,19 24,18.327 24,17.5 L24,3.5 C24,2.673 23.327,2 22.5,2 Z M13,20 L11,20 L11,19 L13,19 L13,20 Z M23,17.5 C23,17.776 22.776,18 22.5,18 L1.5,18 C1.224,18 1,17.776 1,17.5 L1,3.5 C1,3.224 1.224,3 1.5,3 L22.5,3 C22.776,3 23,3.224 23,3.5 L23,17.5 Z"
      />
    </svg>
  </SVGIcon>
);

Tv.displayName = "DecorativeIcon";

export default Tv;
