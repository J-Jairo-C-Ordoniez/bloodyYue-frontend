import fetchClient from "../fetchClient";

export default async function rolesAssignPermitPost({ data }) {
    const dataResponse = await fetchClient(`/roles/permits/assign`, {
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