import fetchClient from "../fetchClient";

export default async function settingsPut({ id, data }) {
    const dataResponse = await fetchClient(`/settings/${id}`, {
        auth: true,
        options: {
            method: "PUT",
            body: JSON.stringify(data),
        }
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