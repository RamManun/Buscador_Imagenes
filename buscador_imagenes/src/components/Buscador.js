import React, { Component } from 'react';

class Buscador extends Component {

    buscarRef = React.createRef();

    handleSubmit = (e) => {
        e.preventDefault();

        //Leerlo el valor
        const termino = this.buscarRef.current.value;
        //enviar los valores
        this.props.datosBusqueda(termino)

    }
    render() { 
        return ( 
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="form-group col-md-8">
                        <input ref={this.buscarRef} className="form-control form-control-lg" type="text"
                        placeholder="Busca tu imagen, ejemplo: Anime"/> 
                    </div>
                    <div className="form group col-md-4">
                        <input type="submit" className="btn btn-lg btn-danger btn-block" value="Buscar..."/>

                    </div>
                </div>
            </form>
         );
    }
}
 
export default Buscador;