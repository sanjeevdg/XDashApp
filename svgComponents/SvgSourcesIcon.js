import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgSourcesIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-scroll-text "
    {...props}
  >
    <Path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
    <Path d="M19 17V5a2 2 0 0 0-2-2H4" />
    <Path d="M15 8h-5" />
    <Path d="M15 12h-5" />
  </Svg>
);
export default SvgSourcesIcon;
