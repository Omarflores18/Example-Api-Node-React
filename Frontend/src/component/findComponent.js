import React from "react";
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

class findComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sku: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({sku: event.target.value});
      }

   
        handleSubmit(event) {

        alert( this.state.sku);
        event.preventDefault();
    }

    render() {
        return (
            <div class="forms">
                <Form onSubmit={this.handleSubmit}>
                    <div class="form-group">
                        <Form.Label >Ususario con autenticación</Form.Label>
                        <Form.Control  onChange={this.handleChange} class="form-control" id="sku-auth" placeholder="Busqueda por SKU"></Form.Control>
                    </div>
                    
                    <Button type="submit" class="btn btn-primary">Buscar</Button>
                </Form>
                <Form>
                    <div class="form-group">
                        <Form.Label >Ususario sin autenticación</Form.Label>
                        <Form.Control type="email" class="form-control" id="sku-noauth" placeholder="Busqueda por SKU"></Form.Control>
                    </div>
                    <Button type="submit" class="btn btn-primary">Buscar</Button>
                </Form>
            </div>
        );
    }
}



export default findComponent;