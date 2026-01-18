import fetchClient from "../fetchClient";

export default async function salesSoldGet() {
    const data = await fetchClient('/sales/sold', {
        auth: true
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