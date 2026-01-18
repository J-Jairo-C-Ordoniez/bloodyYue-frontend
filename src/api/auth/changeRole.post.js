import fetchClient from "../fetchClient";

export default async function changeRolePost({ userId, rolId }) {
    const data = await fetchClient(`/auth/changeRole`, {
        auth: true,
        options: {
            method: 'POST',
            body: JSON.stringify({
                userId,
                rolId
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