function assertNever(arg) {
    throw new Error('Never reached state: ' + arg);
}
export class GameController {
    gameState = null;
    init(initialState) {
        this.gameState = initialState;
    }
    runGame() {
        if (!this.gameState) {
            return [];
        }
        let newGameState = this.getNextState();
        while (!this.isFinished(newGameState)) {
            this.gameState = newGameState;
            newGameState = this.getNextState();
        }
        return this.gameState;
    }
    clear() {
        this.gameState = [];
    }
    get size() {
        return this.gameState.length;
    }
    isFinished(newState) {
        return JSON.stringify(this.gameState) === JSON.stringify(newState);
    }
    getNextState() {
        const newState = [];
        this.gameState.forEach((cellArr, y) => {
            newState[y] = [];
            cellArr.forEach((cell, x) => {
                newState[y][x] = this.changeCellState({
                    address: { x, y },
                    state: cell
                });
            });
        });
        return newState;
    }
    changeCellState(cell) {
        switch (cell.state) {
            case 'alive':
                return this.changeAlive(cell);
            case 'dead':
                return this.changeDead(cell);
            default:
                assertNever(cell.state);
        }
    }
    changeDead(cell) {
        const deadNeighbours = this.getNeighbours(cell.address).filter(({ x, y }) => this.gameState[y][x] === 'dead');
        return deadNeighbours.length === 3 ? 'alive' : 'dead';
    }
    changeAlive(cell) {
        const aliveNeighbours = this.getNeighbours(cell.address).filter(({ x, y }) => this.gameState[y][x] === 'alive');
        return aliveNeighbours.length === 2 || aliveNeighbours.length === 3 ? 'alive' : 'dead';
    }
    getNeighbours({ x, y }) {
        const left = { x: x - 1, y };
        const right = { x: x + 1, y };
        const leftBottom = { x: x - 1, y: y + 1 };
        const rightBottom = { x: x + 1, y: y + 1 };
        const bottom = { x, y: y + 1 };
        const top = { x, y: y - 1 };
        const leftTop = { x: x - 1, y: y - 1 };
        const rightTop = { x: x + 1, y: y - 1 };
        return [
            rightTop, rightBottom, leftTop, top, bottom, leftBottom, right, left
        ].map((c) => this.fixCoordinate(c));
    }
    fixCoordinate({ x, y }) {
        let newX = x, newY = y;
        const lastIndex = this.size - 1;
        if (x < 0) {
            newX = lastIndex;
        }
        if (x > lastIndex) {
            newX = 0;
        }
        if (y < 0) {
            newY = lastIndex;
        }
        if (y > lastIndex) {
            newY = 0;
        }
        return {
            x: newX,
            y: newY
        };
    }
}
export const game = new GameController();
