import fetchClient from "../fetchClient";

export default async function mediaCommissionPost({ file, context }) {
    const data = await fetchClient(`/media/images/commission`, {
        auth: true,
        options: {
            method: 'POST',
            body: JSON.stringify({
                file,
                context
            }),
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