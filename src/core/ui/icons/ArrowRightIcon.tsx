import { SvgIcon } from "@mui/material";
import {
  DefaultComponentProps,
  OverridableTypeMap,
} from "@mui/material/OverridableComponent";
import React from "react";

const ArrowRightIcon: React.FC<DefaultComponentProps<OverridableTypeMap>> = (
  props
) => {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </SvgIcon>
  );
};

export default ArrowRightIcon;
