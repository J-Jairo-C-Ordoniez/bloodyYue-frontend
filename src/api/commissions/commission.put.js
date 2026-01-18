import fetchClient from "../fetchClient";

export default async function commissionPut({ id, data }) {
    const response = await fetchClient(`/commissions/${id}`, {
        auth: true,
        options: {
            method: "PUT",
            body: JSON.stringify(data),
        },
    });

    if (response.error) {
        return {
            error: true,
            message: response.body,
            typeError: response.status,
        }
    }

    return {
        error: false,
        data: response.body,
    };
}