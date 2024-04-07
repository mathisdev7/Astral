"use client";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import * as React from "react";
import io from "socket.io-client";
const socket = io("http://localhost:3001");
export default function Astrals({
  astrals,
  users,
  likes,
  dislikes,
  session,
}: {
  astrals: any[];
  users: any[];
  likes: any[];
  dislikes: any[];
  session: any;
}) {
  const [likesStates, setLikesStates] = React.useState(likes);
  const [dislikesStates, setDislikesStates] = React.useState(dislikes);
  const like = (astralId: string) => {
    socket.emit("like add", { astralId }, session);
    socket.on("like added", (likeData, dislikeData) => {
      setLikesStates([...likesStates, likeData]);
      if (dislikeData) {
        setDislikesStates(
          dislikesStates.filter((dislike) => dislike.id !== dislikeData.id)
        );
      }
    });
  };

  const dislike = (astralId: string) => {
    socket.emit("dislike add", { astralId }, session);
    socket.on("dislike added", (dislikeData, likeData) => {
      setDislikesStates([...dislikesStates, dislikeData]);
      if (likeData) {
        setLikesStates(likesStates.filter((like) => like.id !== likeData.id));
      }
    });
  };
  return (
    <div className="absolute top-32 w-80 flex-col justify-center items-center">
      {astrals.map((post: any) => (
        <React.Fragment key={`${post.id}-fragment`}>
          <div key={`${post.id}`} className="flex space-x-4 mb-4">
            <img
              className="w-12 h-12 rounded-full"
              src={
                "https://images-ext-1.discordapp.net/external/nNNWimCSVvA-DSKClRKmm7QNYZrIkCvaxM8Z8pIl2nQ/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/548028946097111045/6ca5a8e7e5c3cada1ce75c8b400b4896.webp?format=webp&width=500&height=500"
              }
              alt="User Avatar"
            />
            <div key={`${post.id}-user`} className="flex flex-col">
              <span className="font-bold">
                {users.find((user: any) => user.id === post.authorId)?.username}
              </span>
              <span className="text-gray-500">
                @
                {users.find((user: any) => user.id === post.authorId)?.username}
              </span>
            </div>
          </div>
          <p className="text-lg text-start">{post.text}</p>
          <div
            key={`${post.id}-astral`}
            className="flex items-center space-x-4 mt-4"
          >
            <button className="flex items-center space-x-2">
              <ThumbsUp size={20} onClick={() => like(post.id)} />
              <span>
                {likesStates.map((like) => like.astralId === post.id)?.length ||
                  0}
              </span>
            </button>
            <button className="flex items-center space-x-2">
              <ThumbsDown size={20} onClick={() => dislike(post.id)} />
              <span>
                {dislikesStates.map((dislike) => dislike.astralId === post.id)
                  ?.length || 0}
              </span>
            </button>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
