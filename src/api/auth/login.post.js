import fetchClient from "../fetchClient";

export default async function loginPost({ email, password }) {
    const data = await fetchClient(`/auth/login`, {
        auth: false,
        options: {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
            })
        }
    });

    if (data.error) {
        return {
            error: true,
            message: data.body,
            typeError: data.status,
        }
    }

    console.log(data);

    localStorage.setItem('token', data.body.accessToken);
    localStorage.setItem('user', JSON.stringify(data.body.user));

    return {
        error: false,
        data: data.body,
    };
}