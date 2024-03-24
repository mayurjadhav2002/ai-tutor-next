import AppStore from "@/app/userContext";

export const metadata = {
  title: "AITutor",
  description: "AI for your Leetcode"
};





export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppStore>

        {children}
        </AppStore>
      </body>
    </html>
  );
}
