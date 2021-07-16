import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './ScanForm.css'
import Card from '../../shared/components/UIElements/Card';


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
        descriere: "Scaneaza server pentru servicii vulnerabile",
        addr: "192.168.0.1",
        tipScan: "SERVER-SCAN",
        creator: "utilizator2"

    }

]

const UpdateScan = () => {
    const [isLoading, setIsLoading] = useState(true);
    const scanId = useParams().scanId;

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        descriere: {
            value: '',
            isValid: false
        },
        ipdns: {
            value: '',
            isValid: false
        },
        tipScan: {
            value: '',
            isValid: false
        }     
    },false);

    const identifiedScan = DUMMY_SCANS.find(p => p.id === scanId);

    useEffect(() => {
        if(identifiedScan){
            setFormData({
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
            }, true);
        }
        setIsLoading(false);
    }, [setFormData,identifiedScan]);

    const scanUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    if(!identifiedScan){
        return <div className="center">
            <Card>
                <h2>Nu s-a putut gasi raportul respectiv</h2>
            </Card>
            </div>
    }

    if(isLoading){
        return <div className="center">
            <Card>
                <h2>Se incarca ...</h2>
            </Card>
            </div>
    }

    return (
        <form className="place-form" onSubmit={scanUpdateSubmitHandler}>
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
    );
};

export default UpdateScan;