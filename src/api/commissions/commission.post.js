import fetchClient from "../fetchClient";

export default async function commissionPost({ data }) {
    const dataResponse = await fetchClient('/commissions', {
        auth: true,
        options: {
            method: 'POST',
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