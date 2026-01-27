'use client';

import useSettings from '../../hooks/useSettings';
import LandingPage from './LandingPage';
import Loader from '../molecules/Loader';
import Error from '../molecules/Error';

export default function SettingsLoader({ id = 1 }) {
    const { settings, loading, error } = useSettings(id);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <Error message={error} />;
    }

    return <LandingPage data={settings} />;
}