import UserComment from "./UserComment";
import CommentTextArea from "./CommentTextArea";
import { useEffect, useState } from "react";
import { Comment } from "./types";
import { Review, User } from "../../types/types";
import useAuth from "../../hooks/useAuth";

type CommentSectionProps = {
  reviews: Review[];
  user: User;
};

function CommentSection({ reviews }: CommentSectionProps) {
  const [comments, setComments] = useState<Review[] | null>(
    [...reviews].reverse()
  );
  const user = useAuth();

  return (
    <div>
      <div className="mb-20 space-y-6">
        {comments?.map((c) => (
          <UserComment
            key={c.id}
            username={c.username}
            comment={c.comment}
            rating={c.rating}
          />
        ))}
      </div>
      {user ? (
        <CommentTextArea
          setComments={setComments}
          username={user?.displayName ?? "User"}
        />
      ) : (
        <div>Отзыв мошут оставлять только зарегистрированные пользователи</div>
      )}
    </div>
  );
}

export default CommentSection;
