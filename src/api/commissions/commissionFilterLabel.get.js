import fetchClient from "../fetchClient";

export default async function commissionFilterLabelGet({ labelId }) {
    const data = await fetchClient(`/commissions/filter/label/${labelId}`, {
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
