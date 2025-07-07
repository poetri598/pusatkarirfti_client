import "@/styles/globals.css";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <section className="w-full min-h-screen flex flex-col bg-background-primary">{children}</section>;
}
