import fetchClient from "../fetchClient";

export default async function meProfilePut({ data }) {
    const dataResponse = await fetchClient('/users/me', {
        auth: true,
        options: {
            method: 'PUT',
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