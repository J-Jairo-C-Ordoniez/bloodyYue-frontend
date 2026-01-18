import fetchClient from "../fetchClient";

export default async function commissionFilterPriceGet({ price }) {
    const data = await fetchClient(`/commissions/filter/price/${price}`, {
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