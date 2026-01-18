import fetchClient from "../fetchClient";

export default async function rolesRemovePermitDelete({ data }) {
    const dataResponse = await fetchClient(`/roles/permits/remove`, {
        auth: true,
        options: {
            method: "DELETE",
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