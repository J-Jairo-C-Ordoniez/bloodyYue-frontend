import fetchClient from "../fetchClient";

export default async function notificationsGet() {
    const data = await fetchClient(`/notifications`, {
        auth: true
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
