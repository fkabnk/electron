import React from "react";
import Axios from "axios";
import styled from "styled-components";

const Table = styled.table`
    width:100%;
`;

const Tr = styled.tr`

    background: ${props => props.theme.colors.backgroundPrimary};
    color:white;
    border: ${props => props.theme.colors.border};

`;

const Td = styled.td`

    padding:15px;
    text-align:center;

`;

const FillerTr = styled.tr`
    
`;

export default class Safemates extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            safemates: []
        }
        this.loadSafemates = this.loadSafemates.bind(this);
    }

    componentDidMount(){
        this.loadSafemates();
    }

    loadSafemates(){

        Axios.get("https://cw1.safemate.no/ajax/device/devicewithstatusforuser/0/0")
            .then(response => {
                console.log(response);
                this.setState({safemates: response.data});
            })
            .catch(error => {
                const errorCode = error.response.status;
                if(errorCode == 403){
                    props.history.push('/login');
                }
            })
        
    }

    render(){

        console.log(this.state.safemates);

        const safemates = this.state.safemates.map(safemate => <Safemate key={safemate.deviId} safemate={safemate} history={this.props.history} />);

        return(
            <div style={{padding:"15px"}}>
            <Table>
                <tbody>
                    {safemates}
                </tbody>
            </Table>
            </div>
        )
    }
}

const Safemate = ({safemate, history}) => {

    const battery = getBatteryIcon(safemate.battery);

    return(
            <Tr onClick={() => history.push({pathname: '/safemate', safemate: safemate})} >
                <Td>{safemate.detyName}</Td>
                <Td>{safemate.deviceName}</Td>
                <Td><i class={`fa ${battery}`}></i></Td>
                <Td>{safemate.deviceId}</Td>
            </Tr>

    )

}

const getBatteryIcon = ({battery}) => {

    let className = "";

    if(battery < 5){
        className = "fa-battery-empty"; 
    }
    else if(battery < 35){
        className = "fa-battery-quarter";
    }
    else if(battery < 65){
        className = "fa-battery-half";
    }
    else if(battery < 90){
        className = "fa-battery-three-quarters";
    }
    else{
        className = "fa-battery-full";
    }
    return className;

}