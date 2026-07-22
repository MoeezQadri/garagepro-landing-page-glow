interface LogoProps {
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

const Logo = ({ className = "", showText = true, textClassName = "" }: LogoProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-10 h-10 rounded-full border-2 border-current flex items-center justify-center">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 9C14 7 12 12 10 15C8 18 6 15 6 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" fill="none" />
          <path d="M12 12V21" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" fill="none" />
        </svg>
      </div>
      {showText && (
        <span className={`text-xl font-bold tracking-wide ${textClassName}`}>GARAGEPRO</span>
      )}
    </div>
  );
};

export default Logo;