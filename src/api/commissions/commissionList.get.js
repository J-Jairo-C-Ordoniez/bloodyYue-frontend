import fetchClient from "../fetchClient";

export default async function commissionListGet({ id }) {
    const data = await fetchClient(`/commissions/list/${id}`, {
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