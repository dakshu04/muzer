"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Play, Share2 } from "lucide-react";
import axios from "axios"

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  upvotes: number;
  downvotes: number;
  link: string;
}

const REFERESH_INTERVAL_MS = 10 * 1000

export default function SongVotingQueue() {
  const [inputLink, setInputLink] = useState("");
  const [queue, setQueue] = useState<Video[]>([
    {
      id: "1",
      title: "Awesome Song 1",
      thumbnail: "https://img.youtube.com/vi/ScMzIvxBSi4/0.jpg",
      upvotes: 5,
      downvotes: 1,
      link: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    },
    {
      id: "2",
      title: "Cool Music Video",
      thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/0.jpg",
      upvotes: 3,
      downvotes: 0,
      link: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
    },
    {
      id: "3",
      title: "Top Hit 2023",
      thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/0.jpg",
      upvotes: 2,
      downvotes: 1,
      link: "https://www.youtube.com/watch?v=9bZkp7q19f0",
    },
  ]);

  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  function refreshStreams() {
    const res = axios.get(`/api/streams/my`, {
        withCredentials: true
    })
    console.log(res)
  }
  useEffect(() => {
    refreshStreams();
    const interval = setInterval(() => {

    }, REFERESH_INTERVAL_MS)
  }, [])

  const getYoutubeId = (url: string) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = getYoutubeId(inputLink);
    if (!id) return;

    const newVideo: Video = {
      id: String(queue.length + 1),
      title: `New Song ${queue.length + 1}`,
      thumbnail: `https://img.youtube.com/vi/${id}/0.jpg`,
      upvotes: 0,
      downvotes: 0,
      link: inputLink,
    };

    setQueue([...queue, newVideo]);
    setInputLink("");
  };

  const handleVote = (id: string, isUpvote: boolean) => {
    setQueue(queue.map(video => video.id === id ? {
      ...video,
      upvotes: isUpvote ? video.upvotes + 1 : video.upvotes,
    }
    : video
    ).sort((a, b) => b.upvotes - a.upvotes))
        fetch("/api/streams/upvote", {
          method: "POST",
          body: JSON.stringify({
              streamId: id
            })
        })
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Song Voting Queue</h1>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          <Share2 className="h-4 w-4 mr-2" /> Share
        </Button>
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-2 max-w-5xl mx-auto mb-6"
      >
        <Input
          placeholder="Paste YouTube link here"
          value={inputLink}
          onChange={(e) => setInputLink(e.target.value)}
          className="bg-gray-900 border-gray-800 text-white"
        />
        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
          Add to Queue
        </Button>
      </form>
   
      {/* Now Playing */}
      <h2 className="text-xl font-semibold mb-2">Now Playing</h2>
      <Card className="bg-gray-900 border-gray-800 mb-4">
        <CardContent className="p-6 flex flex-col items-center justify-center text-gray-400">
          {currentVideo ? (
            <>
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${getYoutubeId(
                  currentVideo.link
                )}`}
                title={currentVideo.title}
                allowFullScreen
                className="rounded-lg"
              />
              <h3 className="text-lg mt-3 text-white">{currentVideo.title}</h3>
            </>
          ) : (
            <p>No video playing</p>
          )}
        </CardContent>
      </Card>

      <Button
        onClick={() => {
          if (queue.length > 0) {
            setCurrentVideo(queue[0]);
            setQueue(queue.slice(1));
          }
        }}
        className="w-full mb-6 bg-purple-600 hover:bg-purple-700"
      >
        <Play className="h-4 w-4 mr-2" /> Play Next
      </Button>

      {/* Upcoming Songs */}
      <h2 className="text-xl font-semibold mb-3">Upcoming Songs</h2>
      <div className="space-y-3">
        {queue.map((video) => (
          <Card
            key={video.id}
            className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition"
          >
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-20 h-14 rounded-md object-cover"
                />
                <span className="font-medium text-white">{video.title}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleVote(video.id, true)}
                  className="flex items-center space-x-1 bg-gray-800 text-white border-gray-700"
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>{video.upvotes}</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleVote(video.id, false)}
                  className="flex items-center space-x-1 bg-gray-800 text-white border-gray-700"
                >
                  <ThumbsDown className="h-4 w-4" />
                  <span>{video.downvotes}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
