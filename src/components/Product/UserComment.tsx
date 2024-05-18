import React from "react";
import { CommentProps } from "./types";


function UserComment({ username, comment }: CommentProps) {
  return (
    <div>
      <p className="mb-4 text-lg font-semibold">{username}</p>
      <p className="text-sm font-medium">{comment}</p>
    </div>
  );
}

export default UserComment;
