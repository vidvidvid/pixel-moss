import React from "react";
import impulz1 from "../assets/teksture/impulz1.png";
import impulz2 from "../assets/teksture/impulz2.png";
import impulz3 from "../assets/teksture/impulz3.png";

const ImpulzImages = ({ positions }) => {
  const impulzImages = [impulz1, impulz2, impulz3];

  return (
    <>
      {impulzImages.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Impulz ${index + 1}`}
          style={{
            pointerEvents: "none",
            position: "absolute",
            left: `${positions[index].x}px`,
            top: `${positions[index].y}px`,
            width: "900px",
            height: "auto",
            zIndex: 0,
          }}
        />
      ))}
    </>
  );
};

export default ImpulzImages;
