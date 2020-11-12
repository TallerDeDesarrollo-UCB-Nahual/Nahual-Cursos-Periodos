import React, { Component } from 'react';
import {Button, Header, Icon, Table} from "semantic-ui-react";
import iconoPreinscripte from '../../assets/reading-book.png';
import GenericModal from '../Modal/GenericModal';
import Preinscripte from './Preinscripte';

class ListaPreinscriptes extends Component {

    headers = ['Nombre Completo','Curso de interes','Zona','Acciones'];

    constructor(){
        super();
        this.state = {  
            abierto:false,
            preInscriptes: Array(0),
            URL_Preinscriptes : 'https://nahual-test.herokuapp.com/api/egresades/DTO?estadoId=4'
        }
    }

    async obtenerPreinscriptes() {
        var res = await fetch(this.state.URL_Preinscriptes);
        res = await res.json();
        this.setState({preInscriptes: res.response});
      }

    componentDidMount(){
       this.obtenerPreinscriptes();
    }
    mostrarModal(value){
        this.setState({abierto:value})
    }

    obtenerPreinscripte(preinscripte){
        return(
            <GenericModal 
                trigger={<Button circular basic color="green" icon><Icon color="black" name="eye"></Icon> </Button>}
            >
                <Preinscripte preinscripte={preinscripte} />
            </GenericModal>
        )
    }


    render(){
        return(
        <div style={{marginBottom:'30px',marginTop:'30px'}}>
            <Header center="true" as='h1' image={iconoPreinscripte} textAlign="center" content='Lista de Pre-Inscriptes'/>
            <Table singleLine selectable striped unstackable>
                <Table.Header style={{backgroundColor:'#282c34'}}>
                <Table.Row>
                    {this.headers.map((data,index)=>
                        <Table.HeaderCell key={index} >{data}</Table.HeaderCell>
                    )}
                </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.preInscriptes.map((preinscripte)=>
                        <Table.Row key={preinscripte.id}>
                            <Table.Cell>{preinscripte.nombreCompleto}</Table.Cell>
                            <Table.Cell>{preinscripte.modulo}</Table.Cell>
                            <Table.Cell>{preinscripte.zona}</Table.Cell>
                            <Table.Cell>{this.obtenerPreinscripte(preinscripte)}</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
            </div>
            )
        }
}

export default ListaPreinscriptes;