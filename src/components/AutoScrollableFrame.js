import React, { useRef, useEffect, useState } from 'react';
import right from '../assets/memes/right.png';

const AutoScrollableFrame = () => {
  const scrollableRef = useRef(null);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(1); // 1 for scrolling down, -1 for scrolling up

  useEffect(() => {
    let animationFrameId;

    const autoScroll = () => {
      const scrollableElement = scrollableRef.current;
      const { scrollTop, scrollHeight, clientHeight } = scrollableElement;

      // Check if the user has scrolled
      if (scrollTop !== lastScrollTop) {
        // Update last scroll top
        setLastScrollTop(scrollTop);
      } else {
        // If the user hasn't scrolled, continue auto-scrolling
        if (scrollDirection === 1) {
          if (scrollTop >= scrollHeight - clientHeight) {
            // Reverse scroll direction if at the bottom
            setScrollDirection(-1);
          } else {
            // Continue scrolling down
            scrollableElement.scrollTop += 0.5; // or whatever scroll speed you prefer
          }
        } else {
          if (scrollTop === 0) {
            // Reverse scroll direction if at the top
            setScrollDirection(1);
          } else {
            // Continue scrolling up
            scrollableElement.scrollTop -= 1; // or whatever scroll speed you prefer
          }
        }
      }

      // Request the next animation frame
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    // Start auto-scrolling
    animationFrameId = requestAnimationFrame(autoScroll);

    // Cleanup function to cancel animation frame on unmount
    return () => cancelAnimationFrame(animationFrameId);
  }, [lastScrollTop, scrollDirection]); // Re-run effect when lastScrollTop or scrollDirection changes

  return (
    <div
      ref={scrollableRef}
      style={{
        height: "100%",
        width: "100%",
        overflowY: "scroll", // Allow user scrolling
        borderRadius: "40px",
      }}
    >
      <img
        src={right}
        style={{
          width: 292,
          height: "auto",
        }}
        alt='Scrollable content'
      />
    </div>
  );
};

export default AutoScrollableFrame;
