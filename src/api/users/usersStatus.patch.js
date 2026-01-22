import fetchClient from "../fetchClient";

export default async function usersStatusPatch({ userId, status }) {
    const dataResponse = await fetchClient(`/users/${userId}/status`, {
        auth: true,
        options: {
            method: "PATCH",
            body: JSON.stringify({ status }),
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
