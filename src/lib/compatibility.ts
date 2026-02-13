import crypto from "crypto";

const KAYTWENTY_SEED = process.env.KAYTWENTY_SEED || "kaytwenty-love-algorithm-2026";

export interface CompatibilityResult {
  score: number;
  tier: string;
  message: string;
  metrics: {
    catchingFeelings: number;
    ghostProbability: number;
    dramaPotential: number;
    vibeAlignment: number;
  };
}

export function calculateCompatibility(userId: string): CompatibilityResult {
  // Special VIP users who get 100% compatibility
  const vipUsers = [
    "478722263458512898",
    "568959042614067200",
    "692399130852458666",
    "287716620976259072" // Aaron ID
  ];

  if (vipUsers.includes(userId)) {
    return {
      score: 100,
      tier: "Soulmates (Real)",
      message: "Congratulations! You've unlocked the rarest compatibility tier. Kay is obsessed. Call Me ASAP",
      metrics: {
        catchingFeelings: 100,
        ghostProbability: 0,
        dramaPotential: 0,
        vibeAlignment: 100,
      },
    };
  }

  // Generate deterministic hash from user ID
  const hash = crypto
    .createHash("sha256")
    .update(`${userId}:${KAYTWENTY_SEED}`)
    .digest("hex");

  // Convert different parts of hash to integers for different metrics
  const scoreRaw = parseInt(hash.substring(0, 8), 16);
  const metric1 = parseInt(hash.substring(8, 16), 16);
  const metric2 = parseInt(hash.substring(16, 24), 16);
  const metric3 = parseInt(hash.substring(24, 32), 16);
  const metric4 = parseInt(hash.substring(32, 40), 16);

  // Map score to 15-99 range, with rare 100 easter egg
  let score = (scoreRaw % 85) + 15;
  
  // Easter egg: if last 2 chars of hash are "ff", grant 100%
  if (hash.substring(62, 64) === "ff") {
    score = 100;
  }

  // Map metrics to 0-100
  const catchingFeelings = metric1 % 101;
  const ghostProbability = metric2 % 101;
  const dramaPotential = metric3 % 101;
  const vibeAlignment = metric4 % 101;

  // Determine tier and message based on score
  const { tier, message } = getTierAndMessage(score);

  return {
    score,
    tier,
    message,
    metrics: {
      catchingFeelings,
      ghostProbability,
      dramaPotential,
      vibeAlignment,
    },
  };
}

function getTierAndMessage(score: number): { tier: string; message: string } {
  // Easter egg for 69
  if (score === 69) {
    return {
      tier: "Nice.",
      message: "The universe has spoken. This is the way.",
    };
  }

  if (score === 100) {
    return {
      tier: "Soulmates (Real)",
      message: "Holy shit, you actually did it. Kay might actually text you back.",
    };
  }

  if (score >= 90) {
    return {
      tier: "Dangerously Compatible",
      message: "This is either true love or a restraining order waiting to happen. No in-between.",
    };
  }

  if (score >= 75) {
    return {
      tier: "Might Not Get Ghosted",
      message: "Congrats, you're not completely unfuckable. That's more than most people here can say.",
    };
  }

  if (score >= 60) {
    return {
      tier: "Situationship Material",
      message: "You'll definitely catch feelings. They definitely won't. Good luck with that.",
    };
  }

  if (score >= 45) {
    return {
      tier: "Friendzone Speedrun",
      message: "The math is bad, the vibes are worse. At least you tried?",
    };
  }

  if (score >= 30) {
    return {
      tier: "Painfully Mid",
      message: "You're the human equivalent of lukewarm water. They won't remember your name.",
    };
  }

  return {
    tier: "Do Not Perceive Me",
    message: "This is so bad the algorithm is embarrassed for you. Delete your account and start over.",
  };
}
