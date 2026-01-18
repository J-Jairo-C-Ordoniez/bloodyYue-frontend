import fetchApi from "../fetchApi";

export default async function mediaImagesPost({ file, context }) {
    const data = await fetchApi(`/media/images/post`, {
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