"use client"
import React, { useEffect, useState } from "react";
import Road from "./Road";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Loading from "@/components/main/Loading";

const FetchPage = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [roadmap, setRoadmap] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")) || {}; // Parse the user string into an object

  const topic = searchParams.get("topic");
  const subtopic = searchParams.get("subtopic");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("http://localhost:8090/topic/create", {
          user_id: user._id,
          subject: topic,
          nicheSubject: subtopic,
        });
        setLoading(false);
        setRoadmap(res.data);
      } catch (error) {
        console.error("Error while fetching the data:", error);
        setLoading(false);
      }
    };

    if (topic && subtopic) {
      fetchData();
    }

  }, [subtopic, topic, user._id]);

  return (
    <div>
      {loading ? (
        <Loading msg={"Wait while we create the Roadmap for you"} />
      ) : (
        <Road Data={roadmap} />
      )}
    </div>
  );
};

function Page() {
  return (
    <div>
      <FetchPage />
    </div>
  );
}

export default Page;
