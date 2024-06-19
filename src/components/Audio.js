import React, { useState, useEffect, useMemo } from "react";
import listeningto from "../assets/listeningto.svg";

const Audio = React.memo(({ audioPlayerRef, isPlaying, togglePlayPause }) => {
  const songs = useMemo(
    () => ["atmosfericni_bs.mp3", "Spore.mp3", "bff.mp3", "GBnote.mp3"],
    []
  );
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState("");

  useEffect(() => {
    setCurrentSong(`/songs/${songs[currentSongIndex]}`);
    console.log("Current song set to:", `/songs/${songs[currentSongIndex]}`);
  }, [currentSongIndex, songs]);

  useEffect(() => {
    const audioPlayer = audioPlayerRef.current;

    const handleSongEnd = () => {
      console.log("Song ended. Moving to next.");
      const nextSongIndex = (currentSongIndex + 1) % songs.length;
      setCurrentSongIndex(nextSongIndex);
    };

    if (audioPlayer) {
      audioPlayer.addEventListener("ended", handleSongEnd);
      return () => audioPlayer.removeEventListener("ended", handleSongEnd);
    }
  }, [audioPlayerRef, currentSongIndex, songs.length]);

  const getSongTitle = () => songs[currentSongIndex].replace(".wav", "");

  const songTitle = getSongTitle();

  return (
    <div
      style={{
        position: "absolute",
        left: 446,
        bottom: 149,
        width: 300,
        pointerEvents: "all",
      }}
    >
      <div style={{ marginTop: 75, marginLeft: 100 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 30,
            zIndex: 1000000,
          }}
        >
          {isPlaying ? (
            <img
              src='/icons/pause.svg'
              alt='pause'
              onClick={togglePlayPause}
              className='custom-cursor-hover'
            />
          ) : (
            <img
              src='/icons/play.svg'
              alt='play'
              onClick={togglePlayPause}
              className='custom-cursor-hover'
            />
          )}
          <img src={listeningto} alt='music' style={{ width: 120 }} />
        </div>
        <audio
          ref={audioPlayerRef}
          style={{ display: "none" }}
          src={currentSong}
        />
        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            marginLeft: -36,
            marginTop: 10,
          }}
        >
          <div
            style={{
              display: "inline-block",
              paddingLeft: "100%",
              animation: "scroll 15s linear infinite",
              color: "white",
            }}
            className='voxel-font text-shadow'
          >
            {songTitle} - by Pixel Bambi
          </div>
        </div>
      </div>
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
    </div>
  );
});

export default Audio;
