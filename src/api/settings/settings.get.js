import fetchClient from '../fetchClient';

export default async function getSettings(id) {
    const data = await fetchClient(`/settings/${id}`, {
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
