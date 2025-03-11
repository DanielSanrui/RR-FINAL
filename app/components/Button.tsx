import { useNavigate } from "react-router-dom";

type Variant = "album" | "artist" | "favorites";

interface ButtonProps {
  text: string;
  variant: Variant;
  onClick?: () => void; // Propiedad onClick opcional
}

const variants: Record<Variant, string> = {
  album: "flex items-center gap-1 bg-green-400 text-green-400 hover: text-white transition duration-200",
  artist: "flex items-center gap-1 bg-green-400 text-green-400 hover: text-white transition duration-200",
  favorites: "flex items-center gap-1 bg-green-400 text-green-400 hover: text-white transition duration-200",
};

function Button({ text, variant, onClick }: ButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (variant === "album") {
      navigate("/album"); // Navega a /album
    } else if (variant === "artist") {
      navigate("/artist"); // Navega a /artist
    }
    // No navegamos si el variant es "favorites"

    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`${variants[variant]} text-white font-bold py-2 px-4 rounded cursor-pointer`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

export default Button;