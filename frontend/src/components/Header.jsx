export default function Header({ className, children }) {
  return <header className={`w-full ${className}`}>{children}</header>;
}
