import UserComment from "./UserComment";
import CommentTextArea from "./CommentTextArea";
import { useEffect, useState } from "react";
import {Comment} from "./types"


function CommentSection() {
  const [comments, setComments] = useState<Comment[] | null>(null);

  useEffect(() => {
    setComments([
      {
        username: "Бекназар",
        comment:
          "Спасибо большое! Держатель супер! Легко установил красивый дизайн.Самое главное, что заряжает мой телефон",
      },
      {
        username: "Буран",
        comment:
          "Коробка была немного повреждена но держатель не пострадал. Очень хороший держатель для тех кто часто снимает телефон. Покупаю второй для работы. ",
      },
    ]);
  }, []);

  return (
    <div>
      <div className="mb-20 space-y-6">
        {comments?.map((c) => (
          <UserComment username={c.username} comment={c.comment} />
        ))}
      </div>
      <CommentTextArea setComments={setComments}/>
    </div>
  );
}

export default CommentSection;
