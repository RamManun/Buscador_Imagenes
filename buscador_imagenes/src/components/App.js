import React, { Component } from 'react';
import Buscador from './Buscador'
import Resultado from './Resultado'
import '../css/Cargando.css'

class App extends Component {

  state={
    termino: '',
    imagenes: [],
    pagina: '',
    cargando: false
  }

  consultarApi = async () => {

    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=16186252-69f47fb7292b12766b538fdbe&q=${termino}&per_page=30&page=${pagina}`

    await fetch(url)
    .then(respuesta => {
      this.setState({
        cargando: true
      })
      return respuesta.json()
    })
    .then(resultado => {
      this.setState({
        imagenes : resultado.hits,
        cargando: false
      })
    } )
  }

  datosBusqueda = (termino) => {
    this.setState({
      termino: termino,
      pagina: 1
    }, () => {
      this.consultarApi();
    })
  }

  paginaAnterior = () => {
    let pagina = this.state.pagina
    if(pagina === 1) return null;
    pagina -= 1
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    })
  }

  paginaSiguiente = () => {
    let pagina = this.state.pagina
    pagina += 1
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    })
  }

  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');
  }

  render() { 
    const cargando = this.state.cargando;
    let resultado;
    if(cargando){
      resultado = <div class="spinner">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                  </div>
    }else{
      resultado = <Resultado
                    imagenes={this.state.imagenes}
                    paginaAnterior={this.paginaAnterior}
                    paginaSiguiente={this.paginaSiguiente}
                    />
    }

    return ( 
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imagenes</p>
          <Buscador
            datosBusqueda={this.datosBusqueda}
          />
        </div>
          <div className="row justify-content-center">
            {resultado}
          </div>
      </div>
     );
  }
}
 
export default App;
