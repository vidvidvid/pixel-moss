import React, { useState } from "react";
import moss from "../assets/interact/moss.png";
import wet from "../assets/interact/wet.svg";
import glow from "../assets/interact/glow.svg";
import drop from "../assets/interact/drop.svg";
import sun from "../assets/interact/sun.svg";

const MossInteraction = () => {
  const [isGlowing, setIsGlowing] = useState(false);
  const [isWet, setIsWet] = useState(false);

  const handleGlowClick = () => {
    setIsGlowing(true);
    setTimeout(() => {
      setIsGlowing(false);
    }, 1000);
  };

  const handleWaterClick = () => {
    setIsWet(true);
    setTimeout(() => {
      setIsWet(false);
    }, 1000);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          width: "100%",
          marginTop: 40,
          marginLeft: -20,
        }}
      >
        <button
          style={{
            color: "white",
            background: "transparent",
            border: "none",
            fontSize: 18,
            cursor: "pointer",
            transition: "transform 0.2s",
          }}
          className='scum-font'
          onClick={handleWaterClick}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <img
            src={drop}
            alt='Drop'
            style={{ marginRight: "4px", verticalAlign: "middle" }}
          />
          Sprinkle me
        </button>
        <button
          style={{
            color: "white",
            background: "transparent",
            border: "none",
            fontSize: 18,
            cursor: "pointer",
            transition: "transform 0.2s",
          }}
          className='scum-font'
          onClick={handleGlowClick}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <img
            src={sun}
            alt='Sun'
            style={{ marginRight: "4px", verticalAlign: "middle" }}
          />
          Shine for me
        </button>
      </div>
      <div style={{ position: "relative" }}>
        <img
          src={wet}
          style={{
            width: 90,
            height: "auto",
            zIndex: 10000,
            opacity: isWet ? 1 : 0,
            transition: "opacity 0.5s ease",
            position: "absolute",
            bottom: "50px",
            left: 85,
          }}
          alt='Wet'
        />
        <img
          src={glow}
          style={{
            width: 130,
            height: "auto",
            zIndex: -1,
            opacity: isGlowing ? 1 : 0,
            transition: "opacity 0.5s ease",
            position: "absolute",
            bottom: 70,
            left: 70,
          }}
          alt='Glow'
        />
        <img
          src={moss}
          style={{
            width: 260,
            position: "relative",
            opacity: isGlowing ? 1 : isWet ? 0.8 : 1,
            filter: isGlowing ? "brightness(1.2)" : "none",
            transition: "opacity 0.5s ease, filter 0.5s ease",
            left: 10,
            zIndex: 0,
            bottom: -10,
          }}
          alt='Moss'
        />
      </div>
    </div>
  );
};

export default MossInteraction;
