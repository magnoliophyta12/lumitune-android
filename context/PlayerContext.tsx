import React, { createContext, useContext, useState, useRef } from "react";
import { Audio } from "expo-av";
import { Track } from "@/types/Track";

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  setTrack: (track: Track) => Promise<void>;
  togglePlayPause: () => Promise<void>;
  soundRef: React.MutableRefObject<Audio.Sound | null>;
  volume: number;
  setVolume: (value: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.25);
  const soundRef = useRef<Audio.Sound | null>(null);

  const unloadCurrentSound = async () => {
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
      soundRef.current.setOnPlaybackStatusUpdate(null);
      soundRef.current = null;
    }
  };

  const setTrack = async (track: Track) => {
    await unloadCurrentSound();
    setCurrentTrack(track);
    const { sound } = await Audio.Sound.createAsync(
      { uri: track.url },
      { shouldPlay: true, volume }
    );
    soundRef.current = sound;
    setIsPlaying(true);
  };

  const togglePlayPause = async () => {
    if (!soundRef.current) return;

    const status = await soundRef.current.getStatusAsync();
    if (status.isLoaded) {
      if (status.isPlaying) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await soundRef.current.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const setVolume = async (value: number) => {
    const newVolume = Math.max(0, Math.min(1, value));
    setVolumeState(newVolume);
    if (soundRef.current) {
      await soundRef.current.setVolumeAsync(newVolume);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        setTrack,
        togglePlayPause,
        soundRef,
        volume,
        setVolume,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayer must be used within PlayerProvider");
  return context;
};