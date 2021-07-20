import React, { useEffect,useState,useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './ScanForm.css'
import Card from '../../shared/components/UIElements/Card';
import { useHttpClient } from '../../shared/context/http-hook';



const UpdateScan = () => {
    const auth = useContext(AuthContext);

    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const[loadedScan, setLoadedScan] = useState();
    const scanId = useParams().scanId;
    const userId = auth.userId;

    const history = useHistory();

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

    useEffect(() => {
        const fetchScan = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/reports/${userId}}/myscans/${scanId}`);
                setLoadedScan(responseData.scan);
                setFormData({
                    title: {
                        value: responseData.scan.titlu,
                        isValid: true
                    },
                    descriere: {
                        value: responseData.scan.descriere,
                        isValid: true
                    },
                    ipdns: {
                        value: responseData.scan.addr,
                        isValid: true
                    },
                    tipScan: {
                        value: responseData.scan.tipScan,
                        isValid: true
                    }
                }, true);
            } catch (err) {}
        };
        fetchScan();
    }, [sendRequest, userId, scanId, setFormData]);


    const scanUpdateSubmitHandler = async event => {
        event.preventDefault();
        //console.log(formState.inputs);
        try {
                await sendRequest(`http://localhost:5000/api/reports/${userId}}/myscans/${scanId}`,'PATCH',JSON.stringify({
                titlu: formState.inputs.title.value,
                descriere: formState.inputs.descriere.value,
            }),
            {
                'Content-Type': 'application/json'
            });
            history.push(`/${auth.userId}/myscans`);
        } catch (err) {

        }
    };

    const downloadHandler = async event => {
        event.preventDefault();
        //console.log(formState.inputs);
        try {
                await sendRequest(`http://localhost:3000/home/cluca/Downloads/raport_server.txt`,'GET',
            {
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': 'attachment;filename=\"raport_server.txt\"'
            });
        } catch (err) {

        }
    };

    let numeFisier;
    switch(formState.inputs.tipScan.value) {
        case 'FULL-SCAN':
            numeFisier = 'raport_full.txt';
          break;
        case 'WEB-SCAN':
            numeFisier = 'raport_web.txt';
          break;
        case 'SERVER-SCAN':
            numeFisier = 'raport_server.txt';
            break;
        default:
            numeFisier = 'raport_full.txt';
      } 

    if(isLoading){
        return <div className="center">
            <LoadingSpinner asOverlay/>
            </div>
    }

    if(!loadedScan && !error ){
        return <div className="center">
            <Card>
                <h2>Nu s-a putut gasi raportul respectiv</h2>
            </Card>
            </div>
    }


    return (
        <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {!isLoading && loadedScan && <form className="place-form" onSubmit={scanUpdateSubmitHandler}>
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
            value={loadedScan.titlu}
            valid={true}/>
        <Input 
            id="descriere" 
            element="textarea"
            label="Descriere"
            validators={[VALIDATOR_MINLENGTH(1)]} 
            errorText="Trebuie adaugata o descriere scurta." 
            onInput={inputHandler}
            value={loadedScan.descriere}
            valid={true}/>
        <label className="center"> REZULTATE </label>
        <a className="center"
         href={`/home/cluca/Documents/Licenta/WebApplication/backend/SCANS/${formState.inputs.ipdns.value}/${numeFisier}`}>
            Download File
        </a>        
        <Button type="submit" disabled={!formState.isValid}>RESCAN</Button>
    </form> }
    </React.Fragment>
    );
};

export default UpdateScan;