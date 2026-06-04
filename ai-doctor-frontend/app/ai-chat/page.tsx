"use client";

import { useState, useEffect } from "react";

type Message = {
  sender: "user" | "bot";
  text: string;
};

export default function AIChatPage() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [healthData, setHealthData] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hello! I'm your AI Doctor. Ask me about glucose, BMI, cholesterol, or your health report.",
    },
  ]);

  useEffect(() => {
  const savedReport = localStorage.getItem("healthReport");

  if (savedReport) {
    setHealthData(JSON.parse(savedReport));
  }
  }, []);


  const sendMessage = async () => {
    if (!question.trim()) return;

    const userQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        question: userQuestion,
        health_data: healthData,
      }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.answer,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Unable to connect to AI Doctor.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-sky-700 mb-2">
          AI Doctor Chat
        </h1>

        <p className="text-slate-500 mb-8">
          Ask questions about your medical report.
        </p>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 h-[650px] flex flex-col">
          
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-800"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="bg-slate-100 text-slate-600 px-4 py-3 rounded-2xl inline-block">
                AI Doctor is typing...
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 p-4 flex gap-3">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about glucose, BMI, cholesterol..."
              className="flex-1 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}