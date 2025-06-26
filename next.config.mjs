/** @type {import('next').NextConfig} */
const nextConfig = {
    staticPageGenerationTimeout: 300,

    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true, // gunakan false jika hanya ingin redirect sementara (302)
            },
        ];
    },
};

export default nextConfig;
