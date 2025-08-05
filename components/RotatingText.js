// components/RotatingText.js

'use client';

import { TypeAnimation } from 'react-type-animation';

const RotatingText = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'This is your link display name',
        2000, // wait 1s
        'you can always change it later',
        2000, // wait 1s
        
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: 'em', display: 'inline-block', color: 'gray'}}
      repeat={Infinity}
    />
  );
};

export default RotatingText;