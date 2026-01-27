import fetchClient from "../fetchClient";

export default async function postPut({ id, data }) {
    const dataResponse = await fetchClient(`/posts/${id}`, {
        auth: true,
        options: {
            method: "PUT",
            body: JSON.stringify({
                title: data.title,
                description: data.description,
                content: data.content,
                typePost: data.typePost
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
