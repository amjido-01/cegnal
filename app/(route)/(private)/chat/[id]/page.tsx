"use client";

import {
  ArrowLeft,
  Mic,
  Send,
  Play,
  Pause,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

export default function ChatPage() {
  const router = useRouter();
  const params = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isDisabled = params.id === "disabled";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isRecording, setIsRecording] = useState(false);
  const [showVoiceMessage, setShowVoiceMessage] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleBackClick = () => {
    router.push("/dashboard/signal-zone");
  };

  const messages = [
    {
      id: 1,
      type: "system",
      text: "Lorem ipsum dolor sit amet consectetur. Nunc volutpat nunc lectus venenatis risus. Dolor ultrices tempor ut amet consectetur.",
      time: "9:41 AM",
    },
    {
      id: 2,
      type: "user",
      text: "Lorem ipsum dolor sit amet consectetur. Nunc volutpat nunc lectus venenatis risus. Dolor ultrices tempor ut amet consectetur.",
      time: "9:42 AM",
    },
    {
      id: 3,
      type: "system",
      text: "Lorem ipsum dolor sit amet consectetur. Nunc volutpat nunc lectus venenatis risus. Dolor ultrices tempor ut amet consectetur.",
      time: "9:43 AM",
    },
    {
      id: 4,
      type: "user",
      text: "Lorem ipsum dolor sit amet consectetur. Nunc volutpat nunc lectus venenatis risus. Dolor ultrices tempor ut amet consectetur.",
      time: "9:44 AM",
    },
  ];

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen flex flex-col relative">
      {/* Header - Fixed */}
      <div className="flex items-center px-4 py-3 border-b bg-white">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBackClick}
          className="p-1 mr-3"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-100 px-4 py-2 text-center">
        <span className="text-xs text-gray-600 font-medium">
          JUST JOINED HUB
        </span>
      </div>

      {/* Messages Container - Scrollable with bottom padding */}
      <div className="flex-1 overflow-y-auto">
        <div className={`px-4 py-4 space-y-4 ${showVoiceMessage ? 'pb-32' : 'pb-20'}`}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex items-start gap-2 max-w-[80%]">
                {message.type === "system" && (
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                )}
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                {message.type === "user" && (
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                )}
              </div>
            </div>
          ))}

          <div className="bg-gradient-to-r from-blue-900 to-teal-600 rounded-2xl p-6 text-white my-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-2">
                  Earn While You Still In School
                </h3>
                <p className="text-sm opacity-90 mb-4">
                  Lorem ipsum dolor sit amet consectetur. Nunc volutpat nunc
                  lectus venenatis risus.
                </p>
                <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full text-sm">
                  Get Started
                </Button>
              </div>
              <div className="ml-4">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Voice Message Player - Fixed above input */}
      {showVoiceMessage && (
        <div className="fixed bottom-20 left-0 right-0 max-w-sm mx-auto px-4 py-3 border-t bg-gray-50 z-40">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
            <div className="flex-1 flex items-center gap-1">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full ${
                    isPlaying && i < 10 ? "bg-red-500" : "bg-blue-500"
                  }`}
                  style={{ height: `${Math.random() * 20 + 8}px` }}
                ></div>
              ))}
            </div>
            <span className="text-xs text-gray-500">0:15</span>
          </div>
        </div>
      )}

      {/* Message Input - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto px-4 py-3 border-t bg-white z-50">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Input
              placeholder="Type a message..."
              className="pr-12 rounded-full border-gray-200"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 p-2"
              onClick={() => setShowVoiceMessage(!showVoiceMessage)}
            >
              <Mic
                className={`w-4 h-4 ${
                  isRecording ? "text-red-500" : "text-gray-400"
                }`}
              />
            </Button>
          </div>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}


{
  /* Chat Content */
}
// <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
//   <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
//     <MessageCircle className={`w-8 h-8 ${isDisabled ? "text-gray-300" : "text-gray-400"}`} />
//   </div>
//   <h2 className={`text-xl font-semibold mb-4 ${isDisabled ? "text-gray-400" : ""}`}>Welcome Home</h2>
//   <p className={`text-center text-sm leading-relaxed mb-8 ${isDisabled ? "text-gray-400" : "text-gray-600"}`}>
//     Lorem ipsum dolor sit amet consectetur. Nunc volutpat nunc lectus venenatis risus. Dolor ultrices tempor ut
//     amet consectetur.
//   </p>
//   <Button
//     disabled={isDisabled}
//     className={`w-full py-3 rounded-lg ${
//       isDisabled ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
//     }`}
//   >
//     ✏️ Say Anything
//   </Button>
// </div>
