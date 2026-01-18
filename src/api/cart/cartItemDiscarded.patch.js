import fetchClient from "../fetchClient";

export default async function cartItemDiscardedPatch({ id }) {
    const dataResponse = await fetchClient(`/cart/items/${id}/discarded`, {
        auth: true,
        options: {
            method: "PATCH",
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