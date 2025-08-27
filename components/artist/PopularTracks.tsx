import { Track } from "@/types/Track";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import PlaylistTrack from "../library/PlaylistTrack";
import { getAlbumById, getArtistById } from "@/api/musicApi";
import { usePlayer } from "@/context/PlayerContext";

interface PopularTracksProps {
    tracks: Track[];
  }
  
export default function PopularTracks({ tracks}: PopularTracksProps) {
    const [albums, setAlbums] = useState<Record<string, string>>({});
    const [artists, setArtists] = useState<Record<string, string>>({});
    const [albumCovers, setAlbumCovers] = useState<Record<string, string>>({});
      const artistIds = tracks.map(track => track.artist.id);
      const albumIds = tracks.map(track => track.album.id);
      useEffect(() => {
        if (tracks) {
          fetchAlbumCovers();
          fetchAlbumNames();
          fetchArtistsNames();
        }
      }, [tracks]);
    const fetchAlbumCovers = async () => {
        const albumMap: Record<string, string> = {};
    
        const requests = albumIds.map(async (id) => {
          try {
            const album = await getAlbumById(id);
            albumMap[id] = album.cover.url;
          } catch (error) {
            console.error("Error", id, error);
            albumMap[id] = "Невідомий альбом";
          }
        });
    
        await Promise.all(requests);
        setAlbumCovers(albumMap);
      };
      const fetchArtistsNames = async () => {
        const artistMap: Record<string, string> = {};
    
        const requests = artistIds.map(async (id) => {
          try {
            const artist = await getArtistById(id);
            artistMap[id] = artist.user.username;
          } catch (error) {
            console.error("Error", id, error);
            artistMap[id] = "Невідомий артист";
          }
        });
    
        await Promise.all(requests);
        setArtists(artistMap);
      };
      const fetchAlbumNames = async () => {
        const albumMap: Record<string, string> = {};
    
        const requests = albumIds.map(async (id) => {
          try {
            const album = await getAlbumById(id);
            albumMap[id] = album.name;
          } catch (error) {
            console.error("Error", id, error);
            albumMap[id] = "Невідомий альбом";
          }
        });
    
        await Promise.all(requests);
        setAlbums(albumMap);
      };
      const { setTrack } = usePlayer();
      const handleTrackClick = async (track: Track) => {
        try {
          await setTrack(track);
          console.log("Playing:", track.name);
        } catch (e) {
          console.error("Error setting track:", e);
        }
      };


  return (
    <View>
      <Text style={styles.popularTitle}>Популярні треки</Text>
      {tracks?.map((track) => (
          <PlaylistTrack
            key={track.id}
            cover={{ uri: albumCovers[track.album.id]}}
            title={track.name}
            artist={artists[track.artist.id] || "Невідомий артист"}
            albumName={albums[track.album.id] || "Невідомий альбом"}
            releaseDate={track.playsNumber}
            duration={`${Math.floor(track.duration / 60)}:${(
              track.duration % 60
            )
              .toString()
              .padStart(2, "0")}`}
            onClick={() => handleTrackClick(track)}
          />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  popularTitle:{
    color:'rgba(191, 237, 253, 1)',
    fontFamily: "Inter-Bold",
    fontSize: 20,
    marginTop:15
  }
});
