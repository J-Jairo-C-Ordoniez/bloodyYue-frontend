import fetchClient from "../fetchClient";

export default async function rolesGetIdGet({ rolId }) {
    const data = await fetchClient(`/roles/${rolId}`, {
        auth: true,
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