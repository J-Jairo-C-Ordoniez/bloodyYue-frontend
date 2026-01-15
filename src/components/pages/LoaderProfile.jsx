'use client';

import Loader from '../molecules/Loader';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../../store/auth.store";

export default function LoaderProfile() {
    const router = useRouter();
    const user = useAuthStore.getState().user;

    useEffect(() => {
        if (!user) {
            router.replace("/");
        }

        router.replace("/profile/home");
    }, [user]);

    return <Loader />;
};