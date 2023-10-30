import { disconnect } from "@wagmi/core";

export default function Disconnect() {
  return (
    <button
      className="bg-secondary-300 hover:bg-secondary-700 text-white font-bold py-2 px-4 rounded"
      onClick={async () => {
        await disconnect();
      }}
    >
      Disconnect
    </button>
  );
}
