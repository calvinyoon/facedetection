import React from 'react';
import Logo from '../Logo/Logo';
import './Navigation.css';

const Navigation = ({onRouteChange, route}) => {
	console.log('nav onroutechange', onRouteChange)
	if (route === 'home') {
		return (
			<nav>
				<Logo />
				<p onClick={() => onRouteChange('signout')} className="userformbuttons">Sign Out</p>
			</nav>
		)
	} else {
		return (
			<nav>
				<Logo />
				<div className='toprightcontainer'>
					<p onClick={() => onRouteChange('signin')} className="userformbuttons">Sign In</p>
					<p onClick={() => onRouteChange('register')} className="userformbuttons">Register</p>
				</div>
			</nav>
		)
	
	}
}

export default Navigation