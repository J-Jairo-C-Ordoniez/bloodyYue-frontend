import fetchClient from "../fetchClient";

export default async function changeStatusPost({ userId, status }) {
    const data = await fetchClient(`/auth/changeStatus`, {
        auth: true,
        options: {
            method: 'PATCH',
            body: JSON.stringify({
                userId,
                status
            })
        }
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
}