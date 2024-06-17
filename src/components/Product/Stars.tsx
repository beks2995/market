import { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";

type StarsProps = {
  setRating: React.Dispatch<React.SetStateAction<number>>;
};

function Stars({ setRating }: StarsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [rating, setLocalRating] = useState<number>(0);

  const handleClick = (index: number) => {
    setLocalRating(index + 1);
    setRating(index + 1);
  };

  return (
    <div className="flex w-full gap-2">
      {Array.from({ length: 5 }, () => 0).map((_, idx) => (
        <StarIcon
          key={idx}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => handleClick(idx)}
          className={`h-7 ${
            idx <= (hoveredIndex ?? rating - 1)
              ? "text-amber-400"
              : "text-gray-600"
          } hover:text-amber-400 cursor-pointer`}
        />
      ))}
    </div>
  );
}

export default Stars;
