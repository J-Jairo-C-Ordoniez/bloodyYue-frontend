import fetchClient from "../fetchClient";

export default async function postPost({ data }) {
    const dataResponse = await fetchClient(`/posts/`, {
        auth: true,
        options: {
            method: 'POST',
            body: JSON.stringify({
                post: {
                    title: data.title,
                    description: data.description,
                    content: data.content,
                    typePost: data.typePost,
                },
                labels: data.labels
            }),
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