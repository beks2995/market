import React, { useState, useEffect, useRef } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import Button from "../../components/Product/Button";

function CommentTextArea() {
  const [text, setText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [text]);

  return (
    <div className="flex items-start gap-7">
      <div className="flex p-4 rounded-2xl bg-light-300 grow">
        <textarea
          ref={textareaRef}
          placeholder="Отзыв тут"
          className="w-full font-medium bg-transparent resize-none focus:outline-none text-dark-300"
          value={text}
          onChange={handleChange}
          rows={1}
        ></textarea>
        <PencilIcon className="h-5 ml-3 stroke-2 text-dark-30" />
      </div>
      <Button classes="mb-4 w-[200px]">Купить!</Button>
    </div>
  );
}

export default CommentTextArea;
