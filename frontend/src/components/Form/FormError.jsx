export default function FormError({ className, message }) {
  return <div className={`w-full ${className}`}>{message}</div>;
}
