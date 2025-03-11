import { useNavigate } from "react-router-dom";

type Variant = "album" | "artist" | "add" | "remove";

interface ButtonProps {
  text: string;
  variant: Variant;
  onClick?: () => void;
}

const variants: Record<Variant, string> = {
  album: "flex items-center gap-1 bg-green-400 text-green-400 hover:text-white transition duration-200",
  artist: "flex items-center gap-1 bg-green-400 text-green-400 hover:text-white transition duration-200",
  add: "flex items-center gap-1 bg-green-400 text-green-400 hover:text-white transition duration-200",
  remove: "flex items-center gap-1 bg-red-400 text-red-400 hover:text-white transition duration-200",
};

function Button({ text, variant, onClick }: ButtonProps) {
  return (
    <button
      className={`${variants[variant]} text-white font-bold py-2 px-4 rounded cursor-pointer`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;