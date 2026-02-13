import { notFound } from "next/navigation";
import { ResultDisplay } from "@/components/ResultDisplay";
import { FaHeart } from "react-icons/fa";

interface PageProps {
  params: Promise<{
    data: string;
  }>;
}

export default async function SharedResultPage({ params }: PageProps) {
  try {
    const { data: encodedData } = await params;
    
    // Convert URL-safe base64 back to standard base64
    let base64 = encodedData
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    
    // Add padding if needed
    while (base64.length % 4) {
      base64 += '=';
    }
    
    // Decode the base64 data
    const decoded = Buffer.from(base64, "base64").toString("utf-8");
    const data = JSON.parse(decoded);

    // Validate the data structure
    if (!data.user || !data.compatibility) {
      console.error("Invalid data structure:", data);
      notFound();
    }

    return (
      <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black">
        <div className="container mx-auto max-w-4xl py-6 md:py-8 px-4">
          <ResultDisplay
            user={data.user}
            compatibility={data.compatibility}
            isSharedView={true}
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
  } catch (error) {
    console.error("Error decoding share data:", error);
    notFound();
  }
}
