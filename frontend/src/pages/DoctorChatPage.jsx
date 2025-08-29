// src/pages/DoctorChatPage.jsx
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ensureNotificationPermission, notifyNewMessage } from "../utils/notify";
import { io } from "socket.io-client";

const socket = io("https://health-tracker-backend-s5ei.vercel.app/");

const API_BASE = "https://health-tracker-backend-s5ei.vercel.app/api/chat"; // ✅ your backend API

const DoctorChatPage = () => {
  // Doctor session
  const me = (() => {
    try { return JSON.parse(sessionStorage.getItem("user")); } catch { return null; }
  })();

  const doctorNumber = String(me?.doctornumber || me?.doctorNumber || "");
  const doctorName = me?.name || `Doctor #${doctorNumber || "?"}`;

  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [selectedPatientName, setSelectedPatientName] = useState("");

  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const chatEndRef = useRef(null);

  // Notifications
  useEffect(() => { ensureNotificationPermission(); }, []);

  useEffect(() => {
  // Listen for messages from server
  socket.on("receiveMessage", (msg) => {
    setMessages((prev) => [...prev, msg]);
  });

  return () => {
    socket.off("receiveMessage");
  };
}, []);

  // Fetch patients from reports (you already had this)
  useEffect(() => {
    if (!doctorNumber) return;

    const endpoints = [
      `https://health-tracker-backend-s5ei.vercel.app/api/patient/getbloodpressurebydoc/${doctorNumber}`,
      `https://health-tracker-backend-s5ei.vercel.app/api/patient/getbloodsugarbydoc/${doctorNumber}`,
      `https://health-tracker-backend-s5ei.vercel.app/api/patient/getlipidbydoc/${doctorNumber}`,
      `https://health-tracker-backend-s5ei.vercel.app/api/patient/getfbcbydoc/${doctorNumber}`,
    ];

    const fetchAll = async () => {
      const results = await Promise.allSettled(endpoints.map((url) => axios.get(url)));
      const ids = new Set();

      results.forEach((r) => {
        if (r.status === "fulfilled" && Array.isArray(r.value.data)) {
          r.value.data.forEach((row) => {
            const pid = String(row.patientId ?? row.patientID ?? row.patient_id ?? "").trim();
            if (pid) ids.add(pid);
          });
        }
      });

      const list = Array.from(ids).map((id) => ({ patientId: id, name: `Patient ${id}` }));
      setPatients(list);

      // preselect patient if available
      const params = new URLSearchParams(window.location.search);
      const fromUrl = params.get("patientId");
      const fromLocal = localStorage.getItem("doctorChat.preselectPatientId");
      const want = String(fromUrl || fromLocal || "");
      if (list.length) {
        const found = list.find((p) => String(p.patientId) === want);
        if (found) {
          setSelectedPatientId(found.patientId);
          setSelectedPatientName(found.name);
        }
      }
    };

    fetchAll();
  }, [doctorNumber]);

  // Fetch chat history when patient is selected
  useEffect(() => {
    if (!doctorNumber || !selectedPatientId) return;

    const fetchHistory = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/messages?doctorId=${doctorNumber}&patientId=${selectedPatientId}`
        );
        const data = await res.json();
        if (data.success) {
          setMessages(data.messages || []);
        } else {
          setMessages([]);
        }
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };

    fetchHistory();
  }, [doctorNumber, selectedPatientId]);

  // Auto scroll
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  // 🔔 Notify when patient sends message
  const prevLenRef = useRef(0);
  useEffect(() => {
    const len = messages.length;
    if (len > prevLenRef.current) {
      const last = messages[len - 1];
      const isIncoming = last?.senderType === "patient" || last?.sender === "patient";
      const tabInBackground = document.hidden || !document.hasFocus();

      if (isIncoming && tabInBackground) {
        notifyNewMessage({
          title: `New message from ${selectedPatientName || "patient"}`,
          body: (last?.text || last?.message || "").slice(0, 120),
          tag: `${doctorNumber}_${selectedPatientId}`,
        });
      }
    }
    prevLenRef.current = len;
  }, [messages, selectedPatientName, doctorNumber, selectedPatientId]);

  const fmtDateTime = (t) =>
    new Date(t).toLocaleDateString("en-GB") +
    " " +
    new Date(t).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Send message via backend
  const handleSend = async () => {
    const text = draft.trim();
    if (!text || !selectedPatientId) return;

    const payload = {
      senderId: doctorNumber,
      senderType: "doctor",
      receiverId: selectedPatientId,
      receiverType: "patient",
      message: text,
    };

    try {
      await fetch(`${API_BASE}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
       socket.emit("sendMessage", payload);
    console.log("Emitted socket message:", payload);

    // 3. Optimistically add to UI
    setMessages((prev) => [...prev, { ...payload, sender: "doctor" }]);
    setDraft("");
    } catch (err) {
      console.error("Error sending:", err);
    }
  };

  const onPickPatient = (e) => {
    const id = e.target.value;
    setSelectedPatientId(id);
    const f = patients.find((p) => String(p.patientId) === String(id));
    setSelectedPatientName(f?.name || `Patient ${id}`);
    prevLenRef.current = 0; // reset notify baseline
  };

  if (!doctorNumber) {
    return (
      <div className="flex items-center justify-center h-screen text-center p-6">
        <div className="bg-white shadow rounded-xl p-6">
          <div className="text-xl font-semibold text-red-600">No doctor session found</div>
          <div className="text-gray-600 mt-2">Ensure <code>sessionStorage("user")</code> exists with <code>doctornumber</code>.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-teal-600 text-white p-4 shadow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="font-semibold text-lg">
            Doctor Chat — {doctorName} {doctorNumber ? `( #${doctorNumber} )` : ""}
          </div>

          <div className="flex items-center gap-2">
            <select
              className="bg-white text-gray-800 rounded-lg px-3 py-2"
              value={selectedPatientId}
              onChange={onPickPatient}
            >
              <option value="">{patients.length ? "Select patient…" : "No patients found"}</option>
              {patients.map((p) => (
                <option key={p.patientId} value={p.patientId}>
                  {p.name} ({p.patientId})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {!selectedPatientId && (
          <div className="text-center text-gray-500 mt-10">Pick a patient to start chatting.</div>
        )}

        {selectedPatientId && messages.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            No messages yet with {selectedPatientName || "this patient"}.
          </div>
        )}

        {selectedPatientId &&
          messages.map((m, i) => {
            const mine = (m.sender || m.senderType) === "doctor";
            return (
              <div key={m.id || i} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 shadow
                  ${mine ? "bg-teal-500 text-white" : "bg-white border text-gray-800"}`}
                >
                  <div className="text-xs opacity-75 mb-1">
                    {mine ? `Dr. ${doctorName}` : selectedPatientName}
                  </div>
                  <div className="whitespace-pre-wrap">{m.text || m.message}</div>
                  <div className={`text-[10px] mt-1 opacity-70 ${mine ? "text-white" : "text-gray-500"}`}>
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
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder={selectedPatientId ? `Message ${selectedPatientName || "patient"}…` : "Select a patient to start…"}
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
          disabled={!selectedPatientId}
        />
        <button
          onClick={handleSend}
          disabled={!selectedPatientId || !draft.trim()}
          className={`px-4 py-2 rounded-lg transition ${
            !selectedPatientId || !draft.trim()
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-teal-600 text-white hover:bg-teal-700"
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default DoctorChatPage;
