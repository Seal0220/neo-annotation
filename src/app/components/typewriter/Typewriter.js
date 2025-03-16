import React, { useState, useEffect, useRef } from 'react';

// 單一段落的打字機效果組件（使用 substring 方式）
export function TypewriterText({ text, speed = 50, start = false, className = '' }) {
  const [displayedText, setDisplayedText] = useState('');
  const hasStarted = useRef(false);
  const timeoutId = useRef(null);

  useEffect(() => {
    if (!start || hasStarted.current) return;
    hasStarted.current = true;
    let index = 0;
    setDisplayedText('');

    function typeNext() {
      setDisplayedText(text.substring(0, index + 1));
      index++;
      if (index < text.length) {
        timeoutId.current = setTimeout(typeNext, speed);
      }
    }

    typeNext();

    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [text, speed, start]);

  return <span className={className}>{displayedText}</span>;
}

// 整個打字機效果組件，接收一個段落字串陣列，以及一個 start 參數
export default function Typewriter({ paragraphs, speed = 50, start = false, className = '' }) {
  return (
    <div className={className}>
      {paragraphs.map((para, index) => (
        <p key={index}>
          <TypewriterText key={index} text={para} speed={speed} start={start} />
        </p>
      ))}
    </div>
  );
}
