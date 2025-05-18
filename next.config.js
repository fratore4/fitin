/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cnwxrhkmudkvhzppmquu.supabase.co'],
    unoptimized: true, // Per consentire l'uso di immagini locali senza ottimizzazione
  },
}

module.exports = nextConfig