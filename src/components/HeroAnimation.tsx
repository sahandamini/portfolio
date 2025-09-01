'use client';

import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const HeroAnimation: React.FC = () => {
  return (
    <div className="text-center">
      <TypeAnimation
        sequence={[
          'Sahand Amini',
          1000,
        ]}
        wrapper="h1"
        cursor={true}
        repeat={0}
        className="text-6xl font-bold md:text-8xl"
      />
      <p className="text-2xl md:text-3xl mt-4">
        Full Stack Engineer
      </p>
    </div>
  );
};

export default HeroAnimation;
