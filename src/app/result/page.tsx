import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { calculateCompatibility } from "@/lib/compatibility";
import { sendDiscordWebhook } from "@/lib/discord-webhook";
import { ResultDisplay } from "@/components/ResultDisplay";
import { FaHeart } from "react-icons/fa";

export default async function ResultPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const compatibility = calculateCompatibility(session.user.id!);

  // Send webhook notification (non-blocking)
  sendDiscordWebhook({
    userId: session.user.id!,
    userName: session.user.name || "Unknown User",
    userImage: session.user.image || undefined,
    compatibility,
  }).catch(() => {
    // Silently ignore webhook errors
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black">
      <div className="container mx-auto max-w-4xl py-6 md:py-8 px-4">
        <ResultDisplay
          user={{
            id: session.user.id!,
            name: session.user.name || "Unknown User",
            image: session.user.image || undefined,
          }}
          compatibility={compatibility}
        />
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-400 text-xs md:text-sm px-4">
        <p className="flex items-center justify-center gap-2 flex-wrap">Kindly Fuck Off <FaHeart className="text-pink-500" /> by KayTwenty • Not affiliated with Discord</p>
        <p className="mt-2">
          For entertainment purposes only. Results are randomly generated and
          mean absolutely nothing.
        </p>
      </footer>
    </div>
  );
}
