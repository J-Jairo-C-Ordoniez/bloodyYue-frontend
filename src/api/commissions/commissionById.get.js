import fetchClient from "../fetchClient";

export default async function commissionByIdGet({ id }) {
    const data = await fetchClient(`/commissions/${id}`, {
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