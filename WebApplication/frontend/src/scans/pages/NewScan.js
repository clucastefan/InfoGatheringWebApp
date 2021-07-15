import React from 'react';

import './ScanForm.css'
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_IPDNS, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';


const NewScan = () => {
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

    const scanSubmitHandler = event => {
        event.preventDefault();
        var e = document.getElementById("tipScan");
        var tipScan = e.options[e.selectedIndex].text;
        console.log(formState.inputs,tipScan);
    };

    return <form className="place-form" onSubmit={scanSubmitHandler}>
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
        <option value="FULL_SCAN">FULL SCAN</option>
        <option value="WEB_SCAN">WEB SCAN</option>
        <option value="SERVER_SCAN">SERVER SCAN</option>
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
};

export default NewScan;