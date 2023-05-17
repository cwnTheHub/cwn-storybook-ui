import React from "react";
import SVGIcon from "../SVGIcon";

const Globe1 = (props) => (
  <SVGIcon {...props}>
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d="M21.032806,18.2709198 C21.277824,16.8575263 21.3602386,15.1618172 21.095,14.793 C20.944,14.584 20.193,14.444 19.696,14.353 C19.133,14.249 18.6,14.15 18.238,13.926 C18.03,13.798 17.854,13.583 17.67,13.355 C17.563,13.223 17.383,13.002 17.304,12.959 C17.083,12.869 16.52,12.94 16.063,12.996 C15.402,13.079 14.78,13.156 14.31,12.962 C13.41,12.588 10.421,10.799 11.039,9.309 C11.304,8.673 12.069,8.84 12.63,8.961 C12.832,9.005 13.172,9.082 13.279,9.056 C13.659,8.815 14.024,7.789 14.317,6.965 C14.561,6.278 14.792,5.629 15.095,5.209 C15.222,5.033 15.423,4.891 15.636,4.74 C15.716,4.684 15.827,4.605 15.913,4.536 C15.738,4.467 15.38,4.359 15.168,4.295 C14.797,4.184 14.446,4.078 14.207,3.906 C14.033,3.781 13.891,3.585 13.739,3.377 C13.681,3.299 13.602,3.189 13.531,3.105 C13.491,3.162 13.451,3.225 13.42,3.272 C13.21,3.596 12.949,4 12.5,4 C11.809,4 11.178,3.027 11.038,2.692 C10.8591398,2.26115438 10.9136621,1.61938567 10.9632238,1.04845976 C9.13059364,1.220601 7.42717917,1.84433157 5.96574004,2.80689176 C6.33871202,2.84952122 6.69885552,2.92150283 6.905,3.207 C7.277,3.724 7.165,4.527 7.056,5.305 C7,5.71 6.936,6.17 6.986,6.385 C7.09,6.824 7.578,7.754 7.905,8.208 C8.334,8.802 9.29,9.5 10.301,10.238 C12.12,11.564 14,12.937 14,14.5 C14,14.949 13.596,15.21 13.271,15.42 C13.198,15.467 13.088,15.538 13.018,15.593 C13.143,15.926 13.864,16.432 14.356,16.778 C15.059,17.271 15.724,17.736 15.961,18.309 C16.216,18.924 16.142,20.103 15.978,20.645 C15.8219289,21.1619163 15.2621547,21.9823757 14.7626527,22.6486751 C17.3389839,21.9797488 19.5515171,20.398015 21.032806,18.2709198 Z M22.261394,15.9636558 C22.7383105,14.733333 23,13.3966269 23,12 C23,5.935 18.065,1 12,1 C11.9903558,1 11.9807145,1.00001248 11.9710761,1.00003742 C11.9678438,1.03771588 11.9644627,1.07608605 11.961,1.115 C11.929,1.483 11.875,2.1 11.962,2.309 C12.042,2.502 12.275,2.8 12.441,2.938 C12.489,2.871 12.543,2.789 12.581,2.729 C12.79,2.404 13.051,2 13.5,2 C13.973,2 14.277,2.418 14.547,2.787 C14.625,2.894 14.743,3.056 14.793,3.095 C14.895,3.168 15.206,3.262 15.455,3.337 C16.127,3.539 16.888,3.767 16.993,4.42 C17.079,4.947 16.598,5.285 16.212,5.558 C16.106,5.633 15.943,5.747 15.903,5.796 C15.685,6.099 15.468,6.71 15.257,7.301 C14.876,8.373 14.482,9.482 13.762,9.926 C13.398,10.152 12.92,10.049 12.415,9.939 C12.288,9.911 12.104,9.871 11.966,9.853 C12.137,10.39 13.581,11.58 14.691,12.04 C14.916,12.133 15.481,12.061 15.938,12.006 C16.598,11.923 17.222,11.846 17.691,12.04 C17.986,12.163 18.218,12.449 18.444,12.725 C18.545,12.849 18.697,13.036 18.762,13.077 C18.965,13.202 19.45,13.292 19.876,13.371 C20.685,13.52 21.52,13.675 21.905,14.21 C22.1740332,14.5832937 22.2616862,15.2506405 22.261394,15.9636558 Z M11.3735522,0.0161486407 C11.4139446,0.00561012503 11.4563211,0 11.5,0 C11.5287517,0 11.556939,0.00243083605 11.5843676,0.00709806622 C11.7223407,0.00237887026 11.8608977,0 12,0 C18.617,0 24,5.383 24,12 C24,14.4679914 23.2511594,16.7643184 21.9687519,18.6737073 C21.9396129,18.7532754 21.8912159,18.8221111 21.8300337,18.8757758 C19.6577592,21.9721553 16.0613114,24 12,24 C5.383,24 0,18.617 0,12 C0,5.59310433 5.04658293,0.343088346 11.3735522,0.0161486407 Z M13.2728164,22.9267967 C13.9140994,22.1462151 14.8634995,20.8752517 15.021,20.354 C15.144,19.947 15.173,19.018 15.038,18.69 C14.912,18.386 14.286,17.947 13.782,17.595 C12.906,16.981 12,16.346 12,15.5 C12,15.051 12.404,14.79 12.729,14.58 C12.807,14.53 12.926,14.453 12.995,14.397 C12.884,13.359 11.131,12.08 9.713,11.045 C8.635,10.258 7.616,9.515 7.096,8.792 C6.742,8.305 6.16,7.24 6.014,6.614 C5.92,6.217 5.991,5.707 6.066,5.167 C6.128,4.724 6.231,3.983 6.094,3.793 C6.092,3.824 5.84,3.798 5.688,3.783 C5.45541042,3.76000238 5.14141102,3.72880914 4.89464378,3.60931639 C2.51366501,5.62871609 1,8.64106104 1,12 C1,18.065 5.935,23 12,23 C12.4304165,23 12.855142,22.9751456 13.2728164,22.9267967 Z" />
    </svg>
  </SVGIcon>
);

Globe1.displayName = "DecorativeIcon";

export default Globe1;
