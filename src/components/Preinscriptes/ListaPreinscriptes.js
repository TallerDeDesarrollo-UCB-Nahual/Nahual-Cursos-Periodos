import React, { Component } from 'react';
import {Button, Header, Icon, Table} from "semantic-ui-react";
import iconoPreinscripte from '../../assets/reading-book.png';
import GenericModal from '../Modal/GenericModal';
import Preinscripte from './Preinscripte';

class ListaPreinscriptes extends Component {

    headers = ['Nombre Completo','Curso de interes','Zona','Acciones'];
    URL_Preinscriptes = 'https://nahual-datos-estudiantes.herokuapp.com/api/estudiantes/DTO?estadoId=1';

    constructor(){
        super();
        this.state = {  
            abierto:false,
            preInscriptes: Array(0),
            preinscriptesSeleccionados: Array(0)
        }
    }

    async obtenerPreinscriptes() {
        var res = await fetch(this.URL_Preinscriptes);
        res = await res.json();
        this.setState({preInscriptes: res.response});
      }

    componentDidMount(){
       this.obtenerPreinscriptes();
    }

    obtenerPreinscripte(preinscripte){
        return(
            <GenericModal 
                trigger={<Button circular basic color="green" icon><Icon color="black" name="eye"></Icon></Button>}
            >
                <Preinscripte preinscripte={preinscripte} />
            </GenericModal>
        )
    }

    seleccionarPreinscripte(preinscripte,event){
        if (event.target.checked) {
            this.setState({
              preinscriptesSeleccionados: this.state.preinscriptesSeleccionados.concat(
                preinscripte
              )
            });
          } else {
            this.state.preinscriptesSeleccionados.map(() => {
              return this.setState({
                  preinscriptesSeleccionados: this.state.preinscriptesSeleccionados.filter(
                  (e) => e.id !== preinscripte.id
                )
              });
            });
        }
    }

    seleccionarTodosPreinscriptes(event){
        this.cambiarEstadoCheckBoxes(event.target.checked)
        if(event.target.checked){
            this.setState({preinscriptesSeleccionados:this.state.preInscriptes});
        }
        else{
            this.setState({preinscriptesSeleccionados:Array(0)});
        }
    }

    cambiarEstadoCheckBoxes(estado){
        var checkboxes = Array.from(document.getElementsByName("checkBox"));
        checkboxes = checkboxes.map((checkbox)=>checkbox.checked=estado);
    }


    render(){
        return(
        <div style={{marginBottom:'30px',marginTop:'10px'}}>
            <Header center="true" as='h1' image={iconoPreinscripte} textAlign="center" content='Lista de Pre-Inscriptes'/>
            <Table singleLine selectable striped unstackable>
                <Table.Header style={{backgroundColor:'#282c34'}}>
                <Table.Row>
                    <Table.HeaderCell textAlign="center">
                        <input
                            type="checkbox"
                            name="checkBoxAll"
                            onClick={(e) => this.seleccionarTodosPreinscriptes(e)}
                            style={{ transform: "scale(1.4)" }}
                        />
                    </Table.HeaderCell>
                    {this.headers.map((data,index)=>
                        <Table.HeaderCell key={index} >{data}</Table.HeaderCell>
                    )}
                </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.preInscriptes.map((preinscripte)=>
                        <Table.Row key={preinscripte.id}>
                            <Table.Cell textAlign='center' >
                                <input
                                    type="checkbox"
                                    name="checkBox"
                                    id={preinscripte.id}
                                    style={{ transform: "scale(1.4)" }}
                                    onClick={(e) => this.seleccionarPreinscripte(preinscripte,e)}
                                />
                            </Table.Cell>
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