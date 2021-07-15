import React from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './ScanForm.css'


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

const UpdateScan = () => {
    const scanId = useParams().scanId;

    const identifiedScan = DUMMY_SCANS.find(p => p.id === scanId);

    const [formState, inputHandler] = useForm({
        title: {
            value: identifiedScan.titlu,
            isValid: true
        },
        descriere: {
            value: identifiedScan.descriere,
            isValid: true
        },
        ipdns: {
            value: identifiedScan.addr,
            isValid: true
        },
        tipScan: {
            value: identifiedScan.tipScan,
            isValid: true
        }     
    },true);

    const scanUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    if(!identifiedScan){
        return <div className="center">Nu s-a putut gasi raportul respectiv</div>
    }

    return <form className="place-form" onSubmit={scanUpdateSubmitHandler}>
        <label className="ipdns">RAPORT: {(formState.inputs.ipdns.value)}</label>
        <label className="tipscan">TIP SCANARE: {(formState.inputs.tipScan.value)}</label>
        <Input 
            id="title" 
            element="input" 
            type="text" 
            label="Titlu"
            validators={[VALIDATOR_REQUIRE()]} 
            errorText="Trebuie introdus un titlu valid." 
            onInput={inputHandler}
            value={formState.inputs.title.value}
            valid={formState.inputs.title.isValid}/>
        <Input 
            id="descriere" 
            element="textarea"
            label="Descriere"
            validators={[VALIDATOR_MINLENGTH(1)]} 
            errorText="Trebuie adaugata o descriere scurta." 
            onInput={inputHandler}
            value={formState.inputs.descriere.value}
            valid={formState.inputs.descriere.isValid}/>
        <Button type="submit" disabled={!formState.isValid}>RESCAN</Button>
    </form>
};

export default UpdateScan;