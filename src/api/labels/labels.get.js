import fetchClient, { newToken } from "../fetchClient";
import useAuthStore from "../../store/auth.store";

export default async function labelsGet() {
    const token = useAuthStore.getState().token;
    console.log(token, 'token')

    if (!token) {
        console.log('No token found')
        const dataNewToken = await newToken();
        console.log(dataNewToken, 'hola')
        if (dataNewToken.error) return

        /* useAuthStore.getState().setAuth(dataNewToken.body.token, dataNewToken.body.user); */

        console.log(dataNewToken)

        /* return labelsGet(); */
    }

    /* const data = await fetchClient('/labels', {
        auth: true
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
    } */
}