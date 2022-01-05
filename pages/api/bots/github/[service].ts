import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {
    const { service } = request.query;
    response.end(`Hello ${service}!`);
}