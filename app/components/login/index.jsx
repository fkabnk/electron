import React from "react";
import Axios from "axios";
import styled from "styled-components";
import {hashHistory} from 'react-router-dom';

const WrapperDiv = styled.div`

    width:100vw;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
`;

const LoginWrapper = styled.div`

    width:350px;
    height:350px;
    border:${props => props.theme.colors.border};
    background:${props => props.theme.colors.backgroundPrimary};
    border-radius:10px;
    color:white;

`;

const Header = styled.div`
    padding:20px
    font-size:24px;
    display:block;
    text-align:center;
`;

const FormWrapper = styled.div`
    padding:20px;
    display:block;
    text-align:center;
`;

const Input = styled.input`

    border: ${props => props.theme.colors.border};
    background: ${props => props.theme.colors.backgroundSecondary};
    padding:10px;
    margin-top:15px;
    border-radius: ${props => props.theme.colors.borderRadius};

`;

const SubmitButton = styled.button`

    border:none;
    width:80%;
    background: ${props => props.theme.colors.backgroundSecondary};
    color:white;
    padding:25px;
    margin-top:20px;
    border-radius: ${props => props.theme.colors.borderRadius};
    transition: .5s;

    &:hover{
        background:gray;
    }

`;

const handleLogin = props => {

    var params = new URLSearchParams();
    params.append('j_username', props.username);
    params.append('j_password', props.password);
    Axios.post("https://cw1.safemate.no/j_spring_security_check", params
    ).then((response) => {
        console.log(response)
        props.history.push('/home');
    }).catch((error) => {
        console.log(error.response);
    });
    return false;
}

const Login = props => {

    let user = "";
    let pass = "";

    return (

        <WrapperDiv>
            <LoginWrapper>
                <Header>
                    Login
                </Header>
                <FormWrapper>
                    <Input onChange={(event) => {user = event.target.value}} type="text"/>
                    <Input onChange={(event) => {pass = event.target.value}} type="password"/>
                    <SubmitButton type="button" onClick={() => {
                        handleLogin({username: user, password: pass, history:props.history})
                        return false;
                    }}>
                        Login
                    </SubmitButton>
                </FormWrapper>
            </LoginWrapper>
        </WrapperDiv>
            

    )

}

export default Login;