import fetchClient from "../fetchClient";

export default async function cartItemsPost({ data }) {
    const dataResponse = await fetchClient(`/cart/items`, {
        auth: true,
        options: {
            method: "POST",
            body: JSON.stringify(data),
        },
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