import React, { useState, useContext } from 'react'

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button'
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css'

const Auth = () => {
    const auth = useContext(AuthContext);

    const [isLoginMode, setIsLoginMode] = useState(true);

    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false);

    const switchModeHandler = () => {
        if(!isLoginMode){
            setFormData({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid);
        }
        else {
            setFormData({
                ...formState.inputs,
                name : {
                    value: '',
                    isValid: false
                }
            }, false)
        }
        setIsLoginMode(prevMode => !prevMode);
    };

    const authSubmiteHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
        auth.login();
    };

    return ( <Card className="authentication">
        <h2>Login required</h2>
        <hr />
        <form onSubmit={authSubmiteHandler}>
            {!isLoginMode && (
                <Input
                    element="input"
                    id="name"
                    type="text"
                    label="Username"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Trebuie sa alegi un nume de utilizator."
                    onInput={inputHandler}/>
            )}
            <Input 
                element="input" 
                id="email" 
                type="email"
                label="E-Mail" 
                validators={[VALIDATOR_EMAIL()]}
                errorText="Trebuie sa introduci o adresa de email valida."
                onInput={inputHandler}/>
            <Input 
                element="input" 
                id="password" 
                type="password"
                label="Password" 
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Parola trebuie sa aiba minim 5 caractere."
                onInput={inputHandler}/>
            <Button type="submit" disabled={!formState.isValid}>
                {isLoginMode ? 'LOGIN' : 'SIGNUP'}
            </Button>
            </form>
            <Button danger onClick={switchModeHandler}>
                SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
            </Button>
        </Card> );
};

export default Auth;