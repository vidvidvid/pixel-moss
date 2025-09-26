import React from "react";

const MossMessages = ({ mossMessages, isOnline }) => {
  return (
    <div
      style={{
        width: "80%",
        height: "84%",
        position: "relative",
        overflowY: "auto",
      }}
      className='scrollable-div'
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "transparent", // Make background transparent
          padding: "10px 0",
          zIndex: 1, // Ensure these elements stay on top
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 30px",
          }}
        >
          <h4
            className='text-green voxel-font'
            style={{
              fontSize: 20,
            }}
          >
            Pixel Moss shared their status:
          </h4>
          <div
            style={{
              fontSize: 12,
              color: "#C6A4FF",
              marginTop: -40,
            }}
            className='text-green ibm-font'
          >
            <p>Status: {isOnline ? "Online" : "Offline"}</p>
          </div>
        </div>
      </div>

      {/* Scrolling message container */}
      <div
        style={{
          position: "relative",
          bottom: 0,
          left: 0,
          right: 0,
          overflow: "hidden", // Prevent messages from appearing below the sticky bar
        }}
      >
        {[...mossMessages].reverse().map((message, index) => (
          <div key={index}>
            <p
              style={{ color: "white", paddingTop: 40, fontSize: 24 }}
              className='scum-font'
            >
              {message.message}
            </p>
            <p
              style={{ color: "#C6A4FF", fontSize: 14, textAlign: "right" }}
              className='voxel-font'
            >
              {new Date(message.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MossMessages;
