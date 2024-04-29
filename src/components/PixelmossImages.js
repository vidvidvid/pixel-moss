import React from "react";
import pixelmoss0 from "../assets/pixelmoss/pixelmoss0.svg";
import pixelmoss1 from "../assets/pixelmoss/pixelmoss1.svg";
import pixelmoss2 from "../assets/pixelmoss/pixelmoss2.svg";
import pixelmoss3 from "../assets/pixelmoss/pixelmoss3.svg";
import pixelmoss4 from "../assets/pixelmoss/pixelmoss4.svg";
import pixelmoss5 from "../assets/pixelmoss/pixelmoss5.svg";
import pixelmoss6 from "../assets/pixelmoss/pixelmoss6.svg";
import pixelmoss7 from "../assets/pixelmoss/pixelmoss7.svg";
import pixelmoss8 from "../assets/pixelmoss/pixelmoss8.svg";

const pixelmossImages = [
  pixelmoss0,
  pixelmoss1,
  pixelmoss2,
  pixelmoss3,
  pixelmoss4,
  pixelmoss5,
  pixelmoss6,
  pixelmoss7,
  pixelmoss8,
];

const positionStyles = [
  { top: "20px", right: "200px", width: "120px" },
  { top: "270px", left: "300px", width: "400px" },
  { top: "100px", left: "47%", transform: "translateX(-50%)", width: "300px" },
  { top: "20px", left: "130px", width: "200px" },
  { top: "20px", right: "400px", width: "400px" },
  { bottom: "20px", right: "300px", width: "400px", zIndex: 1337 },
  { bottom: "440px", left: "50px", width: "400px", zIndex: 1337 },
  { bottom: "120px", right: "360px", width: "400px", zIndex: 1337 },
  { top: "20px", left: "500px", width: "400px", zIndex: 1337 },
];

const PixelmossImages = () => {
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

export default PixelmossImages;
