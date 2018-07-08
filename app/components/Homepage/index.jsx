import React from "react";
import Axios from "axios";
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Grid, Row, Col} from "react-bootstrap";
import styled from "styled-components";

import {Container, H5, InfoRow, HeaderRow, StyledGrid, Span} from "../layout";

const Homepage = props => {

    if(props.userInfo == null){

        Axios.get("https://cw1.safemate.no/ajax/user/me")
        .then(response => {
            props.setUserInfo(response.data);
        })
        .catch(error => {
            const errorCode = error.response.status;
            if(errorCode == 403){
                props.history.push('/login');
            }
        });
    }
    console.log(props);
    if(props.userInfo){
        return(    
            <Container>
                <StyledGrid>
                    <HeaderRow>
                        <Span>Personal</Span> <Span accent>Information</Span>
                    </HeaderRow>
                    <Row>
                        <H5>
                            Logged in as
                        </H5>
                    </Row>
                    <InfoRow>
                        {props.userInfo.name}
                    </InfoRow>
                    <Row>
                        <H5>
                            User Id
                        </H5>
                    </Row>
                    <InfoRow>
                        {props.userInfo.id}
                    </InfoRow>
                    <Row>
                        <H5>
                            Username
                        </H5>
                    </Row>
                    <InfoRow>
                        {props.userInfo.username}
                    </InfoRow>
                </StyledGrid>
            </Container>
        )
    }
    else{
        return(
            <div>Loading...</div>
        )
    }

}


const mapStateToProps = state => {
    console.log(state)
    return{
        userInfo: state.homepage.userInfo     
    }
}

const mapDispatchToProps = dispatch => ({
    setUserInfo: data => dispatch({type: "SET_USER_INFO", data})
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
