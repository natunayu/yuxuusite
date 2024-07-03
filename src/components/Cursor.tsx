import React, { useEffect, useState } from 'react';
import '../styles/Cursor.css';

const CursorCircle: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseOver = (event: MouseEvent) => {
      //menubuttonに触れているとき変形
      if ((event.target as HTMLElement).classList.contains('menu-button')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    //モバイル判定
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    mediaQuery.addListener(handleMediaChange);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      mediaQuery.removeListener(handleMediaChange);
    };
  }, []);

  //モバイル判定
  if (isMobile) {
    return null;
  }

  return (
    <div
      className={`cursor-circle ${isHovered ? 'hovered' : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
};

export default CursorCircle;
