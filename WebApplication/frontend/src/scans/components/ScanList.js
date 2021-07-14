import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import ScanItem from './ScanItem';
import './ScanList.css';

const ScanList = props => {
    if (props.items.length === 0){
        return ( 
        <div className="place-list center">
            <Card>
                <h2>Nu exista niciun raport.</h2>
                <button>SCANARE</button>
            </Card>
        </div>
        );
    }

    return <ul className="place-list">
        {props.items.map (scan => 
        <ScanItem 
            key={scan.id} 
            id={scan.id} 
            ipdns={scan.addr} 
            titlu={scan.titlu} 
            descriere={scan.descriere} 
            creatorId={scan.creator} 
            tipScan={scan.tipScan} 
        />)}
    </ul>;
};

export default ScanList;