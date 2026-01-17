import fetchClient from "../fetchClient";

export default async function commissionGet({ commissionId }) {
    const data = await fetchClient(`/commissions/${commissionId}`, {
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