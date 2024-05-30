import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgRelatedIcon = (props) => (
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
    className="lucide lucide-bot-message-square "
    {...props}
  >
    <Path d="M12 6V2H8" />
    <Path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z" />
    <Path d="M2 12h2" />
    <Path d="M9 11v2" />
    <Path d="M15 11v2" />
    <Path d="M20 12h2" />
  </Svg>
);
export default SvgRelatedIcon;
