import React, { useRef, useEffect } from "react";
import right from "../assets/memes/right.png";

const AutoScrollableFrame = () => {
  const scrollableRef = useRef(null);

  useEffect(() => {
    let animationFrameId;

    const autoScroll = () => {
      const scrollableElement = scrollableRef.current;

      if (!scrollableElement) {
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = scrollableElement;

      // Reset when we've scrolled halfway through (before reaching the end)
      // This works because we have duplicated content
      if (scrollTop >= (scrollHeight - clientHeight) / 2) {
        scrollableElement.scrollTop = 0;
      } else {
        // Continue scrolling down
        scrollableElement.scrollTop += 0.5; // Adjust scroll speed as needed
      }

      // Request the next animation frame
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    // Start auto-scrolling
    animationFrameId = requestAnimationFrame(autoScroll);

    // Cleanup function to cancel animation frame on unmount
    return () => cancelAnimationFrame(animationFrameId);
  }, []); // Empty dependency array to run only on mount

  return (
    <div
      ref={scrollableRef}
      style={{
        height: "100%",
        width: "100%",
        overflowY: "scroll", // Allow user scrolling
        borderRadius: "40px",
      }}
      className='scrollable-div'
    >
      <div>
        <img
          src={right}
          style={{
            width: "100%",
            height: "auto",
          }}
          alt='Scrollable content'
        />
        <img
          src={right}
          style={{
            width: "100%",
            height: "auto",
          }}
          alt='Scrollable content'
        />
      </div>
    </div>
  );
};

export default AutoScrollableFrame;
