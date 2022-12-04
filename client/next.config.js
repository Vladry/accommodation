/** @type {import('next').NextConfig}*/


const nextConfig = {
// 1)
// конфигурирование источника ссылок для <Image src={} />:
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/vladry/**',
                // port: '',
            },
        ],
    },


// 2)
// конфигурирование алиасов (Absolute Imports and Module path aliases) выполняется не здесь, а в
// отдельном файле jsconfig.json,  см.  детали:  https://nextjs.org/docs/advanced-features/module-path-aliases



// 3)
//конфигурирование перенаправлений на другие url- aлиасы:
    async rewrites() {
        return [
/*
                        {
                            source: '/about-us',
                            destination: '/about'
                        },
            // Path Matching - will match `/post/a` but not `/post/a/b`
                        {
                            source: '/post/:slug',
                            destination: '/news/:slug'
                        },
            // Wildcard Path Matching - will match `/blog/a` and `/blog/a/b`
                        {
                            source: '/blog/:slug*',
                            destination: '/news/:slug*'
                        }
                        ,
            // Rewriting to an external URL
                        {
                            source: '/docs/:slug',
                            destinatio: 'http://example.com/docs/:slug'
                        }
*/

        ]
    }
}

module.exports = nextConfig
