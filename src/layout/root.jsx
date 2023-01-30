import {GameController} from "../model/index.js";

export function Cell (props) {
    return (<div className="cell">
        {props.content}
    </div>)
}

export function Board (props) {
    return (
        <div>
            {props.gameState.map((cells, index) =>
                <div key={index}>
                    {cells.map((state, index) => <Cell key={index} content={state}/>)}
                </div>
            )}
        </div>
    )
}

class Root extends React.Component {
    constructor() {
        super()
        this.state = {
            game: new GameController()
        }
        this.state.game.init([['dead', 'dead', 'dead'],
            ['dead', 'alive', 'dead'],
            ['dead', 'dead', 'dead']])
    }

    runGame () {
        this.state.game.runGame()
    }

    render () {
        return (
            <div>
                <Board gameState={this.state.game.gameState}/>
                <button onClick={() => { this.runGame() }}></button>
            </div>
        )
    }
}



const root = ReactDOM.createRoot(document.querySelector('#game-of-life'));
root.render(<Root />);
