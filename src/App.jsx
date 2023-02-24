import { useEffect } from 'react'
import './App.css'

import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, setValue } from './features/counter/counterSlice';
import { useGetPokemonByNameQuery } from './services/pokemon';

const renderPokemon = (data) => {
  return(
    <>
      <h3>{data.species.name}</h3>
      <img src={data.sprites.front_default} alt={data.species.name} height={200} width={200} />
    </>
  );
};

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const handleIncClick = () => dispatch(increment());
  const handleDecClick = () => dispatch(decrement());
  const handleOnChange = (event) => {
    let value = event.target.value;
    if (value === '') value = 1;
    dispatch(setValue(value));
  }

  useEffect(() => {
    // dispatch(setValue(Math.floor(Math.random() * (898 - 1) + 1)));
    dispatch(setValue(1));
  }, []);

  const { data, error, isLoading } = useGetPokemonByNameQuery(count);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to SteveO's Pokedex</h1>
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (renderPokemon(data)) : null}
        <p>Pokedex Number: {<input type='text' value={count} onChange={handleOnChange} />}</p>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '40%'
        }}>
          <button type="button" onClick={handleDecClick}>
            Previous Pokemon
          </button>
          <div />
          <button type="button" onClick={handleIncClick}>
            Next Pokemon
          </button>
        </div>
      </header>
    </div>
  )

};

export default App
