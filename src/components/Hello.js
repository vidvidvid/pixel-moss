import React, { useState } from "react";
import hello from "../assets/hello.png";

const Hello = ({ onSelectYes, togglePlayPause }) => {
  const [selectNo, setSelectNo] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        position: "fixed", // Changed to fixed for full overlay
        top: 0, // Ensures it covers from the very top
        left: 0, // Ensures it covers from the very left
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center", // Properly centers the content
        height: "100vh",
        width: "100vw",
        // backdropFilter: "blur(3px)", // Applies a blur filter
        zIndex: 30, // Ensures it stays on top of other content
        backgroundColor: "rgba(0, 0, 0, 0.9 )", // Optional: Adds a semi-transparent background
      }}
    >
      <div
        style={{
          backgroundImage: `url(${hello})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "800px",
          height: "600px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#FFFFFF", // Assuming white text for visibility
        }}
        className='scum-font'
      >
        <p
          style={{
            padding: "0 180px",
            fontSize: 24,
            textAlign: "center",
            marginRight: 20,
            marginBottom: 0,
            lineHeight: 1.3,
          }}
        >
          Hello there Earthling! <br /> You have stumbled upon my cyber garden
          in the digital ether. 🌿 Do you wish to journey deeper into this
          realm, where I moss whisper tales of resilience, adaptation, and the
          delicate dance of existence?
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap: 40,
            fontSize: 24,
          }}
        >
          <p
            className='text-green custom-cursor-hover'
            style={{ transition: "transform 0.3s ease" }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onClick={() => {
              togglePlayPause();
              onSelectYes();
            }}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Yes
          </p>
          <p
            className='text-violet custom-cursor-hover'
            style={{ transition: "transform 0.3s ease" }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onClick={() => setSelectNo(true)}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            No
          </p>
          {selectNo && <p className='voxel-font text-violet'>:(</p>}
        </div>
      </div>
    </div>
  );
};

export default Hello;
