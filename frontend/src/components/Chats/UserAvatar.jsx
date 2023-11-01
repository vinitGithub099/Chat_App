export default function UserAvatar({ imgSrc, className, altText, config }) {
  const buildClassName = (config) => {
    let defaultClassName = "flex justify-center items-center ";
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
    defaultClassName += className;
    return defaultClassName;
  };
  return (
    <div className={buildClassName(config)}>
      <img
        className={`mx-auto border border-light-1 flex flex-1 bg-light-1 rounded-full`}
        src={imgSrc}
        alt={altText}
      ></img>
    </div>
  );
}
