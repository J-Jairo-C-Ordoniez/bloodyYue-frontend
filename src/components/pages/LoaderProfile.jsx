'use client';

import Loader from '../molecules/Loader';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../../store/auth.store";
import roles from '../../api/roles/index';

export default function LoaderProfile() {
    const router = useRouter();
    const user = useAuthStore.getState().user;

    useEffect(() => {
        if (!user) {
            router.replace("/");
        }

        (async () => {
            const role = await roles.rolesGetId({ rolId: user.rolId });
            if (role.error) {
                return router.replace("/");
            }

            /* if (!role.data.permits) {
                
            } */
            return router.replace("/profile/home");
            return router.replace("/profile/dashboard");
        })();
    }, [user]);

    return <Loader />;
};