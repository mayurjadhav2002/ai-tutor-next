"use client";
import React, { useEffect, useState } from "react";
import Road from "./Road";
import axios from "axios";
import Loading from "@/components/main/Loading";
import { useSearchParams } from "next/navigation";

const FetchRoadmap = () => {
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic");
  const subtopic = searchParams.get("subtopic");

  const [loading, setLoading] = useState(true);
  const [roadmap, setRoadmap] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataString = await localStorage.getItem("user"); // Retrieve the user data string from localStorage
        const user = userDataString ? JSON.parse(userDataString) : null; // Parse the user string into an object or null if it's null

        const res = await axios.post("http://localhost:8090/topic/create", {
          user_id: user?._id,
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
  }, [subtopic, topic]);

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

const Page = () => {
  return (
    <React.Suspense fallback={<Loading msg={"Loading..."} />}>
      <FetchRoadmap />
    </React.Suspense>
  );
};

export default Page;
