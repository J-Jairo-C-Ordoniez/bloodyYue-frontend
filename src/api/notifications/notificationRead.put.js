import fetchClient from "../fetchClient";

export default async function notificationReadPut({ notificationId }) {
    const response = await fetchClient(`/notifications/${notificationId}/read`, {
        auth: true,
        options: {
            method: "PUT"
        }
    });

    if (response.error) {
        return {
            error: true,
            message: response.body,
            typeError: response.status,
        }
    }

    return {
        error: false,
        data: response.body,
    };
}
