import fetchClient from "../fetchClient";

export default async function cartItemsGet() {
    const data = await fetchClient('/cart/items', { auth: true });
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