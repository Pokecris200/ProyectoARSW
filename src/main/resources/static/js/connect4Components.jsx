

class Tablero extends React.Component{
    
    constructor(props) {
        super(props);
        this.comunicationWS =
                new WSC4Channel(C4ServiceURL(),
                        (msg) => { 
                        var obj = JSON.parse(msg);
                        console.log("On func call back ", msg);
                        this.putToken(obj.c); 
                });
        
        this.state = {
          jugador1: 1,
          jugador2: 2,
          currentPlayer: null,
          tablero: [],
          gameOver: false,
          finalMSG: ''
        };

        this.juego = this.juego.bind(this);
    }

    // Inicia un nuevo Juego
    startBoard() {
        // Crea una matriz de juego de 6x7
        let tablero = [];
        for (let f = 0; f < 6; f++) {
          let fila = [];
          for (let c = 0; c < 7; c++) { fila.push(null) }
          tablero.push(fila);
        }

        this.setState({
          tablero,
          currentPlayer: this.state.jugador1,
          gameOver: false,
          finalMSG: ''
        });
    }

    togglePlayer() {
        return (this.state.currentPlayer === this.state.jugador1) ? this.state.jugador2 : this.state.jugador1;
    }

    juego(c) {
        if (!this.state.gameOver) {
            this.putToken(c);
            let wsreference = this.comunicationWS;
            wsreference.send(c);
        } else {
            this.setState({ finalMSG: 'Game over. Inicie un nuevo Juego.' });
        }
    }
    
    putToken(c){
        // Coloca una ficha en el tablero
        let tablero = this.state.tablero;
        for (let f = 5; f >= 0; f--) {
            if (!tablero[f][c]) {
                tablero[f][c] = this.state.currentPlayer;
                break;
            }
        }

        // Revisa el estado del tablero
        let result = this.checkAll(tablero);
        if (result === this.state.jugador1) {
            this.setState({tablero, gameOver: true, finalMSG: '¡Rojo Gana!'});
        } else if (result === this.state.jugador2) {
            this.setState({tablero, gameOver: true, finalMSG: '¡Amarillo Gana!'});
        } else if (result === 'empate') {
            this.setState({tablero, gameOver: true, finalMSG: 'Empate :('});
        } else {
            this.setState({tablero, currentPlayer: this.togglePlayer()});
        }
    }

    checkVertical(tablero) {
        for (let f = 3; f < 6; f++) {
            for (let c = 0; c < 7; c++) {
                if (tablero[f][c]) {
                    if (tablero[f][c] === tablero[f - 1][c] &&
                        tablero[f][c] === tablero[f - 2][c] &&
                        tablero[f][c] === tablero[f - 3][c]) {
                      return tablero[f][c];    
                    }
                }
            }
        }
    }

    checkHorizontal(tablero) {
        for (let f = 0; f < 6; f++) {
            for (let c = 0; c < 4; c++) {
                if (tablero[f][c]) {
                    if (tablero[f][c] === tablero[f][c + 1] && 
                        tablero[f][c] === tablero[f][c + 2] &&
                        tablero[f][c] === tablero[f][c + 3]) {
                      return tablero[f][c];
                    }
                }
            }
        }
    }

    checkDiagonalDerecha(tablero) {
        for (let f = 3; f < 6; f++) {
            for (let c = 0; c < 4; c++) {
                if (tablero[f][c]) {
                    if (tablero[f][c] === tablero[f - 1][c + 1] &&
                        tablero[f][c] === tablero[f - 2][c + 2] &&
                        tablero[f][c] === tablero[f - 3][c + 3]) {
                      return tablero[f][c];
                    }
                }
            }
        }
    }
  
    checkDiagonalIzquierda(tablero) {
        for (let f = 3; f < 6; f++) {
            for (let c = 3; c < 7; c++) {
                if (tablero[f][c]) {
                    if (tablero[f][c] === tablero[f - 1][c - 1] &&
                        tablero[f][c] === tablero[f - 2][c - 2] &&
                        tablero[f][c] === tablero[f - 3][c - 3]) {
                      return tablero[f][c];
                    }
                }
            }
        }
    }
  
    checkDraw(tablero) {
        for (let f = 0; f < 6; f++) {
            for (let c = 0; c < 7; c++) {
                if (tablero[f][c] === null) {
                  return null;
                }
            }
        }
        return 'empate';    
    }
  
    checkAll(tablero) {
        return this.checkVertical(tablero) || this.checkDiagonalDerecha(tablero) || this.checkDiagonalIzquierda(tablero) || this.checkHorizontal(tablero) || this.checkDraw(tablero);
    }
  
    componentWillMount() {
        this.startBoard();
    }
    
    findColor(){
        let color = 'circle purple';
        if (this.state.currentPlayer === 1) {
            color = 'circle red-sm';
        } else if (this.state.currentPlayer === 2) {
            color = 'circle yellow-sm';
        }
        return color;
    }
  
    render() {
        return (
          <div>
            <div class="circles">
                <div class={this.findColor()}></div>
                <div class={this.findColor()}></div> 
                <div class={this.findColor()}></div>
                <div class={this.findColor()}></div>
                <div class={this.findColor()}></div>
                <div class={this.findColor()}></div> 
                <div class={this.findColor()}></div>
                <div class={this.findColor()}></div>
            </div>
            <div className="button" onClick={() => {this.startBoard()}}>New Game</div>

            <table>
              <thead>
              </thead>
              <tbody>
                {this.state.tablero.map((fila, i) => (<Row key={i} fila={fila} juego={this.juego} />))}
              </tbody>
            </table>

            <p className="finalMSG">{this.state.finalMSG}</p>
          </div>
        );
    }
};

class WSC4Channel {
    constructor(URL, callback) {
            this.URL = URL;
            this.wsocket = new WebSocket(URL);
            this.wsocket.onopen = (evt) => this.onOpen(evt);
            this.wsocket.onmessage = (evt) => this.onMessage(evt);
            this.wsocket.onerror = (evt) => this.onError(evt);
            this.receivef = callback;
    }
    onOpen(evt) {
        console.log("In onOpen", evt);
    }
    onMessage(evt) {
        console.log("In onMessage", evt);
        if (evt.data !== "Connection established.") {
            this.receivef(evt.data);
        }
    }
    onError(evt) {
        console.error("In onError", evt);
    }
    send(x) {
        let msg = '{ "c": ' + (x)+"}";
        console.log("sending: ", msg);
        this.wsocket.send(msg);
    }
}

function C4ServiceURL() {
    var host = window.location.host;
    var url = 'ws://' + (host) + '/c4Service';
    console.log("URL Calculada: " + url);
    return url;
}

const Row = ({ fila, juego }) => {
  return (
    <tr>
      {fila.map((cell, i) => <Cell key={i} value={cell} columnIndex={i} juego={juego} />)}
    </tr>
  );
};

const Cell = ({ value, columnIndex, juego }) => {
  let color = 'white';
  if (value === 1) {
    color = 'red';
  } else if (value === 2) {
    color = 'yellow';
  }
    
  return (
    <td>
      <div className="cell" onClick={() => {juego(columnIndex)}}>
        <div className={color}></div>
      </div>
    </td>
  );
};

ReactDOM.render(<Tablero/>,document.getElementById('root'));