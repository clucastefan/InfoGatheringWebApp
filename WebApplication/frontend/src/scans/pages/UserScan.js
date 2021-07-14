import React from 'react';
import { useParams } from 'react-router-dom';

import ScanList from '../components/ScanList';

const DUMMY_SCANS = [
    {
        id: "scan1",
        titlu: "Scan rutina",
        descriere: "Scaneaza site-ul dupa ultimul commit in productie dd/mm/yyyy",
        addr: "192.168.0.1",
        tipScan: "WEB-SCAN",
        creator: "utilizator1"

    },
    {
        id: "scan2",
        titlu: "Scan rutina",
        descriere: "Scaneaza site-ul dupa ultimul commit in productie dd/mm/yyyy",
        addr: "192.168.0.1",
        tipScan: "WEB-SCAN",
        creator: "utilizator2"

    }

]

const UserScans = () => {
    const userId = useParams().userId;
    const loadedScans = DUMMY_SCANS.filter(scan => scan.creator === userId);
    return <ScanList items={loadedScans}/>
};

export default UserScans;