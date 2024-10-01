/** @type {import('next').NextConfig} */
const nextConfig = {

    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:3454/:path*',
            },
        ];
    }
};

export default nextConfig;
