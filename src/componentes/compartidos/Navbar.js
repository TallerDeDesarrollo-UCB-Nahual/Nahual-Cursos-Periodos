import React, { Component } from 'react';
import logo from '../../recursos/imagenes/logo.png';
import '../../estilos/Navbar.css';

export default class Navbar extends Component {
    render() {
        return (
        	<div class="menu">
            <img src={logo} className="logo" alt="Nahual logo"></img> 
            <label className="nav-titulo">GESTOR DE CURSOS</label>
            </div>
        );
    }
}