import React, { useState, useEffect, useRef, useMemo } from "react";
import listeningto from "../assets/listeningto.svg";

const AudioVertical = React.memo(() => {
  const songs = useMemo(
    () => ["atmosfericni_bs.mp3", "Spore.mp3", "bff.mp3", "GBnote.mp3"],
    []
  );
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayerRef = useRef(null);

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
  }, [currentSongIndex, songs.length]);

  useEffect(() => {
    const audioPlayer = audioPlayerRef.current;
    if (audioPlayer) {
      audioPlayer.play().catch((error) => console.error("Play failed:", error));
    }
  }, [currentSong]);

  const togglePlayPause = () => {
    const audioPlayer = audioPlayerRef.current;
    if (audioPlayer.paused) {
      audioPlayer.play();
      setIsPlaying(true);
    } else {
      audioPlayer.pause();
      setIsPlaying(false);
    }
  };

  const getSongTitle = () => songs[currentSongIndex].replace(".wav", "");

  const songTitle = getSongTitle();

  return (
    <div style={{ position: "absolute", right: 20, top: 74, width: 188 }}>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            zIndex: 1000000,
          }}
        >
          <img
            src={listeningto}
            alt='music'
            style={{ width: 125, marginLeft: 20 }}
          />
        </div>
        <audio
          ref={audioPlayerRef}
          style={{ display: "none" }}
          src={currentSong}
        />
        <div
          style={{
            width: "93%",
            display: "flex",
            justifyContent: "space-between",
            gap: 20,
            paddingTop: 10,
            marginRight: 0,
          }}
        >
          <div
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
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

          {isPlaying ? (
            <img
              src='/icons/pause.svg'
              alt='pause'
              onClick={togglePlayPause}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <img
              src='/icons/play.svg'
              alt='play'
              onClick={togglePlayPause}
              style={{ cursor: "pointer" }}
            />
          )}
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

export default AudioVertical;
