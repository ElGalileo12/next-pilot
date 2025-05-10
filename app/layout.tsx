import { montserrat } from "./ui/fonts";
import { StackProvider, StackTheme, StackClientApp } from "@stackframe/stack";
import { Metadata } from "next";
import "./ui/global.css";

export const metadata: Metadata = {
  title: "Acme Dashboard",
  description: "The official Next.js Course Dashboard, built with App Router.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

const stackClientApp = new StackClientApp({
  projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID!,
  urls: {
    afterSignUp: "/dashboard/profile", 
    afterSignIn: "/dashboard", 
  },
  tokenStore: "nextjs-cookie", 
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <StackProvider app={stackClientApp}>
          <StackTheme>{children}</StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
