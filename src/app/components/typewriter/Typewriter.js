import React, { useState, useEffect, useRef } from 'react';

/**
 * 遞迴計算內容中的字元數（僅計算純文字）
 */
function countChars(content) {
  if (typeof content === 'string') {
    return content.length;
  }
  let count = 0;
  React.Children.forEach(content, (child) => {
    if (typeof child === 'string') {
      count += child.length;
    } else if (React.isValidElement(child)) {
      count += countChars(child.props.children);
    }
  });
  return count;
}

/**
 * 遞迴根據剩餘字元數重建內容結構（保留格式）
 */
function revealChildren(children, count) {
  let remaining = count;
  return React.Children.map(children, (child) => {
    if (remaining <= 0) return null;
    if (typeof child === 'string') {
      if (child.length <= remaining) {
        remaining -= child.length;
        return child;
      } else {
        const res = child.slice(0, remaining);
        remaining = 0;
        return res;
      }
    } else if (React.isValidElement(child)) {
      const originalCount = countChars(child.props.children);
      const newChildren = revealChildren(child.props.children, remaining);
      const consumed = originalCount - countChars(newChildren);
      remaining -= consumed;
      return React.cloneElement(child, { children: newChildren });
    }
    return child;
  });
}

/**
 * 根據 content 以及 count，生成揭露內容
 * 如果 content 為純文字，直接 substring；若為格式化內容則用 revealChildren
 */
function revealContent(content, count) {
  if (typeof content === 'string') {
    // 將 <br/> 或 <br> 轉換為換行符號
    const modified = content.replace(/<br\s*\/?>/gi, '\n');
    const partial = modified.substring(0, count);
    return partial.split('\n').map((line, index, arr) => (
      <React.Fragment key={index}>
        {line}
        {index < arr.length - 1 && <br />}
      </React.Fragment>
    ));
  }
  return revealChildren(content, count);
}

/**
 * 通用打字機效果元件，可以接受純文字或格式化內容
 *
 * props:
 * - content: 要打字的內容，可以是純文字字串或 React 節點
 * - speed: 每個字元的延遲（毫秒）
 * - start: 是否開始打字（由 false 轉 true 觸發打字效果）
 * - className: 外層容器的 className
 */
export default function Typewriter({ content, speed = 50, start = false, className = '' }) {
  const [charCount, setCharCount] = useState(0);
  const hasStarted = useRef(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!start || hasStarted.current) return;
    hasStarted.current = true;
    const total = countChars(content);
    setCharCount(0);
    intervalRef.current = setInterval(() => {
      setCharCount((prev) => {
        if (prev >= total) {
          clearInterval(intervalRef.current);
          return prev;
        }
        return prev + 1;
      });
    }, speed);
    return () => clearInterval(intervalRef.current);
  }, [content, speed, start]);

  const revealed = revealContent(content, charCount);
  return <span className={className}>{revealed}</span>;
}

/**
 * 用於純文字的打字機元件（傳入 text prop）
 */
export function TypewriterText({ text, speed = 50, start = false, className = '' }) {
  return <Typewriter content={text} speed={speed} start={start} className={className} />;
}

/**
 * 用於格式化內容的打字機元件（傳入 children）
 */
export function TypewriterFormatted({ children, speed = 50, start = false, className = '' }) {
  return <Typewriter content={children} speed={speed} start={start} className={className} />;
}

/**
 * 預設純文字陣列打字機元件，接收段落字串陣列
 */
export function TypewriterParagraph({ paragraphs, speed = 50, start = false, className = '' }) {
  return (
    <div className={className}>
      {paragraphs.map((para, index) => (
        <p key={index}>
          <TypewriterText text={para} speed={speed} start={start} />
        </p>
      ))}
    </div>
  );
}
