import fetchClient from '../fetchClient';

export default async function getPostRandom() {
    const data = await fetchClient(`/posts/random`, {
        auth: false,
    });

    if (data.error) {
        return {
            error: true,
            message: data.body,
            typeError: data.status,
        }
    }

    return {
        error: false,
        data: data.body,
    };
};
