import React, { useCallback, useEffect, useRef, useState } from "react";
import bgImage from "./assets/bg.png";
import PixelmossImagesHorizontal from "./components/PixelmossImagesHorizontal";
import LayoutHorizontal from "./components/LayoutHorizontal";
import LayoutVertical from "./components/LayoutVertical";
import Hello from "./components/Hello";
import "./App.css";
import PixelmossImagesVertical from "./components/PixelmossImagesVertical";

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
    <div style={backgroundStyle} className='custom-cursor'>
      {isVertical ? (
        <LayoutVertical setScrollableRef={setScrollableRef} />
      ) : (
        <LayoutHorizontal setScrollableRef={setScrollableRef} />
      )}
      {/* <PixelmossImages /> */}
      {/* <ImpulzImages positions={positions} /> */}
      {isVertical ? <PixelmossImagesVertical /> : <PixelmossImagesHorizontal />}
      {displayHello && <Hello onSelectYes={() => setDisplayHello(false)} />}
    </div>
  );
}

export default App;
