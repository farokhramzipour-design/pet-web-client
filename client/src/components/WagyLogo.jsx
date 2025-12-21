import React from 'react';
import { SvgIcon } from '@mui/material';

export default function WagyLogo(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 100 100">
      {/* A stylized 'W' that looks like a happy dog face/ears or tail wag */}
      <path
        d="M20,40 Q30,80 50,60 Q70,80 80,40 Q70,50 60,40 Q50,50 40,40 Q30,50 20,40 Z"
        fill="currentColor"
      />
      {/* A paw print pad in the center */}
      <circle cx="50" cy="75" r="8" fill="currentColor" />
      {/* Toes */}
      <circle cx="35" cy="65" r="5" fill="currentColor" />
      <circle cx="65" cy="65" r="5" fill="currentColor" />
    </SvgIcon>
  );
}
