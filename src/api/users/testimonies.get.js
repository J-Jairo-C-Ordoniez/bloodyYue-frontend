import fetchClient from "../fetchClient";

export default async function testimoniesGet() {
    const data = await fetchClient(`/users/testimonies`, {
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
}