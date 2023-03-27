// import { createClient } from "@sanity/client";

// const client = createClient({
//     projectId: 'q587f0fz',
//     dataset: 'production',
//     useCdn: false, // set to `true` to fetch from edge cache
//     apiVersion: '2022-01-12', // use current date (YYYY-MM-DD) to target the latest API version
//     token: "sksJfeXJ7BVKaARP4nFLKDxjwDZmQVtzuZXMIyPeRt55lous1dqErwer0iewFPAkfn3luw1h0dDzsRNgJn9apId9rot0ltiWoPvpDhSzSJrTtUNOTCkGS7hysgkAUHDJ22Ky6a1qbRNkZkjLkd4rkiHl2bgR7chIg8Xlbn4Fb4kMwNhC96xI"// Only if you want to update content with the client
// })

// client
//     .delete({ query: `*[_type == "user"]` })
//     .then(() => {
//         console.log('The document matching was deleted ---')
//     })
//     .catch((err) => {
//         console.error('Delete failed: ', err.message)
//     })