import { auth } from "@/auth";
import { DiscordLoginButton } from "@/components/DiscordLoginButton";
import { Button } from "@/components/Button";
import { FaHeart } from "react-icons/fa";

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black">
      <main className="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16 animate-fade-in">
          <div className="text-5xl md:text-6xl mb-4 md:mb-6 text-pink-500 flex justify-center drop-shadow-[0_0_15px_rgba(236,72,153,0.8)] animate-heartbeat"><FaHeart /></div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-linear-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent mb-4 drop-shadow-lg leading-tight">
            Are You Compatible
            <br />
            with Kay?
          </h1>
          <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto mb-2 px-4">
            Probably not, but let's embarrass you with some bullshit numbers anyway
          </p>
          <p className="text-xs md:text-sm text-gray-500 italic px-4">
            (Spoiler: I'm such a fat fucking chud)
          </p>
        </div>

        {/* CTA Section */}
        <div className="bg-linear-to-br from-gray-900 to-black rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-12 mb-8 md:mb-12 border-2 border-pink-900/50">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-pink-100 mb-4">
              Ready to find out?
            </h2>
            <p className="text-gray-300 mb-8">
              {session
                ? "You're already logged in! Check your compatibility score."
                : "Login with Discord to unlock your personalized compatibility score"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {session ? (
                <Button href="/result" size="lg">
                  <FaHeart /> View My Result
                </Button>
              ) : (
                <DiscordLoginButton />
              )}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-linear-to-br from-gray-900/50 to-black/50 backdrop-blur rounded-2xl p-6 md:p-8 text-center border border-pink-900/30">
          <h3 className="text-xl md:text-2xl font-bold text-pink-100 mb-4">
            FAQ (Not That You'll Like The Answers)
          </h3>
          <div className="text-left max-w-2xl mx-auto space-y-4 text-gray-300">
            <div>
              <p className="font-semibold mb-1">Is this even real?</p>
              <p className="text-sm">
                About as real as your shot at love. It's fake math designed to hurt your feelings.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">Are you stealing my data?</p>
              <p className="text-sm">
                Nah, we just use your Discord ID for the calculation. We don't give enough of a shit to track you.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">Can I retake this to get a better score?</p>
              <p className="text-sm">
                No. Your score is permanent. Cope harder.
              </p>
            </div>
          </div>
        </div>
      </main>

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
