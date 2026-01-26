import fetchClientMedia from "../fetchClientMedia";

export default async function mediaImagesPost({ file, context }) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('context', context)

    const data = await fetchClientMedia(`/media/images/post`, {
        auth: true,
        options: {
            method: 'POST',
            body: formData
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