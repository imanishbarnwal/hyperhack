import { connect } from "@wagmi/core";
import { useConnect } from "wagmi";

export default function Connect() {
  const { connectors } = useConnect();

  return (
    <button
      className="bg-secondary-300 hover:bg-secondary-700 text-white font-bold py-2 px-4 rounded"
      onClick={async () => {
        const res = await connect({ connector: connectors[0] });
        console.log(res);
      }}
    >
      Connect
    </button>
  );
}
