import React, { useState, useEffect } from "react";

const Audio = React.memo(() => {
  const [songs, setSongs] = useState([
    "atmosfericni_bs.mp3",
    "bff.mp3",
    "GBnote.mp3",
    "Spore.mp3",
  ]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setCurrentSong(`/songs/${songs[currentSongIndex]}`);
  }, [currentSongIndex]);

  useEffect(() => {
    const audioPlayer = document.getElementById("audioPlayer");
    const handleSongEnd = () => {
      const nextSongIndex = (currentSongIndex + 1) % songs.length; // Loop back to the first song after the last one
      setCurrentSongIndex(nextSongIndex);
    };

    audioPlayer.addEventListener("ended", handleSongEnd);

    return () => {
      audioPlayer.removeEventListener("ended", handleSongEnd);
    };
  }, [currentSongIndex, songs]);

  const togglePlayPause = () => {
    const audioPlayer = document.getElementById("audioPlayer");
    if (audioPlayer.paused) {
      audioPlayer.play();
      setIsPlaying(true);
    } else {
      audioPlayer.pause();
      setIsPlaying(false);
    }
  };

  const getSongTitle = () => {
    return songs[currentSongIndex].replace(".mp3", "");
  };

  const songTitle = getSongTitle();

  return (
    <div style={{ position: "absolute", left: -300, top: -20, width: 300 }}>
      <div
        className='text-green voxel-font'
        style={{ fontSize: 40, marginBottom: 10 }}
      >
        Pixel Moss
      </div>
      <div style={{ marginTop: 24, marginLeft: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
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
          <p className='voxel-font' style={{ color: "rgb(198, 164, 255)" }}>
            Listening to
          </p>
        </div>
        <audio id='audioPlayer' style={{ display: "none" }} src={currentSong} />
        <div style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
          <div
            style={{
              display: "inline-block",
              paddingLeft: "100%",
              animation: "scroll 15s linear infinite",
              color: "white",
            }}
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
