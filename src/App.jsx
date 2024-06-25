import useCounterStore from "./store/useCounterStore";

function App() {
  const { count, increment, decrement, reset } = useCounterStore();
  return (
    <>
      <div className="flex flex-col w-3/12 gap-6 p-4 m-4">
        <h1 className="p-4 rounded-lg bg-slate-500">Count: {count}</h1>
        <button className="btn" onClick={increment}>
          +Increment
        </button>
        <button className="btn" onClick={decrement}>
          -Decrement
        </button>
        <button className="btn" onClick={reset}>
          Reset
        </button>
      </div>
    </>
  );
}

export default App;
