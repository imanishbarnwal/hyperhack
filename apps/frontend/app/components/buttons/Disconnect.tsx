import { disconnect } from "@wagmi/core";

export default function Disconnect() {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={async () => {
        await disconnect();
      }}
    >
      Disconnect
    </button>
  );
}
