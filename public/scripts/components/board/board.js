import { Cell } from '../cell';
export function Board(props) {
  return /*#__PURE__*/React.createElement("div", null, props.gameState.map(function (cells) {
    return /*#__PURE__*/React.createElement("div", null, cells.map(function () {
      return /*#__PURE__*/React.createElement(Cell, null);
    }));
  }));
}