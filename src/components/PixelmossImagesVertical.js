import React from "react";
import pixelmoss0 from "../assets/pixelmoss/pixelmoss0.svg";
import pixelmoss1 from "../assets/pixelmoss/pixelmoss1.svg";
import pixelmoss2 from "../assets/pixelmoss/pixelmoss2.svg";
import pixelmoss4 from "../assets/pixelmoss/pixelmoss4.svg";
import pixelmoss5 from "../assets/pixelmoss/pixelmoss5.svg";
import takecare from "../assets/pixelmoss/takecare.svg";

const pixelmossImages = [
  pixelmoss0,
  pixelmoss1,
  pixelmoss2,
  pixelmoss4,
  pixelmoss5,
  takecare,
];

const positionStyles = [
  { top: "60px", right: "60px", width: "15%" },
  { bottom: "17%", right: "23%", width: "25%" },
  { top: "30%", left: "34%", transform: "translateX(-50%)", width: "33%" },
  { top: "25%", left: "40px", width: "20%" },
  { bottom: "40px", left: "40px", width: "24%" },
  { bottom: "35%", left: "15%", width: "24%" },
];

const PixelmossImagesVertical = () => {
  return (
    <>
      {pixelmossImages.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Pixelmoss ${index}`}
          style={{
            position: "absolute",
            pointerEvents: "none",
            ...positionStyles[index],
          }}
        />
      ))}
    </>
  );
};

export default PixelmossImagesVertical;
