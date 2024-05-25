import UserComment from "./UserComment";
import CommentTextArea from "./CommentTextArea";
import { useEffect, useState } from "react";
import {Comment} from "./types"
import {Review} from "../../types/types"

type CommentSectionProps = {
  reviews: Review[];
};

function CommentSection({reviews}:CommentSectionProps) {
  const [comments, setComments] = useState<Comment[] | null>(null);

  return (
    <div>
      <div className="mb-20 space-y-6">
        {reviews?.map((c) => (
          <UserComment key={c.id} username={c.username} comment={c.comment} />
        ))}
      </div>
      <CommentTextArea setComments={setComments}/>
    </div>
  );
}

export default CommentSection;
