import {Cell} from '../cell'

export function Board (props) {
    return (
        <div>
            {props.gameState.map((cells) => <div>
                {cells.map(() => <Cell />)}
            </div>)}
        </div>
    )
}
