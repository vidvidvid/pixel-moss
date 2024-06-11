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
import takecare from "../assets/pixelmoss/takecare.svg";

const pixelmossImages = [
  pixelmoss0,
  pixelmoss1,
  pixelmoss2,
  pixelmoss3,
  pixelmoss4,
  pixelmoss5,
  takecare,
  pixelmoss7,
  pixelmoss8,
  pixelmoss6,
];

const positionStyles = [
  { top: "20px", right: "200px", width: "120px" },
  { bottom: "190px", left: "400px", width: "330px" },
  { top: "100px", left: "47%", transform: "translateX(-50%)", width: "300px" },
  { top: "20px", left: "130px", width: "200px" },
  { top: "20px", right: "420px", width: "370px" },
  { bottom: "20px", left: "370px", width: "300px" },
  { bottom: "450px", left: "60px", width: "300px" },
  { bottom: "190px", right: "420px", width: "300px" },
  { top: "20px", left: "500px", width: "400px" },
  { bottom: "390px", right: "220px", width: "330px" },
];

const PixelmossImagesHorizontal = () => {
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

export default PixelmossImagesHorizontal;
