"use client";

import { useState } from "react";
import { FaMicrophone } from "react-icons/fa";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import toast from "react-hot-toast";

type VoiceType = {
  setNewText: (text: string) => void;
  toastText: string;
};

const VoiceLongText = ({ setNewText, toastText }: VoiceType) => {
  const [voiceOn, setVoiceOn] = useState(true);

  const commands = [
    {
      command: "*",
      callback: (item: string) => {
        addItemVoice(item);
      },
    },
  ];

  const { listening, browserSupportsSpeechRecognition } = useSpeechRecognition({
    commands,
  });

  const handleVoice = () => {
    setVoiceOn(!voiceOn);
    let toastId = "";
    if (voiceOn) {
      toastId = toast.loading(toastText, {
        icon: <FaMicrophone />,
        style: {
          borderRadius: "10px",
          background: "#0c3362",
          color: "#fff",
        },
      });
      SpeechRecognition.startListening({ continuous: true });
    } else {
      toast.dismiss(toastId);
      toast("nagrywanie zakończone", {
        icon: <FaMicrophone />,
        style: {
          borderRadius: "10px",
          background: "#051528",
          color: "#fff",
        },
      });
      SpeechRecognition.stopListening();
    }
  };

  const addItemVoice = (item: string) => {
    if (item) {
      setNewText(item);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <button
        type="button"
        className={listening ? "submit-btn2 submit-btn3 " : "submit-btn2"}
      >
        <FaMicrophone />
      </button>
    );
  }

  return (
    <button
      type="button"
      className={listening ? "submit-btn2 submit-btn3 " : "submit-btn2"}
      onClick={handleVoice}
    >
      <FaMicrophone />
    </button>
  );
};

export default VoiceLongText;
