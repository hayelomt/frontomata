import React from 'react';
import { LocalIconProps } from '../../utils/localIcon';

const AdjustIcon: React.FC<LocalIconProps> = (props) => {
  return (
    <svg
      width={props.width || 21}
      height={props.height || 21}
      fill="none"
      viewBox="0 0 24 24"
      stroke={props.fill || '#919EAB'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
      />
    </svg>
  );
};

export default AdjustIcon;
