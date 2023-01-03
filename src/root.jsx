function Root () {
    return (
        <div>Тест</div>
    )
}

const e = React.createElement;

const domContainer = document.querySelector('#game-of-life');
const root = ReactDOM.createRoot(domContainer);
root.render(e(Root));
