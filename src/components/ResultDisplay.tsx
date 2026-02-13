"use client";

import { useState } from "react";
import { Button } from "./Button";
import { MetricCard } from "./MetricCard";
import type { CompatibilityResult } from "@/lib/compatibility";
import Image from "next/image";
import { FaHeart, FaGhost, FaCheck, FaShare, FaSkull } from "react-icons/fa";
import { GiSparkles } from "react-icons/gi";
import { HiClipboardDocument } from "react-icons/hi2";

interface ResultDisplayProps {
  user: {
    id: string;
    name: string;
    image?: string;
  };
  compatibility: CompatibilityResult;
  isSharedView?: boolean;
}

export function ResultDisplay({ user, compatibility, isSharedView = false }: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const shareText = `🔥 My compatibility with KayTwenty: ${compatibility.score}% (${compatibility.tier})! 💖\n\nCheck yours at love.kaytwenty.com ✨`;

  const generateShareUrl = () => {
    const shareData = {
      user: {
        id: user.id,
        name: user.name,
        image: user.image,
      },
      compatibility,
    };
    // Use URL-safe base64 encoding
    const encoded = btoa(JSON.stringify(shareData))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
    return `${window.location.origin}/share/${encoded}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLink = () => {
    const shareUrl = generateShareUrl();
    navigator.clipboard.writeText(shareUrl);
    window.open(shareUrl, '_blank');
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in">
      {/* Back button */}
      {!isSharedView && (
        <div className="mb-6">
          <Button href="/" variant="secondary" size="sm">
            ← Back to Home
          </Button>
        </div>
      )}
      
      {isSharedView && (
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-pink-200 mb-2 px-4">
            Someone shared their compatibility result!
          </h2>
          <Button href="/" size="md">
            <FaHeart /> Check Your Own Compatibility
          </Button>
        </div>
      )}

      {/* Main Result Card */}
      <div className="bg-linear-to-br from-gray-900 to-black rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-12 mb-8 border-2 border-pink-900/50">
        {/* User vs KayTwenty */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mb-6 md:mb-8">
          {/* User */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-pink-500/50 shadow-lg mb-3">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-pink-600 to-pink-800 flex items-center justify-center text-white text-3xl font-bold">
                  {user.name[0]}
                </div>
              )}
            </div>
            <p className="font-semibold text-pink-200">{user.name}</p>
          </div>

          {/* Score */}
          <div className="text-center">
            <div className="text-6xl md:text-7xl lg:text-8xl font-bold bg-linear-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent mb-2 animate-scale-in drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">
              {compatibility.score}%
            </div>
            <div className="text-xl md:text-2xl font-semibold text-pink-100 mb-1">
              {compatibility.tier}
            </div>
            <div className="text-3xl md:text-4xl text-pink-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]"><FaHeart className="inline" /></div>
          </div>

          {/* KayTwenty */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-pink-500/50 shadow-lg mb-3">
              <Image
                src="/kay.jpg"
                alt="KayTwenty"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-semibold text-pink-200">KayTwenty</p>
          </div>
        </div>

        {/* Message */}
        <div className="text-center mb-6 md:mb-8">
          <p className="text-base md:text-lg text-pink-100 max-w-2xl mx-auto px-2">
            {compatibility.message}
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          <MetricCard
            label="Catching Feelings"
            value={compatibility.metrics.catchingFeelings}
            icon={<FaHeart />}
          />
          <MetricCard
            label="Ghost Probability"
            value={compatibility.metrics.ghostProbability}
            icon={<FaGhost />}
          />
          <MetricCard
            label="Drama Potential"
            value={compatibility.metrics.dramaPotential}
            icon={<FaSkull />}
          />
          <MetricCard
            label="Vibe Alignment"
            value={compatibility.metrics.vibeAlignment}
            icon={<GiSparkles />}
          />
        </div>

        {/* Share Buttons */}
        {!isSharedView && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={handleCopy}>
              {copied ? (
                <>
                  <FaCheck /> Copied!
                </>
              ) : (
                <>
                  <HiClipboardDocument /> Copy Text
                </>
              )}
            </Button>
            <Button
              size="lg"
              onClick={handleCopyLink}
            >
              {linkCopied ? (
                <>
                  <FaCheck /> Link Copied!
                </>
              ) : (
                <>
                  <FaShare /> Share Result Link
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
