import type { Metadata } from "next";
import { ThemeRegistry } from "../@core/theme/ThemeRegistry";
import "./globals.css";
import QueryClientProvider from "../../providers/ReactQueryProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";
import AuthSessionProvider from "@/contexts/next-auth-session";

export const metadata: Metadata = {
  title: "TBO",
  description: "Talent Management Application Website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <AuthSessionProvider session={session}>
        <QueryClientProvider>
          <ThemeRegistry>
            <body>{children}</body>
          </ThemeRegistry>
        </QueryClientProvider>
      </AuthSessionProvider>
    </html>
  );
}
