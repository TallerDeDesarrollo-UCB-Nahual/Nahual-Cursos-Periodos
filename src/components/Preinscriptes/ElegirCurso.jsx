import Axios from "axios";
import React, { useState } from "react";
import BASE_ROUTE from "../../servicios/rutas";
import { Icon, Header, Form, Grid, Message } from "semantic-ui-react";

const URL_INSCRITE = `${BASE_ROUTE}/inscriptos`;

function ElegirCurso(props) {

    const [cursoId, setCursoId] = useState(null);
    const [esSatisfactorio, setEsSatisfactorio] = useState(null);

    // const header = "Inscribir en Curso";

    const handleForm = async () => {
        const body = props.preinscrites.map(preinscrite => {
            preinscrite.cursoId = cursoId;
            preinscrite.estudianteId = preinscrite.id;
            delete preinscrite.id;
            return preinscrite;
        });
        
        let res = null;
        try {
            res = await Axios.post(URL_INSCRITE, body);
            setEsSatisfactorio(true);   
        } catch (error) {
            setEsSatisfactorio(false);
        }
    }

    const formNormal = (
        <Form.Group>
            <Form.Dropdown selection
            fluid 
            options={ props.opciones } 
            placeholder='Seleccione el curso' 
            onChange={ (e, { value }) => setCursoId(value) }
            />
            { cursoId && <Form.Button color="green" basic icon><Icon name='save'></Icon>Inscribir</Form.Button> }
        </Form.Group>
    );

    const formSatisfactorio = (
        <>
            <Message
            success
            header='Completado'
            content="Inscripción satisfactoria"
            />
            { esSatisfactorio && window.location.reload() }
        </>
    );

    const formErroneo = (
        <Message
        error
        header='Error'
        content='Hubo un error al inscribir'
        />
    );

    return (
        <div style={{marginBottom: "50px",marginTop: "50px"}}>
            <Grid container>
                <Grid.Row  centered verticalAlign='middle'>
                    <Form onSubmit={ handleForm } success error>
                        { esSatisfactorio === null ? formNormal : (esSatisfactorio ? formSatisfactorio : formErroneo) }
                    </Form>
                </Grid.Row>
            </Grid>
        </div>
        
    );
};

export default ElegirCurso;

