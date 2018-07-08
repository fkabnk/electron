import styled from "styled-components";
import {Grid, Row, Col} from "react-bootstrap";

export const Container = styled.div`

  margin:5% 10%;
  background: ${props => props.theme.colors.backgroundPrimary};
  border: ${props => props.theme.colors.border};

`;

export const IconWrapper = styled.span`
    margin: 0 15px;
    cursor:pointer;
`;

export const H5 = styled.h5`
    color:${props => props.theme.colors.textPrimary};
`;

export const InfoRow = styled(Row)`
    color: ${props => props.theme.colors.accent};
    padding:5px;
`;

export const HeaderRow = styled(Row)`
    font-size:24px;
    padding-bottom:10px;
`;

export const StyledGrid = styled(Grid)`
    padding: 2.5% 7.5%;
`;

export const Span = styled.span`
    color: ${props => props.accent ? props.theme.colors.accent : "white"};
`;

export const StyledIcon = styled.i`
    font-size: 24px !important;
`;