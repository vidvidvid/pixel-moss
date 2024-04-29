import React, { useEffect, useRef } from "react";

const MossMessages = ({ mossMessages, isOnline }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [mossMessages]);

  return (
    <div
      style={{
        width: "80%",
        height: "80%",
        position: "relative",
        overflowY: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -5,
          left: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 0",
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
      </div>
      <div
        style={{
          position: "absolute",
          top: -10,
          right: 20,
          fontSize: 12,
          color: "#C6A4FF",
        }}
        className='text-green ibm-font'
      >
        <p>Status: {isOnline ? "Online" : "Offline"}</p>
      </div>
      <div
        style={{
          position: "absolute",
          top: "80px",
          bottom: 0,
          left: 0,
          right: 0,
          overflowY: "scroll",
          maskImage:
            "linear-gradient(to bottom, transparent, black 20px, black calc(100% - 20px), transparent 100%)",
        }}
      >
        <div style={{ padding: "0 10px" }}>
          {mossMessages.map((message, index) => (
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
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default MossMessages;
