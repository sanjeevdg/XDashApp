import * as React from "react";
import Svg, { G, Path, Rect } from "react-native-svg";


const MenuIcon = (props) => {
  return (
<Svg
    viewBox="0 0 32 32"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    enableBackground="new 0 0 32 32"
    {...props}
  >
    <Path
      d="M4 10h24a2 2 0 0 0 0-4H4a2 2 0 0 0 0 4zm24 4H4a2 2 0 0 0 0 4h24a2 2 0 0 0 0-4zm0 8H4a2 2 0 0 0 0 4h24a2 2 0 0 0 0-4z"
      fill="#ffffff"
      className="fill-000000"
    />
  </Svg>
  );
}

export default MenuIcon;