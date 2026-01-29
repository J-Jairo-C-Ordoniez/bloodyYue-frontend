import fetchClientMedia from "../fetchClientMedia";

const mediaUserPost = async ({ file, context }) => {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('context', context);

    const data = await fetchClientMedia(`/media/images/user`, {
        auth: true,
        options: {
            method: 'POST',
            body: formData,
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

export default mediaUserPost;