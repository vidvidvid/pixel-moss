import React, { useEffect, useState } from "react";
import moss from "../assets/interact/moss.png";
import animate from "../assets/interact/animate.gif";
import wet from "../assets/interact/wet.svg";
import glow from "../assets/interact/glow.svg";
import drop from "../assets/interact/drop.svg";
import sun from "../assets/interact/sun.svg";

const MossInteraction = () => {
  const [isGlowing, setIsGlowing] = useState(false);
  const [isWet, setIsWet] = useState(false);
  const [mah, setMah] = useState(moss);

  const handleGlowClick = () => {
    setIsGlowing(true);
    setMah(animate);
    setTimeout(() => {
      setIsGlowing(false);
      setMah(moss);
    }, 3750);
  };

  const handleWaterClick = () => {
    setIsWet(true);
    setMah(animate);
    setTimeout(() => {
      setIsWet(false);
      setMah(moss);
    }, 3750);
  };

  const [isVertical, setIsVertical] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      setIsVertical(innerHeight / innerWidth > 1);
    };

    handleResize(); // Check on initial load
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          top: 70,
          left: 0,
          position: "absolute",
        }}
      >
        <button
          style={{
            color: "white",
            background: "transparent",
            border: "none",
            fontSize: 18,
            transition: "transform 0.2s",
            height: 35,
          }}
          className='scum-font custom-cursor-hover'
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
            transition: "transform 0.2s",
          }}
          className='scum-font custom-cursor-hover'
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
      <div style={{ position: "absolute", bottom: 0, left: -20 }}>
        <img
          src={wet}
          style={{
            width: 80,
            height: "auto",
            zIndex: 10000,
            opacity: isWet ? 1 : 0,
            transition: "opacity 0.5s ease",
            position: "absolute",
            bottom: "50px",
            left: isVertical ? 115 : 95,
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
            left: isVertical ? 100 : 85,
          }}
          alt='Glow'
        />
        <img
          src={mah}
          style={{
            width: 240,
            position: "relative",
            opacity: isGlowing ? 1 : isWet ? 0.8 : 1,
            filter: isGlowing ? "brightness(1.2)" : "none",
            transition: "opacity 0.5s ease, filter 0.5s ease",
            left: isVertical ? 42 : 26,
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
