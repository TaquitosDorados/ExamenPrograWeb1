import React, { Component } from 'react';
import Interrogacion from './img/interrogacion.png';
import Piedra from './img/piedra.png';
import Papel from './img/papel.png';
import Tijera from './img/tijera.png';
import "./Game.css";

class Game extends Component {
    constructor() {
        super();
        
        this.state = {
            jugador: "",
            rival: generateRandomNumber(4),
            puntosJugador: 0,
            puntosRival: 0,
            sourceJugador: Interrogacion,
            sourceRival: Interrogacion,
            message: "",
            clase: "",
        }
    }


    handleOnClick = e => {
        const{target:{id}} = e;
        this.setState({jugador: id,});

        const jugador = id;
        const rival = this.state.rival;
        const sourceJugador = handleImages(jugador);
        const sourceRival = handleImages(rival);

        this.setState({sourceJugador: sourceJugador})
        this.setState({sourceRival: sourceRival})

        let puntosJugador = this.state.puntosJugador;
        let puntosRival = this.state.puntosRival;

        if (puntosJugador == 2 || puntosRival == 2) {
            this.setState({puntosJugador: 0});
            this.setState({puntosRival: 0});
            puntosJugador = 0;
            puntosRival = 0;
            this.setState({message:""});
        }

        puntosJugador += darPuntos(jugador, rival);
        puntosRival += darPuntos(rival, jugador);

        this.setState({puntosJugador: puntosJugador});
        this.setState({puntosRival: puntosRival});

        if (puntosJugador == 2){
            this.setState({message: "Ganaste"});
            this.setState({clase: "green"});
        }

        if (puntosRival == 2){
            this.setState({message: "Perdiste"});
            this.setState({clase: "red"});
        }

        const random = generateRandomNumber(4);

        this.setState({rival:random})
    }

    

    render() {
        return (
            <div>
                <div>
                    <h3 id="punt">{this.state.puntosJugador} ------------- {this.state.puntosRival}</h3>
                    <img src={this.state.sourceJugador} alt="?" className="imagen"></img>
                    <img src={this.state.sourceRival} alt="?" className="imagen"></img>
                    <p>Tu //////////////// Bot</p>
                </div>
                <div>
                    <img src={Piedra} alt="Piedra" className="imagen" id = "1" onClick={this.handleOnClick}></img>
                    <img src={Papel} alt="Papel" className="imagen" id = "2" onClick={this.handleOnClick}></img>
                    <img src={Tijera} alt="Tijera" className="imagen" id = "3" onClick={this.handleOnClick}></img>
                    <br></br>
                    <h2 className={this.state.clase}>{this.state.message}</h2>
                </div>
            </div>
        );
    }
}

export default Game;

function generateRandomNumber(max, min=1){
    return Math.floor(Math.random()*(max-min)+min);
}

function handleImages (jugador_) {
    if(jugador_ == 1){
        return Piedra;
    } else if (jugador_ == 2){
        return Papel;
    } else {
        return Tijera;
    }
}

function darPuntos(yo, elotro){
    if(elotro==1){
        if(yo==2){
            return 1;
        } else if (yo == 3){
            return 0;
        } else {
            return 0;
        }
    } else if(elotro==2){
        if(yo==2){
            return 0;
        } else if (yo == 3){
            return 1;
        } else {
            return 0;
        }
    } else {
        if(yo==2){
            return 0;
        } else if (yo == 3){
            return 0;
        } else {
            return 1;
        }
    }
}