import fullLogo from "@/assets/garagepro-logo.png.asset.json";
import markLogo from "@/assets/garagepro-mark.png.asset.json";

interface LogoProps {
  className?: string;
  showText?: boolean;
  /** Invert for dark backgrounds (renders logo in white via CSS filter). */
  invert?: boolean;
  /** Ignored — kept for backwards compatibility with existing call sites. */
  textClassName?: string;
}

const Logo = ({ className = "", showText = true, invert = false }: LogoProps) => {
  const filterStyle = invert ? { filter: "invert(1) brightness(2)" } : undefined;
  const src = showText ? fullLogo.url : markLogo.url;

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={src}
        alt="GaragePro"
        style={filterStyle}
        className={showText ? "h-12 md:h-14 w-auto" : "h-12 w-12"}
      />
    </div>
  );
};

export default Logo;