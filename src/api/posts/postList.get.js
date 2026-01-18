import fetchClient from '../fetchClient';

export default async function postListGet({ id }) {
    const data = await fetchClient(`/posts/list/${id}`, {
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
