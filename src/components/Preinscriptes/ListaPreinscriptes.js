import Axios from 'axios';
import React, { Component } from 'react';
import {Button, Container, Dimmer, Dropdown, Header, Icon, Loader, Message, Select, Table} from "semantic-ui-react";
import iconoPreinscripte from '../../assets/reading-book.png';
import GenericModal from '../Modal/GenericModal';
import Preinscripte from './Preinscripte';

class ListaPreinscriptes extends Component {

    headers = ['Nombre Completo','Zona','Información'];
    URL_Preinscriptes = 'https://nahual-datos-estudiantes.herokuapp.com/api/estudiantes/DTO?estadoId=1';
    URL_Periodos = 'https://nahual-datos-estudiantes.herokuapp.com/api/periodos?estado=true';

    constructor(){
        super();
        this.state = {  
            abierto:false,
            preInscriptes: Array(0),
            preinscriptesSeleccionados: Array(0),
            cursos: [],
            cursoSeleccionado:'',
            estaCargando:false,
            mensaje:''
        }
    }

    async obtenerPeriodos(){
        let cursoslist = Array(0);
        try {
            let res = await Axios.get(this.URL_Periodos);
            res.data.response.map((curso)=>{
                cursoslist.push({
                    key:curso.id,
                    value:curso.anio + ' - ' + curso.periodo + ' - ' + curso.topico.nombre,
                    text: curso.anio + ' - ' + curso.periodo + ' - ' + curso.topico.nombre
                })
            })
            this.setState({cursoSeleccionado: cursoslist[0].text})
            this.setState({cursos: cursoslist})
            return cursoslist[0].text;
        } catch (error) {
            throw error;
        }
       
    }

    async obtenerPreinscriptes(modulo) {
        try {
            var res = await Axios.get(this.URL_Preinscriptes+`&modulo=${modulo}`);
            this.setState({preInscriptes: res.data.response});
            this.setState({estaCargando:false});
        } catch (error) {
            throw error;
        }
      }

    async cargarDatos(){
        this.setState({estaCargando:true});
        try {
            var primerModulo = await this.obtenerPeriodos();
            await this.obtenerPreinscriptes(primerModulo);
        } catch (error) {
            this.setState({estaCargando:false});
            this.setState({mensaje:"Oops..algo malo pasó"});
        }
        
    }

    componentDidMount(){
       this.cargarDatos();
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

    cambiarCurso(curso){
        this.setState({cursoSeleccionado: curso });
        this.obtenerPreinscriptes(curso);
    }

    mostrarMensaje(){
        if(this.state.mensaje==="" && this.state.preInscriptes.length===0){
            this.setState({mensaje:`Actualmente no existen personas registradas en este curso.`})
        }
        return(
            this.state.preInscriptes.length===0&&
            <Message
            icon="warning sign"
            warning
            header={this.state.mensaje}
            content={`Intenta mas tarde.`}
            />
        )
    }

    handleChange = (e, { value }) => this.cambiarCurso(value);

    render(){
        return(
        <Container>
            {this.state.estaCargando &&
                <Dimmer active inverted>
                    <Loader inverted>Cargando</Loader>
                </Dimmer>
            }
            
            <Header center="true" as='h1' image={iconoPreinscripte} textAlign="center" content='Lista de Pre-Inscriptes'/>
            <Container textAlign="center">
            <Dropdown
                placeholder={this.state.cursos[0] && this.state.cursos[0].text}
                selection
                options={this.state.cursos}
                value={this.state.cursoSeleccionado}
                onChange={this.handleChange}
            />
            </Container>
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
                            <Table.Cell>{preinscripte.zona}</Table.Cell>
                            <Table.Cell>{this.obtenerPreinscripte(preinscripte)}</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>

            </Table>
            {this.mostrarMensaje()}
            </Container>
            )
        }
}

export default ListaPreinscriptes;