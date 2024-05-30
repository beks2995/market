import { CommentProps } from "./types";
import { StarIcon } from "@heroicons/react/24/solid";


function UserComment({ username, comment, rating }: CommentProps) {
  return (
    <div>
      <p className="flex items-center gap-2 mb-4 text-lg font-semibold">{username}<StarIcon className="w-4 h-4 text-amber-400"/><span>{rating}</span></p>
      <p className="text-sm font-medium">{comment}</p>
    </div>
  );
}

export default UserComment;
