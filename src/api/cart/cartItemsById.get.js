import fetchClient from "../fetchClient";

export default async function cartItemsByIdGet({ id }) {
    const dataResponse = await fetchClient(`/cart/items/${id}`, {
        auth: true
    });

    if (dataResponse.error) {
        return {
            error: true,
            message: dataResponse.body,
            typeError: dataResponse.status,
        }
    }

    return {
        error: false,
        data: dataResponse.body,
    };
}
