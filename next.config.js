/** @type {import('next').NextConfig} */

module.exports = {
    async headers() {
        return [

        ];
    },
    images: {
        domains: ['cotizacion-web.s3.amazonaws.com', 's3.amazonaws.com'],
    },
}