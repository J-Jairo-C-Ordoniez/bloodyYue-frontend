import fetchClient from "../fetchClient";

export default async function rolesGetAllPermitsGet() {
    const data = await fetchClient("/roles/permits/all", {
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