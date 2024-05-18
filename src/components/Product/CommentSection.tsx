import Comment from "./Comment";
import CommentTextArea from "./CommentTextArea";

function CommentSection() {
  
  return (
    <div>
      <div className="mb-20 space-y-6">
        <Comment
          username="Бекназар"
          comment="Спасибо большое! Держатель супер! Легко установил красивый дизайн.Самое главное, что заряжает мой телефон"
        />
        <Comment
          username="Буран"
          comment="Коробка была немного повреждена но держатель не пострадал. Очень хороший держатель 
          для тех кто часто снимает телефон. Покупаю второй для работы. "
        />
      </div>
      <CommentTextArea/>
    </div>
  );
}

export default CommentSection;
