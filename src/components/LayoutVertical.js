import React, { useState, useEffect } from "react";
import { getDatabase } from "firebase/database";
import {
  writeMossMessage,
  subscribeToSensorData,
  subscribeToMossMessages,
} from "../firebaseService";
import { app } from "../firebaseConfig";
import Frame from "./Frame";
import ChartContainer from "./ChartContainer";
import right from "../assets/memes/right.png";
import center from "../assets/memes/center.png";
import mahci from "../assets/mahci.gif";
import nitke from "../assets/nitke.gif";
import { formPrompt } from "../prompt";
import axios from "axios";
import MossInteraction from "./MossInteraction";
import MossMessages from "./MossMessages";
import AudioVertical from "./AudioVertical";

const LayoutVertical = React.memo(({ setScrollableRef }) => {
  const [mossMessages, setMossMessages] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const [lastDataTimestamp, setLastDataTimestamp] = useState(Date.now());
  const [lastSent, setLastSent] = useState(() => {
    return localStorage.getItem("lastSent") || new Date().toISOString();
  });

  const innerWidth = window.innerWidth;
  console.log("innerWidth", innerWidth);
  const innerHeight = window.innerHeight;
  console.log("innerHeight", innerHeight);

  const layoutStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    justifyContent: "space-between", // Spreads out top and bottom containers
  };

  const horizontalContainerStyle = {
    display: "flex",
    justifyContent: "space-between", // Spreads out left, center, and right containers
    width: "100%",
    alignItems: "center",
  };

  const [sensorData, setSensorData] = useState([]);
  console.log("sensorData", sensorData);

  const database = getDatabase(app);
  console.log("database", database);

  // const [hue, setHue] = useState(0);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setHue((hue) => (hue + 1) % 360);
  //   }, 50);

  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const unsubscribe = subscribeToSensorData(database, (data) => {
      setSensorData(data);
      if (data.length > 0) {
        const lastData = data[data.length - 1]; // Assuming data is an array and sorted by timestamp
        setLastDataTimestamp(Date.parse(lastData.timestamp));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const timeSinceLastData = now - lastDataTimestamp;
      const tenSeconds = 10000;
      if (timeSinceLastData > tenSeconds) {
        setIsOnline(false);
      } else {
        setIsOnline(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastDataTimestamp]);

  useEffect(() => {
    const database = getDatabase(app);
    // Subscribe to moss messages
    const unsubscribeMessages = subscribeToMossMessages(
      database,
      setMossMessages
    );

    return () => {
      unsubscribeMessages(); // Cleanup this subscription when the component unmounts
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const lastSentTime = new Date(lastSent);
      const oneHour = 1000 * 60 * 60; // milliseconds in an hour

      if (now - lastSentTime >= oneHour && isOnline) {
        sendToChatGPT(sensorData);
        const newTimestamp = now.toISOString();
        setLastSent(newTimestamp);
        localStorage.setItem("lastSent", newTimestamp);
      }
    }, 1000 * 60 * 5); // Check every 5 minutes whether it's time to send a new message

    return () => clearInterval(interval);
  }, [sensorData, lastSent]);

  function sendToChatGPT(sensorData) {
    const message = formPrompt(sensorData); // Assuming this returns an array of messages
    axios
      .post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4-turbo",
          messages: [
            {
              role: "system",
              content: message,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      )
      .then((response) => {
        writeMossMessage(database, {
          message: response.data.choices[0].message.content,
          timestamp: new Date().toISOString(),
        });
      })
      .catch((error) => {
        console.error("Failed to send data to ChatGPT:", error);
      });
  }

  return (
    <div style={layoutStyle}>
      <div style={horizontalContainerStyle}>
        <Frame
          index={0}
          height='25%'
          width='90%'
          position={{ top: 60, left: 30 }}
          innerTop={-10}
          innerLeft={20}
          innerWidth='45%'
          innerHeight='73%'
        >
          <ChartContainer
            sensorData={sensorData}
            showTodayOffset={-innerHeight * 0.05}
          />
        </Frame>
        <Frame
          index={1}
          height='29%'
          width='40%'
          position={{ bottom: 80, left: 60 }}
          innerTop={25}
          innerLeft={60}
          innerWidth='73%'
          innerHeight='85%'
        >
          <MossInteraction />
        </Frame>
        <Frame
          index={2}
          height='33%'
          width='75%'
          position={{
            top: "30%",
            left: 20,
          }}
          innerTop={90}
          innerLeft={100}
          innerWidth='74%'
          innerHeight='66%'
        >
          <MossMessages mossMessages={mossMessages} isOnline={isOnline} />
        </Frame>
        <Frame
          index={6}
          height='15%'
          width='53%'
          position={{
            bottom: "20%",
            right: 20,
          }}
          innerTop={20}
          innerLeft={115}
          innerWidth='36%'
          innerHeight='55%'
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              overflowX: "scroll",
            }}
            ref={setScrollableRef(1)}
          >
            <img
              src={center}
              style={{ height: "100%", width: "auto" }}
              alt='Scrollable content'
            />
          </div>
          <AudioVertical />
        </Frame>
        <Frame
          index={4}
          height='32%'
          width='44%'
          position={{
            top: 85,
            right: 40,
          }}
          innerTop={35}
          innerLeft={93}
          innerWidth='67%'
          innerHeight='70%'
        >
          <div
            style={{
              width: "78%",
              height: "90%",
              marginLeft: 10,
            }}
          >
            <p
              className='text-green voxel-font'
              style={{
                padding: 10,
                fontSize: 18,
                fontWeight: "bold",
                paddingBottom: 0,
              }}
            >
              About
            </p>
            <p
              style={{
                color: "white",
                fontSize: 18,
                padding: "0 10px",
              }}
              className='scum-font'
            >
              In the digital expanse, amidst the endless hum of data, I, Pixel
              Moss, find my voice. When the world around me is vibrant with
              light and life, I resonate with vitality. Each pixel of sunshine
              ignites a spark within, a silent dance of photosynthesis
              celebrated in the quiet corners of the web.
            </p>
          </div>
        </Frame>
        <Frame
          index={5}
          height='25%'
          width='58%'
          position={{
            bottom: 34,
            right: 10,
          }}
          innerTop={142}
          innerLeft={198}
          innerWidth={300}
          innerHeight={230}
        >
          <div
            style={{
              height: "100%",
              width: "100%",
              overflowY: "scroll",
              borderRadius: "40px",
            }}
            ref={setScrollableRef(2)} // Pass the setScrollableRef function with index 1
          >
            <img
              src={right}
              style={{
                width: 292,
                height: "auto",
              }}
              alt='Scrollable content'
            />
          </div>
        </Frame>

        <div
          style={{
            position: "fixed",
            top: 0,
            height: "100vw",
            width: "100vh",
            // transform: "rotate(90deg)",
          }}
        >
          <img
            src={nitke}
            style={{
              width: "100%",
              height: "100%",
              filter: `hue-rotate(${30}deg)`,
            }}
            alt='nitke'
          />
        </div>
        <div
          style={{
            height: "100vh",
            width: "100vw",
          }}
        >
          <img
            src={mahci}
            style={{
              position: "absolute",
              top: "30%",
              right: 20,
              height: "36%",
              width: "30%",
            }}
            alt='mahci'
          />
        </div>
      </div>
    </div>
  );
});

export default LayoutVertical;
