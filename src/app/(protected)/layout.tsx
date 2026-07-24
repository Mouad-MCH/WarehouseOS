import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface lg:flex-row">
      <Sidebar userName={session.user.name} />
      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar userName={session.user.name} userEmail={session.user.email} />
        <main className="flex-1 px-4 py-6 sm:px-6">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
