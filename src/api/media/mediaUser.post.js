import fetchApi from "../fetchApi";

const mediaUserPost = async ({ file, context }) => {
    const data = await fetchApi(`/media/images/user`, {
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

export default mediaUserPost;