"use client";
import { useEffect, useLayoutEffect, useState } from "react";

const apologyMessages = [
  "I'm really sorry for my behavior...",
  "Please forgive me, I didn't mean to hurt you...",
  "You mean everything to me, please accept my apology...",
  "I promise to be more thoughtful, please give me another chance...",
  "I'm your loving husband, can we start fresh?...",
  "I'll keep apologizing until you forgive me...",
];

const apoloyEmojis = ["😔", "😢", "😭", "😓", "💕", "🥺"];

export default function ApologyApp() {
  const [stage, setStage] = useState(0);
  const [rejections, setRejections] = useState(0);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const generateRandomPosition = () => ({
    x: Math.floor(Math.random() * (window.innerWidth - 200)),
    y: Math.floor(Math.random() * (window.innerHeight - 100)),
  });

  const handleAccept = () => setStage(6); // Thank you page
  const handleReject = () => {
    if (rejections >= 5) return; // Stop after 5 rejections
    setRejections((prev) => prev + 1);
    setStage((prev) => (prev < 5 ? prev + 1 : prev)); // Increment stage up to 5
  };

  useEffect(() => {
    if (width > 600) return;
    if (stage === 5) {
      const interval = setInterval(() => {
        setButtonPosition(generateRandomPosition());
      }, 500);
      return () => clearInterval(interval);
    }
  }, [stage, width]);

  // Thank you page
  if (stage === 6) {
    return (
      <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center">
        <p className="text-red-600 text-9xl py-4">💖</p>
        <h1 className="text-4xl text-red-600 font-bold">Thank you, my love!</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-100 flex flex-col items-center justify-center p-8">
      <p className="text-red-600 text-9xl py-4">{apoloyEmojis[stage]}</p>
      <h1 className="text-3xl text-red-600 mb-8 text-center">
        {apologyMessages[stage]}
      </h1>

      <div className="flex gap-4 mt-8 relative">
        <button
          onClick={handleAccept}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full text-lg "
        >
          Yes, I forgive you 💖
        </button>

        <div className="relative">
          <button
            onClick={handleReject}
            onMouseEnter={() => {
              if (rejections >= 5) {
                setButtonPosition(generateRandomPosition());
              }
            }}
            className={`bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full text-lg ${
              rejections >= 5 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            style={{
              position: rejections >= 5 ? "fixed" : "static",
              left: rejections >= 5 ? `${buttonPosition.x}px` : "auto",
              top: rejections >= 5 ? `${buttonPosition.y}px` : "auto",
              transform: rejections >= 5 ? "translate(0, 0)" : "none",
              transition: "none",
            }}
          >
            {rejections >= 5 ? "Can't click! 😜" : "No, I'm still upset"}
          </button>
        </div>
      </div>

      {rejections >= 5 && (
        <p className="mt-8 text-red-500 text-xl animate-bounce">
          You have to forgive me now! 😉
        </p>
      )}
    </div>
  );
}
