import React, { useState, useEffect, useRef } from 'react';

/**
 * 遞迴計算內容中的字元數（僅計算純文字）
 */
function countChars(content) {
  if (typeof content === 'string') {
    return content.length;
  }
  if (React.isValidElement(content)) {
    return countChars(content.props.children);
  }
  let count = 0;
  React.Children.forEach(content, (child) => {
    count += countChars(child);
  });
  return count;
}

/**
 * 遞迴根據剩餘字元數重建內容結構（保留格式）
 */
function revealChildren(children, count) {
  let remaining = count;
  if (React.isValidElement(children)) {
    const newChildren = revealChildren(children.props.children, remaining);
    return React.cloneElement(children, { children: newChildren });
  }
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
export default function Typewriter({ contentKey = null, content, speed = 50, start = false, className = '', onDone = () => { } }) {
  const intervalRef = useRef(null);
  const [prevContentKey, setPrevContentKey] = useState(contentKey);
  const [charCount, setCharCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isDone, setIsDone] = useState(false);



  useEffect(() => {
    if (prevContentKey !== contentKey) {
      setHasStarted(false);
      setCharCount(0);
      setIsDone(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setPrevContentKey(contentKey);
    }
  }, [contentKey]);

  useEffect(() => {
    if (!start) return;
    setHasStarted(true);
    const total = countChars(content);
    if (!hasStarted) {
      setCharCount(0);
    }
    intervalRef.current = setInterval(() => {
      setCharCount((prev) => {
        if (prev >= total) {
          clearInterval(intervalRef.current);
          if (!isDone) {

            setIsDone(true);
            onDone();
          }
          return prev;
        }
        return prev + 1;
      });
    }, speed);
    return () => clearInterval(intervalRef.current);
  }, [content, speed, start]);

  const revealed = revealContent(content, charCount);
  return <div className={className}>{revealed}</div>;
}

/**
 * 用於格式化內容的打字機元件（傳入 children）
 */
export function TypewriterFormatted({ children, speed = 50, start = false, className = '' }) {
  return <Typewriter key={key} content={children} speed={speed} start={start} className={className} />;
}

/**
 * 預設純文字陣列打字機元件，接收段落字串陣列
 */
export function TypewriterParagraph({ paragraphs, speed = 50, start = false, className = '' }) {
  return (
    <div className={className}>
      {paragraphs.map((para, index) => (
        <div key={index}>
          <Typewriter content={para} speed={speed} start={start} />
        </div>
      ))}
    </div>
  );
}
