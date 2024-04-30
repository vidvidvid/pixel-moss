import React from "react";
import frame0 from "../assets/frames/frame0.png";
import frame1 from "../assets/frames/frame1.png";
import frame2 from "../assets/frames/frame2.png";
import frame3 from "../assets/frames/frame3.png";
import frame4 from "../assets/frames/frame4.png";
import frame5 from "../assets/frames/frame5.png";

const frames = [frame0, frame1, frame2, frame3, frame4, frame5];

const Frame = ({
  children,
  index,
  height,
  width,
  position,
  innerTop,
  innerLeft,
  innerWidth,
  innerHeight,
}) => {
  const innerFrameStyle = {
    position: "absolute",
    top: innerTop || "20%",
    left: innerLeft || "10%",
    width: innerWidth || "80%",
    height: innerHeight || "60%",
    zIndex: 2, // Inner frame has a lower zIndex
    pointerEvents: "all",
  };

  const contentStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2, // Content has the lowest zIndex
  };

  const frameContainerStyle = {
    position: "absolute",
    width: width || "100%",
    height: height || "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const frameStyle = {
    pointerEvents: "none",
    backgroundImage: `url(${frames[index]})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
    position: "relative",
    zIndex: 3, // Outer frame has the highest zIndex
  };

  const backdropStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    backdropFilter: "blur(16px)", // Apply blur to the backdrop
    zIndex: 1, // Ensures it does not overlap content
  };

  return (
    <div style={{ ...frameContainerStyle, ...position }}>
      <div style={frameStyle}></div>
      <div style={innerFrameStyle}>
        <div style={backdropStyle}></div> {/* This div applies the blur */}
        <div style={contentStyle}>{children}</div>
      </div>
    </div>
  );
};

export default Frame;
