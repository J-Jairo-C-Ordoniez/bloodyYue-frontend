import fetchClient from "../fetchClient";

export default async function postFilterTitleGet({ title }) {
    const data = await fetchClient(`/posts/filter/title/${title}`, {
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