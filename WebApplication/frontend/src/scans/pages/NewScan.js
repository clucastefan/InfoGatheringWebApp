import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import './ScanForm.css'
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_IPDNS, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/context/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const NewScan = () => {
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [formState, inputHandler] = useForm({
        title: {
            value: '',
            isValid: false
        },
        ipdns: {
            value: '',
            isValid: false
        },
        descriere: {
            value: '',
            isValid: false
        }
    }, false);

    const history = useHistory();

    const scanSubmitHandler = async event => {
        event.preventDefault();
        var e = document.getElementById("tipScan");
        var tipScanDropDown = e.options[e.selectedIndex].text;

        try {
            await sendRequest('http://localhost:5000/api/reports/', 'POST', JSON.stringify({
                titlu: formState.inputs.title.value,
                descriere: formState.inputs.descriere.value,
                addr: formState.inputs.ipdns.value,
                tipScan: tipScanDropDown,
                creator: auth.userId,
            }),
            {
                'Content-Type': 'application/json'
            });
            history.push('/');
        } catch (err) {}
    };

    return ( 
    <React.Fragment>
    <ErrorModal error={error} onClear={clearError}/>
    <form className="place-form" onSubmit={scanSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input 
            id="title"
            element="input" 
            type="text" label="Titlu" 
            validators={[VALIDATOR_REQUIRE()]} 
            errorText="Te rog sa introduci un titlu valid."
            onInput={inputHandler}/>

        <Input 
            id="ipdns"
            element="input" 
            type="text" label="IP/DNS" 
            validators={[VALIDATOR_IPDNS()]} 
            errorText="Te rog sa introduci o adresa IP sau DNS valida."
            onInput={inputHandler}/>

        <label>TIP SCANARE</label>
        <select id="tipScan" name="selectList">
        <option value="FULL_SCAN">FULL-SCAN</option>
        <option value="WEB_SCAN">WEB-SCAN</option>
        <option value="SERVER_SCAN">SERVER-SCAN</option>
        </select>

        <Input 
            id="descriere"
            element="textarea" 
            type="text" label="Descriere"
            validators={[VALIDATOR_MINLENGTH(1)]}  
            errorText="Trebuie sa adaugi o descriere scurta."
            onInput={inputHandler}
            />
        
        <Button type="submit" disabled={!formState.isValid}>START SCAN</Button>
    </form>
    </React.Fragment> )
};

export default NewScan;