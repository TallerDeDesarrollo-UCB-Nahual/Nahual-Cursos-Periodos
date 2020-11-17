import React, { Component } from 'react';
import logo from '../../../public/imagenes/logo.png';
import '../../../public/stylesheet/navbar.css';

export default class Navbar extends Component {

    render() {
        return (
            
            <div className="menu">
                <img src={logo} className="logo"></img>
                <label className="nav-titulo">Inscripciones</label>
                <div className="linea2"></div>

            </div>
        
        )
    }
}