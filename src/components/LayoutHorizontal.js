import React, { useState, useEffect, useRef } from "react";
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

const LayoutHorizontal = React.memo(
  ({ audioPlayerRef, isPlaying, togglePlayPause }) => {
    const [mossMessages, setMossMessages] = useState([]);
    const [isOnline, setIsOnline] = useState(false);
    const [lastDataTimestamp, setLastDataTimestamp] = useState(Date.now());
    const [sensorData, setSensorData] = useState([]);
    
    // Use refs to access current values in interval
    const sensorDataRef = useRef(sensorData);
    const isOnlineRef = useRef(isOnline);
    
    useEffect(() => {
      sensorDataRef.current = sensorData;
    }, [sensorData]);
    
    useEffect(() => {
      isOnlineRef.current = isOnline;
    }, [isOnline]);

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

    const database = getDatabase(app);
    console.log("database", database);


    useEffect(() => {
      try {
        const db = getDatabase(app);
        console.log("Initializing database connection...", db);

        if (!db) {
          console.error("Failed to initialize database");
          return;
        }

        const unsubscribe = subscribeToSensorData(db, (data) => {
          console.log("Sensor data callback received:", data);
          setSensorData(data);

          if (data.length > 0) {
            const lastData = data[data.length - 1];
            const timestamp = Date.parse(lastData.timestamp);
            console.log("Setting last data timestamp:", timestamp);
            setLastDataTimestamp(timestamp);
          }
        });

        return () => {
          console.log("Cleaning up sensor data subscription...");
          unsubscribe();
        };
      } catch (error) {
        console.error("Error in sensor data useEffect:", error);
      }
    }, []);

    useEffect(() => {
      try {
        const db = getDatabase(app);
        console.log("Initializing messages database connection...", db);

        if (!db) {
          console.error("Failed to initialize database for messages");
          return;
        }

        const unsubscribe = subscribeToMossMessages(db, (messages) => {
          console.log("Messages callback received:", messages);
          setMossMessages(messages);
        });

        return () => {
          console.log("Cleaning up messages subscription...");
          unsubscribe();
        };
      } catch (error) {
        console.error("Error in messages useEffect:", error);
      }
    }, []);

    useEffect(() => {
      const interval = setInterval(() => {
        const now = Date.now();
        const timeSinceLastData = now - lastDataTimestamp;
        const fortyFiveSeconds = 45000;
        if (timeSinceLastData > fortyFiveSeconds) {
          setIsOnline(false);
        } else {
          setIsOnline(true);
        }
      }, 1000);

      return () => clearInterval(interval);
    }, [lastDataTimestamp]);

    useEffect(() => {
      const interval = setInterval(() => {
        const now = new Date();
        const storedLastSent = localStorage.getItem("lastSent");
        const lastSentTime = new Date(storedLastSent || new Date().toISOString());
        const oneHour = 1000 * 60 * 60; // milliseconds in an hour

        console.log('[AUTO CHECK]', {
          timeSinceLast: (now - lastSentTime) / 1000 + 's',
          needsToSend: now - lastSentTime >= oneHour,
          isOnline: isOnlineRef.current
        });

        if (now - lastSentTime >= oneHour && isOnlineRef.current) {
          sendToChatGPT(sensorDataRef.current);
          const newTimestamp = now.toISOString();
          localStorage.setItem("lastSent", newTimestamp);
        }
      }, 1000 * 60 * 5); // Check every 5 minutes whether it's time to send a new message

      return () => clearInterval(interval);
    }, []);

    function sendToChatGPT(sensorData, forceSend = false) {
      console.log(forceSend ? '[FORCE SEND]' : '[AUTO SEND]', 'Starting blog message send...', {
        sensorDataLength: sensorData?.length,
        apiKeyPresent: !!process.env.REACT_APP_OPENAI_API_KEY,
        apiKeyLength: process.env.REACT_APP_OPENAI_API_KEY?.length,
        timestamp: new Date().toISOString()
      });
      
      if (!process.env.REACT_APP_OPENAI_API_KEY) {
        console.error('[SEND ERROR] No OpenAI API key found!');
        alert('No OpenAI API key found! Please set REACT_APP_OPENAI_API_KEY in environment variables.');
        return;
      }
      
      const message = formPrompt(sensorData); // Assuming this returns an array of messages
      console.log('[SEND] Prompt generated:', message.substring(0, 200) + '...');
      
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
          console.log('[SEND SUCCESS] ChatGPT response received:', response.data);
          writeMossMessage(database, {
            message: response.data.choices[0].message.content,
            timestamp: new Date().toISOString(),
          });
        })
        .catch((error) => {
          console.error("[SEND ERROR] Failed to send data to ChatGPT:", error);
          console.error('[SEND ERROR] Details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            apiKeyPresent: !!process.env.REACT_APP_OPENAI_API_KEY
          });
          alert(`Failed to send blog message: ${error.message}`);
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
            isOverflowVisible
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
              top: 120,
              left: 535,
            }}
            innerTop={66}
            innerLeft={85}
            innerWidth='61%'
            innerHeight='74%'
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
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={centergif}
                style={{ width: "100%", height: "auto" }}
                alt='Scrollable content'
              />
            </div>
          </Frame>
          <Audio
            audioPlayerRef={audioPlayerRef}
            isPlaying={isPlaying}
            togglePlayPause={togglePlayPause}
          />
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
  }
);

export default LayoutHorizontal;
