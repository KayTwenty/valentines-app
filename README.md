# Love Compatibility with KayTwenty

A fun, meme-y Next.js web app that calculates your "compatibility" with KayTwenty using advanced pseudoscience and your Discord ID!

## Features

- **Discord OAuth Login** - Authenticate with Discord
- **Deterministic Algorithm** - Your compatibility score is consistent and based on your Discord ID
- **No Database** - Everything is computed on the fly
- **Shareable Results** - Copy your results to share
- **Mobile Friendly** - Responsive design with Tailwind CSS
- **Meme-y & Fun** - Light-hearted fake metrics and playful messaging

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd valentines
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in your Discord OAuth credentials
   - Generate a NextAuth secret

4. Create a Discord Application:
   - Go to [Discord Developer Portal](https://discord.com/developers/applications)
   - Create a new application
   - Add OAuth2 redirect URIs:
     - Local: `http://localhost:3000/api/auth/callback/discord`
     - Production: `https://love.kaytwenty.com/api/auth/callback/discord`
   - Copy the Client ID and Client Secret to your `.env.local`

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Required environment variables:

- `NEXTAUTH_SECRET` - Secret for NextAuth.js (generate with `openssl rand -base64 32`)
- `NEXTAUTH_URL` - Your app's URL (e.g., `http://localhost:3000` or `https://love.kaytwenty.com`)
- `DISCORD_CLIENT_ID` - Your Discord application's client ID
- `DISCORD_CLIENT_SECRET` - Your Discord application's client secret
- `DISCORD_WEBHOOK_URL` - (Optional) Discord webhook URL for logging results

Optional:
- `KAYTWENTY_SEED` - Custom seed for the compatibility algorithm

## Deployment to Vercel

1. Push your code to GitHub

2. Import the project in Vercel

3. Add environment variables in Vercel:
   - Go to Project Settings → Environment Variables
   - Add all required variables from `.env.example`
   - Update `NEXTAUTH_URL` to your production domain

4. Deploy!


## 📄 License

MIT License - feel free to use this for your own projects

---

Made with <3 by KayTwenty
