"use client";
import Loading from "@/components/main/Loading";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./style.min.css";

function FetchContent() {
  const searchParams = useSearchParams();
  const r_id = searchParams.get("r_id"); //roadmap id
  const p_id = searchParams.get("p_id"); // projectid
  const topic_id = searchParams.get("t_id"); // topic id
  const UserID = searchParams.get("user_id"); // userid
  const subject = searchParams.get("subject");
  const nicheSubject = searchParams.get("nicheSubject");
  const topic = searchParams.get("topic");

  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState();
  useEffect(() => {
    axios
      .post("http://localhost:8090/explanation/explain", {
        r_id: r_id && r_id,
        p_id: p_id && p_id,
        topic_id: topic_id && topic_id,
        user_id: UserID && UserID,
        topic: topic && topic,
        subject: subject && subject,
        nicheSubject: nicheSubject && nicheSubject,
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
        setContent(res.data.explain);
      })
      .then((result) => console.log("Result printed"))
      .catch((error) => {
        console.log("Error occurred while making the request:", error);
      });
  }, [r_id, p_id, topic_id, UserID, topic, subject, nicheSubject]);
  return (
    <div className="page-styles">
      {loading ? (
        <Loading msg={"Loading the Content"} />
      ) : (
        <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
      )}
    </div>
  );
}

function Page() {
  return (
    <Suspense fallback={<Loading msg={"Hang IN! while we are Loading the Content"}/>}>
      <FetchContent />
    </Suspense>
  );
}

export default Page;
