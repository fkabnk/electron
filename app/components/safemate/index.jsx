import React from "react";
import {Grid, Row, Col} from "react-bootstrap";
import {Container, H5, InfoRow, HeaderRow, StyledGrid, Span, StyledIcon, IconWrapper} from "../layout";

import BatteryAlarm from "../svg/BatteryAlarm";
import GeofenceAlarm from "../svg/GeofenceAlarm";
import SelfCheckAlarm from "../svg/SelfCheckAlarm";
import TurnedOffAlarm from "../svg/TurnedOffAlarm";
import UserAlarm from "../svg/UserAlarm";

var exec = require('child_process').exec, child;

const triggerAlarm = (deviceId, type) => {

    console.log(deviceId, type)
    console.log(process.cwd());

    child = exec(`java -jar jartest2.jar ${deviceId}`, { cwd:process.cwd() },
      function (error, stdout, stderr){
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if(error !== null){
          console.log('exec error: ' + error);
        }
    });

}

const Safemate = props => {
    
    const safemate = props.location.safemate;
    console.log(props)
    if(!safemate){
        props.history.push('/safemates');
    }

    return(
        <Container>
        <StyledGrid>
            <HeaderRow>
                <Span>Device</Span> <Span accent>Information</Span>
            </HeaderRow>
            <Row>
                <H5>
                    Device Name
                </H5>
            </Row>
            <InfoRow>
                {safemate.deviceName}
            </InfoRow>
            <Row>
                <H5>
                    Device Id
                </H5>
            </Row>
            <InfoRow>
                {safemate.deviceId}
            </InfoRow>
            <Row>
                <H5>
                    Actions
                </H5>
            </Row>
            <InfoRow>
                <IconWrapper onClick={() => {triggerAlarm(safemate.deviceId, "useralarm")}}>
                    <UserAlarm/>
                </IconWrapper>
                <IconWrapper onClick={() => {triggerAlarm(safemate.deviceId, "batteryalarm")}}>
                    <BatteryAlarm/>
                </IconWrapper>
                <IconWrapper onClick={() => {triggerAlarm(safemate.deviceId, "geofencealarm")}}>
                    <GeofenceAlarm/>
                </IconWrapper>
                <IconWrapper onClick={() => {triggerAlarm(safemate.deviceId, "selfcheckalarm")}}>
                    <SelfCheckAlarm/>
                </IconWrapper>
                <IconWrapper onClick={() => {triggerAlarm(safemate.deviceId, "turnedoffalarm")}}>
                    <TurnedOffAlarm/>
                </IconWrapper>
            </InfoRow>
        </StyledGrid>
        </Container>
    )

}

export default Safemate;