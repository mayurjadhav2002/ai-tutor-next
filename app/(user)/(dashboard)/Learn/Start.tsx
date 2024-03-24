"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import styles from "./appearance.module.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUserContext } from "@/app/userContext";

const Topics = [
  {
    topic: "Artificial Intelligence",
    subtopics: [
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "Computer Vision",
      "Reinforcement Learning",
      "Generative Adversarial Networks (GANs)",
      "AI Ethics and Bias",
      "AI in Healthcare",
      "AI in Finance",
      "AI in Education",
    ],
  },
  {
    topic: "Blockchain",
    subtopics: [
      "Cryptocurrencies",
      "Smart Contracts",
      "Decentralized Finance (DeFi)",
      "Non-Fungible Tokens (NFTs)",
      "Blockchain in Supply Chain",
      "Blockchain in Healthcare",
      "Blockchain in Voting Systems",
    ],
  },
  {
    topic: "Internet of Things (IoT)",
    subtopics: [
      "IoT Devices",
      "IoT Security",
      "Smart Homes",
      "Industrial IoT (IIoT)",
      "IoT in Agriculture",
      "IoT in Healthcare",
      "IoT in Transportation",
    ],
  },
  {
    topic: "Cybersecurity",
    subtopics: [
      "Network Security",
      "Endpoint Security",
      "Data Privacy",
      "Cyber Threat Intelligence",
      "Cloud Security",
      "Identity and Access Management (IAM)",
      "Security Compliance",
      "Ethical Hacking",
    ],
  },
  {
    topic: "Quantum Computing",
    subtopics: [
      "Quantum Bits (Qubits)",
      "Quantum Algorithms",
      "Quantum Cryptography",
      "Quantum Supremacy",
      "Quantum Machine Learning",
      "Quantum Error Correction",
    ],
  },
];

function Start() {
  const [subject, setSubject] = useState("");
  const [subtopic, setSubTopics] = useState("");

  const handleSelectSubject = (selectedTopic: React.SetStateAction<string>) => {
    if (subtopic) {
      setSubTopics("");
    }
    setSubject(selectedTopic);
  };

  return (
    <div className="h-screen  w-full">
      <div className={styles.appearance + ""}>
        {subject && (
          <h2 className="text-3xl font-bold text-center my-5">
            You want to Learn {subject} for {subtopic}
          </h2>
        )}
        <Label className="text-left text-lg mt-10 mb-5">Select Topic</Label>

        <div className={`flex justify-start mt-3 gap-5 ${styles.appearance}`}>
          {Topics.map((topic, index) => (
            <label key={index}>
              <input
                type="radio"
                name="theme"
                value="light"
                onClick={() => handleSelectSubject(topic.topic)}
                className={styles.opacity0}
              />
              <div className="selector items-center rounded-lg border-2 border-muted p-1 hover:border-accent">
                <div className="space-y-2 rounded-sm bg-[#b1cbff] p-1">
                  <div className="flex items-center space-x-2 rounded-md bg-white font-bold p-2 shadow-sm">
                    {topic.topic}
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>

        {subject && (
          <div>
            <div className=" bg-gray-300 my-5"></div>
            <Label className="text-left text-lg mt-10 mb-5">
              Select Broader topic
            </Label>

            <div
              className={`grid grid-cols-6 mt-3 gap-3 items-center justify-start ${styles.appearance2}`}
            >
              {Topics.find((topic) => topic.topic === subject)?.subtopics.map(
                (subtopic, index) => (
                  <label key={index} className="col-span-1">
                    <input
                      type="radio"
                      name="subtopic"
                      value="light"
                      onClick={() => setSubTopics(subtopic)}
                      className={styles.opacity0}
                    />
                    <div className="selector items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                      <div className="space-y-2 rounded-sm bg-[#dfffc2] p-1">
                        <div className="flex items-center space-x-2 rounded-md bg-white font-bold p-2 shadow-sm">
                          {subtopic}
                        </div>
                      </div>
                    </div>
                  </label>
                )
              )}
            </div>
          </div>
        )}
      </div>
      {!subject || !subtopic ? (
        <Link href="">
          <Button className="mt-14 w-full" disabled>
            Next
          </Button>
        </Link>
      ) : (
        <Link href={`/AI/Roadmap?topic=${subject}&subtopic=${subtopic}`}>
          <Button className="mt-14 w-full">Next</Button>
        </Link>
      )}
    </div>
  );
}

export default Start;
