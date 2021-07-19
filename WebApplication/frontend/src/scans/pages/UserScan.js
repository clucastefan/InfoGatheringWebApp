import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';

import ScanList from '../components/ScanList';
import { useHttpClient } from '../../shared/context/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';


const UserScans = () => {
    const [loadedScans, setLoadedScans] = useState();
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    const userId = useParams().userId;

    useEffect(() => {
        const fetchScans = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/reports/${userId}/myscans`);
                setLoadedScans(responseData.scan)
            } catch (err) {

            }
        };
        fetchScans();
    }, [sendRequest, userId]);

    const scanDeletedHandler = (deletedScanId) => {
        setLoadedScans(prevScans => prevScans.filter(scan => scan.id !== deletedScanId));
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            {isLoading && ( <div class="center"><LoadingSpinner asOverlay/></div> )}
            {!isLoading && loadedScans && <ScanList items={loadedScans} onDeleteScan={scanDeletedHandler}/>}
        </React.Fragment> );
};

export default UserScans;