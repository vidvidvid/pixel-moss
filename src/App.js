import React, { useCallback, useEffect, useRef, useState } from "react";
import bgImage from "./assets/bg.png";
import PixelmossImages from "./components/PixelmossImages";
import Layout from "./components/Layout";
import ImpulzImages from "./components/ImpulzImages";
import Hello from "./components/Hello";
import "./App.css";

const backgroundStyle = {
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  height: "100vh",
  overflow: "hidden",
  position: "relative",
};

function App() {
  const scrollableRefs = useRef([]);

  const [positions, setPositions] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  useEffect(() => {
    const handleScroll = (index) => () => {
      setPositions((prevPositions) => {
        const newPositions = [...prevPositions];
        newPositions[index] = {
          x: Math.random() * window.innerWidth - 450,
          y: Math.random() * window.innerHeight - 450,
        };
        return newPositions;
      });
    };

    scrollableRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.addEventListener("scroll", handleScroll(index));
      }
    });

    return () => {
      scrollableRefs.current.forEach((ref, index) => {
        if (ref) {
          ref.removeEventListener("scroll", handleScroll(index));
        }
      });
    };
  }, []);

  const setScrollableRef = useCallback(
    (index) => (ref) => {
      scrollableRefs.current[index] = ref;
    },
    []
  );

  const [displayHello, setDisplayHello] = useState(true);

  return (
    <div style={backgroundStyle}>
      <Layout setScrollableRef={setScrollableRef} />
      <PixelmossImages />
      {/* <ImpulzImages positions={positions} /> */}
      {displayHello && <Hello onSelectYes={() => setDisplayHello(false)} />}
    </div>
  );
}

export default App;
