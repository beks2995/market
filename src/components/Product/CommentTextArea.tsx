import React, { useState, useEffect, useRef } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import Button from "../../components/Product/Button";
import { CommentTextAreaProps } from "./types";



function CommentTextArea({ setComments }: CommentTextAreaProps) {
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

  const addNewCommentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setComments((currentComments) => [
      ...(currentComments ?? []),
      { username: "Аделя", comment: text },
    ]);
    setText("");
  };

  return (
    <form className="flex flex-col items-start md:flex-row gap-7" onSubmit={addNewCommentHandler}>
      <div className="flex w-full p-4 bg-light-300 rounded-2xl grow">
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
      <Button type="submit" classes="mb-4 md:w-[200px] w-full p-3">Отправить</Button>
    </form>
  );
}

export default CommentTextArea;
