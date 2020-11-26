import React from "react";
import { Icon, Item, Header, ItemGroup, ItemContent, Dropdown, Container, Form, Grid, Button } from "semantic-ui-react";


function ElegirCurso(props) {
    const header = "Inscribir en Curso";
    return (
        <Grid container>
            <Grid.Row columns='1'>
                <Header as='h2'>
                    { header }
                </Header>
            </Grid.Row>
            <Grid.Row  centered verticalAlign='middle'>
                <Form>
                    <Form.Group>
                        <Form.Dropdown selection options={ props.opciones }>

                        </Form.Dropdown>
                        <Form.Button basic icon><Icon name='save'></Icon></Form.Button>
                    </Form.Group>
                </Form>
            </Grid.Row>
        </Grid>
    );
};

export default ElegirCurso;

