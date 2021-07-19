import React, { useState } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import { useHttpClient } from '../../shared/context/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import './ScanItem.css';

const ScanItem = props => {
    const {isLoading, sendRequest, error, clearError} = useHttpClient();
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    };

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
    };

    const confirmDeleteHandler = async () => {
        setShowConfirmModal(false);
        try {
           await sendRequest(`http://localhost:5000/api/reports/${props.creator}/myscans/${props.id}/`, 'DELETE');
           props.onDelete(props.id);
        } catch (err) {

        }
    };

    return (
    <React.Fragment>
        <ErrorModal error={error} onClear={clearError}/>
        <Modal show={showConfirmModal} onCancel={cancelDeleteHandler} header="Esti sigur ?" footerClass="place-item__modal-actions" footer={
            <React.Fragment>
                <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                <Button danger onClick={confirmDeleteHandler}>STERGE</Button>
            </React.Fragment>
        }>
            <p>Vrei sa stergi raportul pentru {props.ipdns} ?</p>
        </Modal>
    <li className="place-item">
        <Card className="place-item__content">
            {isLoading && <LoadingSpinner asOverlay/>}
            <div className="place-item__info">
                <p1>{props.titlu}</p1>
                <h2>{props.ipdns}</h2>
                <h4>{props.tipScan}</h4>
                <p>{props.descriere}</p>
            </div>
            <div className="place-item__actions">
                <Button to={`/myscans/${props.id}`}>SHOW REPORT</Button>
                <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>
            </div>
        </Card>
    </li>
    </React.Fragment>
    )
};

export default ScanItem;