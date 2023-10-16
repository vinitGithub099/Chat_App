export default function UserAvatar({ className, imgSrc, altText, config }) {
  const buildClassName = (config) => {
    let defaultClassName = "";
    if (config == "xs") {
      defaultClassName += "w-5 h-5";
    } else if (config == "s") {
      defaultClassName += "w-8 h-8";
    } else if (config == "m") {
      defaultClassName += "w-12 h-12";
    } else if (config == "l") {
      defaultClassName += "w-16 h-16";
    } else {
      defaultClassName += "w-5 h-5";
    }
    return defaultClassName;
  };
  return (
    <div className={`${className}`}>
      <img
        className={`mx-auto ${buildClassName(config)}`}
        src={imgSrc}
        alt={altText}
      ></img>
    </div>
  );
}
