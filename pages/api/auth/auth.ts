import { client } from '@/utils/client';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        try {
            const user = req.body;
            client.createIfNotExists(user)
                .then(() => {
                    return res.status(200).json('Login Success')
                })
        } catch (error) {
           return res.json(error);
        }
    }
}


 