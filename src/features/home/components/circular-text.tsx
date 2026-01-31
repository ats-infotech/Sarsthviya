'use client';

import { websiteText } from '@/constants/text-constants';

type CircularTextProps = {
  className?: string;
  text: string;
  size?: number; // default 160
};

export default function CircularText({
  className = '',
  text,
  size = 160
}: CircularTextProps) {
  const center = size / 2;
  const outerRadius = center - 2;
  const innerRadius = center - 22;
  const textRadius = center - 13;

  const pathId = `circlePath-${Math.random().toString(36).slice(2)}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`border-[#DADADA66]! text-[#272727] ${className}`}
    >
      {/* Background */}
      <circle cx={center} cy={center} r={outerRadius} fill='#FFFDF7' />

      {/* Outer ring */}
      <circle
        cx={center}
        cy={center}
        r={outerRadius}
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
      />

      {/* Inner ring */}
      <circle
        cx={center}
        cy={center}
        r={innerRadius}
        fill='none'
        stroke='currentColor'
        strokeWidth='1'
      />

      {/* Circular text path */}
      <defs key={pathId}>
        <path
          id={pathId}
          d={`
            M ${center},${center}
            m -${textRadius},0
            a ${textRadius},${textRadius} 0 1,1 ${textRadius * 2},0
            a ${textRadius},${textRadius} 0 1,1 -${textRadius * 2},0
          `}
        />
      </defs>

      {/* Curved text */}
      <text
        fontSize='8.5'
        fontWeight='600'
        letterSpacing='1.5'
        fill='currentColor'
      >
        <textPath href={`#${pathId}`} startOffset='50%' textAnchor='middle'>
          {text}
        </textPath>
      </text>

      {/* Center 70% */}
      <text
        x={center}
        y={center}
        textAnchor='middle'
        fontSize='40'
        fontFamily='Playfair Display, serif'
        fontWeight='600'
        fill='currentColor'
      >
        {websiteText.offerPercentage}
      </text>

      {/* Off */}
      <text
        x={center}
        y={center + 30}
        textAnchor='middle'
        fontSize='22'
        letterSpacing='1'
        fontWeight='500'
        fill='currentColor'
      >
        {websiteText.offerPercentageSub}
      </text>
    </svg>
  );
}
