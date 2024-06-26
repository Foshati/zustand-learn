import { useCounterStore } from "../stores/useCounterStore";

export default function Counter() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div>
      <div className="flex flex-col w-40 gap-6 p-4 m-4">
        <h1 className="text-lg text-red-700">Counter</h1>

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
    </div>
  );
}
