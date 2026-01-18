import fetchClient from "../fetchClient";

export default async function salesDetailsGet({ id }) {
    const data = await fetchClient(`/sales/details/${id}`, {
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