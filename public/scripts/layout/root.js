import { GameController } from "../model/index.js";
export function Cell(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "cell"
  }, props.content);
}
export function Board(props) {
  return /*#__PURE__*/React.createElement("div", null, props.gameState.map((cells, index) => /*#__PURE__*/React.createElement("div", {
    key: index
  }, cells.map((state, index) => /*#__PURE__*/React.createElement(Cell, {
    key: index,
    content: state
  })))));
}
class Root extends React.Component {
  constructor() {
    super();
    this.state = {
      game: new GameController()
    };
    this.state.game.init([['dead', 'dead', 'dead'], ['dead', 'alive', 'dead'], ['dead', 'dead', 'dead']]);
  }
  runGame() {
    this.state.game.runGame();
  }
  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Board, {
      gameState: this.state.game.gameState
    }), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        this.runGame();
      }
    }));
  }
}
const root = ReactDOM.createRoot(document.querySelector('#game-of-life'));
root.render( /*#__PURE__*/React.createElement(Root, null));