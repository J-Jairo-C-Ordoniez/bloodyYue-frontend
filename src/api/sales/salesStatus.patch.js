import fetchClient from "../fetchClient";

export default async function salesStatusPatch({ id, status }) {
    const data = await fetchClient(`/sales/${id}/status`, {
        auth: true,
        options: {
            method: "PATCH",
            body: JSON.stringify({ status })
        }
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
