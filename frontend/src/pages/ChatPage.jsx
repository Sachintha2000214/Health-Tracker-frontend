import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("https://health-tracker-backend-s5ei.vercel.app/");

const API_BASE = "https://health-tracker-backend-s5ei.vercel.app//api/chat"; // ✅ backend base URL

const ChatPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  // From URL
  const doctorNumber = query.get("doctor");                 
  const doctorNameParam = query.get("doctorName") || "";

  // Logged-in user info (doctor OR patient)
  const patientObj = (() => {
    try { return JSON.parse(sessionStorage.getItem("user")); } catch { return null; }
  })();
  const doctorObj = (() => {
    try { return JSON.parse(sessionStorage.getItem("doctor")); } catch { return null; }
  })();

  const role = doctorObj ? "doctor" : "patient";
  const patientName = patientObj?.name || "Patient";
  const patientId = patientObj.id || "Unknown";
  const doctorName = doctorObj?.name || doctorNameParam || `Doctor #${doctorNumber || ""}`;
  const doctorId = doctorObj?.doctorNumber || doctorNumber;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);

  // Fetch chat history from backend
  useEffect(() => {
    if (!doctorId || !patientId) return;

    const fetchChat = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/messages?doctorId=${doctorId}&patientId=${patientId}`
        );
        const data = await res.json();
        if (data.success) {
          setMessages(data.messages || []);
        }
      } catch (err) {
        console.error("Error fetching chat history:", err);
      }
    };

    fetchChat();
  }, [doctorId, patientId]);

    useEffect(() => {
    // Listen for messages from server
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fmtDateTime = (t) => {
    const d = new Date(t);
    return (
      d.toLocaleDateString("en-GB") +
      " " +
      d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

const handleSend = async () => {
  const text = newMessage.trim();
  if (!text) return;

  const payload = {
    id: Date.now().toString() + Math.random(),  // 🔹 unique ID
    senderId: role === "doctor" ? doctorId : patientId,
    senderType: role,
    receiverId: role === "doctor" ? patientId : doctorId,
    receiverType: role === "doctor" ? "patient" : "doctor",
    message: text,
    timestamp: Date.now(),
  };

  try {
    // Save to DB
    await fetch(`${API_BASE}/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // Emit via socket
    socket.emit("sendMessage", payload);

    // Optimistically add
    setMessages((prev) => [...prev, payload]);
    setNewMessage("");
  } catch (err) {
    console.error("Error sending message:", err);
  }
};



  // Label per sender
  const labelFor = (sender) =>
    sender === "patient"
      ? `${patientName} (${patientId})`
      : `Dr. ${doctorName}`;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-teal-600 text-white p-4 shadow flex items-center justify-between">
        <div className="font-semibold text-lg">
          Chat with {doctorName} {doctorNumber ? `( #${doctorNumber} )` : ""}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            No messages yet. Start the conversation.
          </div>
        )}

        {messages.map((m, i) => {
          const mine = (m.sender || m.senderType) === role;
          return (
            <div
              key={m.id || i}
              className={`flex ${mine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 shadow
                ${m.sender === "patient" || m.senderType === "patient"
                  ? "bg-teal-500 text-white"
                  : "bg-white border text-gray-800"
                }`}
              >
                <div className="text-xs opacity-75 mb-1">
                  {labelFor(m.sender || m.senderType)}
                </div>
                <div className="whitespace-pre-wrap">{m.text || m.message}</div>
                <div
                  className={`text-[10px] mt-1 opacity-70 ${
                    m.sender === "patient" || m.senderType === "patient"
                      ? "text-white"
                      : "text-gray-500"
                  }`}
                >
                  🕒 {fmtDateTime(m.ts || m.timestamp)}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t flex items-center gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder={`Message as ${labelFor(role)}...`}
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
