import React from 'react';

import './NewScan.css'
import Input from '../../shared/components/FormElements/Input';

const NewScan = () => {
    return <form className="place-form">
        <Input element="input" type="text" label="Titlu" />
    </form>
};

export default NewScan;