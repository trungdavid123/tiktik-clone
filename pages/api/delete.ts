import sanityCli from '@/tiktik/sanity.cli';
import { client } from '@/utils/client';
import type { NextApiRequest, NextApiResponse } from 'next'

const query = `{
    "mutations": [
        {
            "delete": {
                "query": "*[_type == 'user']",
            }
        }
    ]
}`



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {


        client
            .delete({ query: `*[_type == "user"]` })
            .then(() => {
                console.log('The document matching was deleted ---')
            })
            .catch((err) => {
                console.error('Delete failed: ', err.message)
            })
    }
}
