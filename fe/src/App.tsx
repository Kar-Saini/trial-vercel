import { useEffect, useState } from "react";

const App = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onopen = () => {
      console.log("WebSocket connected");
    };
    ws.onclose = () => {
      console.log("WebSocket closed");
    };
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    setSocket(ws);
    // Cleanup on unmount
    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      console.log(JSON.stringify(msg));
      setMessage(JSON.stringify(msg));
    };
  }, [socket]);

  return (
    <div>
      <div>Hello</div>
      <div>
        <input
          type="text"
          name=""
          id=""
          className=""
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div
        onClick={() => {
          console.log("clicked");
          socket?.send(
            JSON.stringify({ type: "hello", payload: { message: name } })
          );
        }}
      >
        Click
      </div>
      {message !== "" && <div>Message - {message}</div>}
    </div>
  );
};

export default App;
