/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			resourceQuery: { not: /url/ }, // exclude if *.svg?url
			use: ["@svgr/webpack"],
		});
		return config;
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "image.tmdb.org",
			},
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
			},
			{
				protocol: "https",
				hostname: "*.googleusercontent.com",
			},
		],
	},
};

module.exports = nextConfig;
