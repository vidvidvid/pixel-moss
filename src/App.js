import React, { useCallback, useEffect, useRef, useState } from "react";
import bgImage from "./assets/bg.png";
import PixelmossImages from "./components/PixelmossImages";
import LayoutHorizontal from "./components/LayoutHorizontal";
import LayoutVertical from "./components/LayoutVertical";
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

  const setScrollableRef = useCallback(
    (index) => (ref) => {
      scrollableRefs.current[index] = ref;
    },
    []
  );

  const [displayHello, setDisplayHello] = useState(true);
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
    <div style={backgroundStyle}>
      {isVertical ? (
        <LayoutVertical setScrollableRef={setScrollableRef} />
      ) : (
        <LayoutHorizontal setScrollableRef={setScrollableRef} />
      )}
      {/* <PixelmossImages /> */}
      {/* <ImpulzImages positions={positions} /> */}
      {displayHello && <Hello onSelectYes={() => setDisplayHello(false)} />}
    </div>
  );
}

export default App;
