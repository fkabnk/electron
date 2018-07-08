import React from 'react';
import { NavItem, MenuItem, NavDropdown, Grid, Row, Col} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import styled from "styled-components";
import Logo from "../svg/logo";
import Safemate from '../svg/safemate';

const MenuCol = styled(Col)`

margin-left: auto;
`;

const StyledLinkContainer = styled(LinkContainer)`

	display:inline-block
	width: 87px;
	position:relative;
	text-align:center;

	a{
		display:block;
		padding: 25px 0;
		color: ${props => props.active ? "white" : props.theme.colors.textPrimary};
		opacity: 1;
		background-color: ${props => props.active ? props.theme.colors.accent: "inherit"};
		font-weight:bold;
		text-decoration:none;

		&:hover {
			color: ${props => props.theme.colors.textSecondary};
			text-decoration:none;
		}
	}

`;

const StyledUl = styled.ul`

	margin:0;


`;


const StyledRow = styled(Row)`
	display:flex;
	align-items:center;
	background-color: ${props => props.theme.colors.backgroundPrimary};
	padding: 0 50px;
`;

const H4 = styled.h4`
	color:white;
`;

const Navigation = props => {

	console.log(props, "NAV")

	let menuItems = props.menu.map(item => <Item key={item.link} item={item} handleClick={props.routeChange} />);
	console.log("rerender")
	return(
		<Grid>
			<StyledRow>
				<Col>
					<Logo/>
				</Col>
				<Col>
					<H4>
						{props.userInfo ? props.userInfo.name : null}
					</H4>
				</Col>
				<MenuCol>
					<StyledUl>
						{menuItems}
					</StyledUl>
				</MenuCol>
			</StyledRow>
		</Grid>
	)
}

const Item = ({item, handleClick}) =>{

	return(
		<StyledLinkContainer 
			active={window.location.hash.substr(1) === item.link} 
			key={item.link} 
			to={item.link}
			onClick={() => handleClick(item.link)}
		>
			<NavItem style={{display:"block", padding:"20px 30px"}} eventKey={item.link}>
				<span>
					<div style={{display:"inline"}}>
						{item.picture}
					</div>
				</span>
				<p style={{fontSize: "14px"}}>
					{item.text}
				</p>
			</NavItem>
		</StyledLinkContainer>
	)
}

const mapStateToProps = state => {
    return{
		userInfo: state.homepage.userInfo,
		active: state.router
    }
}

const mapDispatchToProps = dispatch => ({
	routeChange: data => dispatch({type: "ROUTE_CHANGE", data})
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

