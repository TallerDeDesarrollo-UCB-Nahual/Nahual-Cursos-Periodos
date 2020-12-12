import React, { useEffect, useState } from 'react';
import ReactExport from "react-data-export";
import { Button } from "semantic-ui-react";
import moment from "moment";
import "moment/locale/es";

const Exportar = (props)=>{

    const estilos = {
        fill: { fgColor: { rgb: "81ce32" } },
        font: { bold: true, sz: 14, color: { rgb: "ffffff" } },
        alignment: { vertical: "center", horizontal: "center" },
        border: {
          top: { style: "medium", color: { rgb: "66a527" } },
          bottom: { style: "medium", color: { rgb: "66a527" } },
          left: { style: "medium", color: { rgb: "66a527" } },
          right: { style: "medium", color: { rgb: "66a527" } }
        }
      };

    const [deshabilitado, setDeshabilitado] = useState(false)
    const [fechaDescarga, setFechaDescarga] = useState(moment(Date.now()).format("LL"))

    const [conjuntoDeDatos, setConjuntoDeDatos] = useState(
        {
          columns: [
            {
              title: "Nro.",
              width: { wpx: 40 },
              style: estilos
            },
            {
              title: "Nombre y Apellido",
              width: { wpx: 200 },
              style: estilos
            },
            {
              title: "Correo Electrónico",
              width: { wpx: 200 },
              style: estilos
            },
            {
              title: "Teléfono",
              width: { wpx: 110 },
              style: estilos
            },
            {
              title: "Nodo",
              width: { wpx: 90 },
              style: estilos
            },
            {
              title: "Fecha de Nacimiento",
              width: { wpx: 200 },
              style: estilos
            }
          ]
        }
      )

    const ArchivoExcel = ReactExport.ExcelFile;
    const HojaExcel = ReactExport.ExcelFile.ExcelSheet;

    useEffect(()=>{
        if (props.seleccionados.length === 0){
            setDeshabilitado(true);
        }
        if (props.seleccionados.length > 0)
        {
            setDeshabilitado(false);
            const filas = props.seleccionados.map((alumne, index) => {
               return generarFila(alumne, index);
            });
            setConjuntoDeDatos({...conjuntoDeDatos,data : filas})
        }
    },[props.seleccionados])
    
    function PrimeraLetraEnMayuscula(str) {
        return str.replace(/\b\w/g, (l) => l.toUpperCase());
      }

    const generarFila = (alumne, numeroDeFila) => {
        const fechaDeNacimiento = alumne.fechaNacimiento
          ? moment(alumne.fechaNacimiento).format("LL")
          : "";
        return [
          numeroDeFila + 1,
          PrimeraLetraEnMayuscula(alumne.nombre + " " + alumne.apellido),
          alumne.correo,
          alumne.celular,
          alumne.nodo,
          fechaDeNacimiento
        ];
      };
      
    return (
          <ArchivoExcel
            filename={`Alumnes Exportados-${fechaDescarga}`}
            element={
                <Button 
                color='green' 
                onClick={props.deseleccionarPreinscriptes} 
                floated='right'
                content='Exportar'
                icon="download"
                disabled={deshabilitado}
                label={{
                    basic: true,
                    color: "green",
                    pointing: "left",
                    content: props.seleccionados.length
                  }}
                />
            }
          >
            <HojaExcel dataSet={[conjuntoDeDatos]} name="Alumnes"></HojaExcel>
          </ArchivoExcel>
    );
}

export default Exportar