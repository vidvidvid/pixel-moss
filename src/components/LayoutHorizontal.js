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
import centergif from "../assets/memes/center.gif";
import mahci from "../assets/mahci.gif";
import nitke from "../assets/nitke.gif";
import { formPrompt } from "../prompt";
import axios from "axios";
import MossInteraction from "./MossInteraction";
import MossMessages from "./MossMessages";
import Audio from "./Audio";
import AutoScrollableFrame from "./AutoScrollableFrame";

const LayoutHorizontal = React.memo(({ setScrollableRef }) => {
  const [mossMessages, setMossMessages] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const [lastDataTimestamp, setLastDataTimestamp] = useState(Date.now());
  const [lastSent, setLastSent] = useState(() => {
    return localStorage.getItem("lastSent") || new Date().toISOString();
  });

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
          height='400px'
          width='900px'
          position={{ top: 60, left: 30 }}
          innerTop={20}
          innerLeft={20}
          innerWidth='45%'
          innerHeight='73%'
        >
          <ChartContainer sensorData={sensorData} />
        </Frame>
        <Frame
          index={1}
          height='400px'
          width='400px'
          position={{ bottom: 40, left: 60 }}
          innerTop={35}
          innerLeft={60}
          innerWidth={224}
          innerHeight='85%'
        >
          <MossInteraction />
        </Frame>
        <Frame
          index={2}
          height='550px'
          width='850px'
          position={{
            top: 100,
            left: 535,
          }}
          innerTop={90}
          innerLeft={85}
          innerWidth='61%'
          innerHeight='66%'
        >
          <MossMessages mossMessages={mossMessages} isOnline={isOnline} />
        </Frame>
        <Frame
          index={3}
          height='300px'
          width='600px'
          position={{
            bottom: 48,
            left: 500,
          }}
          innerTop={89}
          innerLeft={240}
          innerWidth={220}
          innerHeight={170}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              overflowX: "scroll",
            }}
          >
            <img
              src={centergif}
              style={{ height: "100%", width: "auto" }}
              alt='Scrollable content'
            />
          </div>
          <Audio />
        </Frame>
        <Frame
          index={4}
          height='550px'
          width='440px'
          position={{
            top: 40,
            right: 60,
          }}
          innerTop={40}
          innerLeft={100}
          innerWidth={305}
          innerHeight={410}
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
                fontSize: 20,
                fontWeight: "bold",
                paddingBottom: 0,
              }}
            >
              About
            </p>
            <p
              style={{
                color: "white",
                fontSize: 20,
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
          height='400px'
          width='600px'
          position={{
            bottom: 34,
            right: 0,
          }}
          innerTop={142}
          innerLeft={198}
          innerWidth={300}
          innerHeight={230}
        >
          <AutoScrollableFrame />
        </Frame>
        <div
          style={{
            position: "absolute",
            top: 0,
            height: "100vh",
            width: "100vw",
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
            position: "absolute",
            top: 0,
            right: 230,
          }}
        >
          <img
            src={mahci}
            style={{
              height: "100vh",
            }}
            alt='mahci'
          />
        </div>
      </div>
    </div>
  );
});

export default LayoutHorizontal;
