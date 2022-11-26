import './App.css';

function App() {
  return (
    <div id='app'>
      <div className='grid'>
        <div id='display'>
          <input type='text' />
        </div>
        <div id='clear' className='padButton'>AC</div>
        <div id='divide' className='padButton operator'>/</div>
        <div id='multiply' className='padButton operator'>x</div>
        <div id='seven' className='padButton number'>7</div>
        <div id='eight' className='padButton number'>8</div>
        <div id='nine' className='padButton number'>9</div>
        <div id='subtract' className='padButton operator'>-</div>
        <div id='four' className='padButton number'>4</div>
        <div id='five' className='padButton number'>5</div>
        <div id='six' className='padButton number'>6</div>
        <div id='add' className='padButton operator'>+</div>
        <div id='one' className='padButton number'>1</div>
        <div id='two' className='padButton number'>2</div>
        <div id='three' className='padButton number'>3</div>
        <div id='equals' className='padButton'>=</div>
        <div id='zero' className='padButton number'>0</div>
        <div id='decimal' className='padButton number'>.</div>
      </div>
    </div>
  );
}

export default App;
