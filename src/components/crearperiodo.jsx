import React, {useEffect, useState} from "react";
import { Form, FormInput, FormGroup } from "shards-react";

export default function NuevoPeriodo() {
    return ( 
        <div>
            <form>
                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="inputCity">Año</label>
                    <input type="text" class="form-control" id="inputCity"/>
                    </div>
                    <div class="form-group col-md-6">
                    <label for="inputState">Estado</label>
                    <select id="inputState" class="form-control">
                        <option>Activo</option>
                        <option>Inactivo</option>
                    </select>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Sign in</button>
            </form> 
        </div>
    )
}