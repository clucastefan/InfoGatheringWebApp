import React, { useCallback, useReducer } from 'react';

import './NewScan.css'
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_IPDNS, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button';

const formReducer = (state, action) => {
    switch(action.type){
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for(const inputId in state.inputs){
                if(inputId === action.inputId){
                    formIsValid = formIsValid && action.isValid;
                }
                else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {
                        value: action.value,
                        isValid: action.isValid
                    }
                },
                isValid: formIsValid
            };
        default:
            return state;
    }
};

const NewScan = () => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
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
        },
        isValid: false
    });

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id});
    }, []);

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