'use client';

import useSettings from '../../hooks/useSettings';
import LandingPage from './LandingPage';
import Loader from '../molecules/Loader';
import Error from '../molecules/Error';

export const SettingsLoader = ({ id = 1 }) => {
    const { setting, isLoadingSetting, errorSetting } = useSettings(id);

    if (isLoadingSetting) {
        return <Loader />;
    }

    if (errorSetting || setting.error) {
        return <Error message={setting?.message} typeError={setting?.typeError} />;
    }

    return <LandingPage data={setting.data} />;
};
