import React from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const AnimatedText = () => {
  const { text, cursor } = useTypewriter({
    words: ['software engineer', 'musician', 'writer'],
    typeSpeed: 100,
    deleteSpeed: 30,
    delayBetweenWords: 3000,
  });

  return (
    <span className="text-blue-400">
      {text}
      <span className="animate-pulse text-blue-400">{cursor}</span>
    </span>
  );
};

export default AnimatedText;