import React, { useState, useEffect, useRef } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import Button from "../../components/Product/Button";
import { CommentTextAreaProps } from "./types";
import { db } from "../../firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import { useParams } from "react-router-dom";
import Stars from "./Stars";

function CommentTextArea({ setComments, username }: CommentTextAreaProps) {
  const [text, setText] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { id } = useParams();

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

  const addNewCommentHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const newReview = {
        comment: text,
        rating: rating,
        username: username,
      };
      
      await addDoc(collection(db, `items/${id}/reviews/`), newReview);

      setText("");
      setRating(0);
      setComments((prevComments) =>
        prevComments ? [...prevComments, newReview] : [newReview]
      );
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form
      className="flex flex-col items-start md:flex-row gap-7"
      onSubmit={addNewCommentHandler}
    >
      <input
        type="number"
        className="w-full bg-blue-200"
        onChange={(e) => setRating(+e.target.value)}
        value={rating}
        hidden
      />
      <Stars setRating={setRating}/>
      <div className="flex w-full p-4 md:w-auto md:grow bg-light-300 rounded-2xl">
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
      <Button type="submit" classes="mb-4 md:w-[200px] w-full p-3">
        Отправить
      </Button>
    </form>
  );
}

export default CommentTextArea;
