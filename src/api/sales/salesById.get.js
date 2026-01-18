import fetchClient from "../fetchClient";

export default async function salesByIdGet({ id }) {
    const data = await fetchClient(`/sales/${id}`, {
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