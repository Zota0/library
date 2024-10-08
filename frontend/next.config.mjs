/** @type {import('next').NextConfig} */
const nextConfig = {

    async rewrites() {
        return [
            {
                source: '/back/api/:path*',
                destination: 'http://localhost:3454/api/:path*',
            },
            {
                source: '/wolnelektury/:path*',
                destination: 'https://wolnelektury.pl/api/:path*',
            }
        ];
    },

    async headers() {
        return [
            {
                source: '/wolnelektury/:path*', 
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                ],
            },
            {
                source: '/back/api/:path*',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET, POST, PUT, DELETE',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
                    },
                ],
            },
        ];
    },

    images: {
        domains: ['localhost', 'localhost:3454', 'localhost:3000'],
        unoptimized: true,
    },

};

export default nextConfig;
