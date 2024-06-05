import React from 'react';
import { useReadingList } from '../../context/ReadingListContext';
import Alert from './Alert';

const AlertContainer = (): JSX.Element => {
    const { alerts, hideAlert } = useReadingList();

    const onCloseAlert = (id: string) => {
        if (hideAlert) {
            hideAlert(id);
        }
    };

    const alertComps = alerts.map((a) => (
        <Alert
            key={a.id}
            id={a.id}
            message={a.message}
            onClose={onCloseAlert}
        />
    ));

    return (
        <div className="absolute bottom-0 left-0 w-full p-8">{alertComps}</div>
    );
};

export default AlertContainer;
