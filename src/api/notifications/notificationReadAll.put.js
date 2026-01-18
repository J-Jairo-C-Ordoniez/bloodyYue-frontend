import fetchClient from "../fetchClient";

export default async function notificationReadAllPut() {
    const data = await fetchClient(`/notifications/read-all`, {
        auth: true,
        options: {
            method: "PUT"
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
