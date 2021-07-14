import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import './ScanItem.css';

const ScanItem = props => {
    return <li className="place-item">
        <Card className="place-item__content">
            <div className="place-item__info">
                <p1>{props.titlu}</p1>
                <h2>{props.ipdns}</h2>
                <h4>{props.tipScan}</h4>
                <p>{props.descriere}</p>
            </div>
            <div className="place-item__actions">
                <Button to={`/myscans/${props.id}`}>SHOW REPORT</Button>
                <Button danger>DELETE</Button>
            </div>
        </Card>
    </li>
};

export default ScanItem;