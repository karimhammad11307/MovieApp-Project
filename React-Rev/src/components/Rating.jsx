import React from "react";
import { useState } from "react";


const Rating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="mb-8">
      <h3 className="text-light-100 font-bold text-lg mb-2">
        Rate this movie: 
      </h3>
      <div className="flex items-center gap-1">
        {/* create an array of 5 items to map over / 5 stars */}
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <button
              key={index}
              type="button"
              className="focus:outline-none
                    transition-transform hover:scale-110"
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setRating(rating)}
            >
              {/* stars icons */}
              <svg
                className={`w-8 h-8 transition-colors duration-200 ${
                  // Logic: If the star's value is less than or equal to the (hover OR current rating), make it yellow.
                  starValue <= (hover || rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-600 fill-transparent stroke-gray-500"
                }`}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </button>
          );
        })}
        {/* desc text */}
            <span className="text-gray-400 text-sm ml-3 font-medium">
                {rating > 0 ? `You rated: ${rating}/5` : "Slide stars to rate"} 
            </span>
      </div>
    </div>
  );
};

export default Rating;
