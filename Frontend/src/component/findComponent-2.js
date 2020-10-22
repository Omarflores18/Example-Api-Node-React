import React from "react";
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

class findComponent extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            products: [],
            sku: 0,
            dbsku: "",
            messages: "",
            valor: "",
            mensajeAlerta: "",

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {

    }

    handleChange(event) {
        this.setState({ sku: event.target.value });
    }

    handleSubmit(event) {

        if (this.state.sku.length < 5) {

            this.setState({
                mensajeAlerta :  <div className="alert alert-primary margin-top" role="alert">El SKU debe ser de 5 numeros </div>, 
                messages : "",
                dbsku : "",
            });

            

        }else{

            this.setState({
                mensajeAlerta : ""
            });

            let encoded = window.btoa('TOKEN:123');
            let auth = 'Basic ' + encoded;
    
            fetch('http://localhost:3000/products', {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': auth,
                    'Credentials': 'include'
    
                },
                body: JSON.stringify({
                    sku: this.state.sku
                })
    
            })
                .then(response => response.json())
                .then(res => {
    
                    console.log(res);
                    if (res && res.data) {
                        this.setState({
                            messages: res.data[0].descripcion,
                            dbsku: res.data[0].sku,
                            valor: res.data[0].valor,
    
                        })
                    }
                })
        }
        event.preventDefault();

    }

    renderProducts() {


        if (this.state.products.length > 0) {

            return this.state.products.map((val, key) => {
                return <div key={key} id="test"><label>{val.sku}</label>  <label>{val.descripcion}</label> </div>

            });
        }

    }

    render() {



        let row = <tr></tr>;

        if (this.state.valor === 0) {
            row =
                <tr>
                    <td colSpan="2">{this.state.messages}</td>
                </tr>
        } else if (this.state.valor === 1) {
            row =
                <tr>
                    <td>{this.state.dbsku}</td>
                    <td>{this.state.messages}</td>
                </tr>
        }

        return (

            <div className="forms">

            <div className="formulario"> 
            <Form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <Form.Label >Ususario con autenticación</Form.Label>
                        <Form.Control onChange={this.handleChange} type="number" className="form-control" id="sku-auth" placeholder="Busqueda por SKU"></Form.Control>
                    </div>

                    <Button type="submit" className="btn btn-primary">Buscar</Button>
                    
                </Form>
                {this.state.mensajeAlerta}
            </div>
                


                <div className="products" id="products">

                    <label>Detalle de busquedas</label>
                    <div id="showProducts">
                        <table className="table table-dark">
                            <thead>
                                <tr>
                                    <th>SKU</th>
                                    <th>Descripcion</th>

                                </tr>
                            </thead>
                            <tbody>
                                {row}
                            </tbody>
                        </table>
                        
                            
                        


                    </div>

                </div>

            </div>
        );
    }
}
export default findComponent;