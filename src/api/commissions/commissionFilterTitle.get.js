import fetchClient from "../fetchClient";

export default async function commissionFilterTitleGet({ title }) {
    const data = await fetchClient(`/commissions/filter/title/${title}`, {
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