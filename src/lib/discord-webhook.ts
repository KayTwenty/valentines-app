import type { CompatibilityResult } from "./compatibility";

interface WebhookData {
  userId: string;
  userName: string;
  userImage?: string;
  compatibility: CompatibilityResult;
}

export async function sendDiscordWebhook(data: WebhookData): Promise<void> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  // Skip if webhook URL is not configured
  if (!webhookUrl || webhookUrl === "your-discord-webhook-url-here") {
    return;
  }

  try {
    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
      dateStyle: "medium",
      timeStyle: "short",
    });

    // Determine emoji based on score
    let emoji = "💔";
    if (data.compatibility.score === 100) emoji = "💯";
    else if (data.compatibility.score === 69) emoji = "😏";
    else if (data.compatibility.score >= 90) emoji = "💖";
    else if (data.compatibility.score >= 75) emoji = "💕";
    else if (data.compatibility.score >= 60) emoji = "💗";
    else if (data.compatibility.score >= 45) emoji = "💔";
    else emoji = "🚫";

    const embed = {
      title: `${emoji} New Compatibility Check`,
      color: data.compatibility.score >= 75 ? 0xec4899 : data.compatibility.score >= 45 ? 0xf472b6 : 0x6b7280,
      fields: [
        {
          name: "👤 User",
          value: `**${data.userName}**\n\`${data.userId}\``,
          inline: true,
        },
        {
          name: "📊 Score",
          value: `**${data.compatibility.score}%**\n*${data.compatibility.tier}*`,
          inline: true,
        },
        {
          name: "\u200b",
          value: "\u200b",
          inline: true,
        },
        {
          name: "💬 Message",
          value: data.compatibility.message,
          inline: false,
        },
        {
          name: "📈 Metrics",
          value: [
            `💖 Catching Feelings: **${data.compatibility.metrics.catchingFeelings}%**`,
            `👻 Ghost Probability: **${data.compatibility.metrics.ghostProbability}%**`,
            `💀 Drama Potential: **${data.compatibility.metrics.dramaPotential}%**`,
            `✨ Vibe Alignment: **${data.compatibility.metrics.vibeAlignment}%**`,
          ].join("\n"),
          inline: false,
        },
      ],
      footer: {
        text: `Checked at ${timestamp}`,
      },
      thumbnail: data.userImage
        ? {
            url: data.userImage,
          }
        : undefined,
    };

    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    });
  } catch (error) {
    // Silently fail - don't break the app if webhook fails
    console.error("Failed to send Discord webhook:", error);
  }
}
