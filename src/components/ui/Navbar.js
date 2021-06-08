import React from 'react';

export const Navbar = () => {
	return (
		<div className="navbar navbar-dark bg-dark mb-5">
			<span className="navbar-brand">Gato Tom</span>
			<button className="btn btn-outline-danger">
				<i className="fas fa-sign-out-alt"></i>
				<span>Salir</span>
			</button>
		</div>
	);
};
