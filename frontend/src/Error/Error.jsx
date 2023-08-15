export default function Error({ msg, className }) {
  return <div className={`text-xs text-error ${className}`}>{msg}</div>;
}
