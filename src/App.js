import React, { useState } from "react";
import bgImage from "./assets/bg.png";
import PixelmossImages from "./components/PixelmossImages";
import Layout from "./components/Layout";
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
  const [displayHello, setDisplayHello] = useState(true);

  return (
    <div style={backgroundStyle} className="custom-cursor"> 
      <Layout />
      <PixelmossImages />
      {displayHello && <Hello onSelectYes={() => setDisplayHello(false)} />}
    </div>
  );
}

export default App;
