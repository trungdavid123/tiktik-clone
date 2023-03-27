import { createClient } from "@sanity/client";

export const client = createClient({
    projectId: 'q587f0fz',
    dataset: 'production',
    useCdn: false, // set to `true` to fetch from edge cache
    apiVersion: '2022-01-12', // use current date (YYYY-MM-DD) to target the latest API version
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN// Only if you want to update content with the client
})