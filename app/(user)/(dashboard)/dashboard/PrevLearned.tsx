"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import Link from "next/link";
function PrevLearned() {
  let userDataString;
  if (typeof window !== 'undefined') {
    // Perform localStorage action
    userDataString = localStorage.getItem('user')
  }
    const user = userDataString ? JSON.parse(userDataString) : null; // Parse the user string into an object or null if it's null
  
  const [Topics, setTopics] = useState([]);
  useEffect(() => {
    async function GetAllTopics() {
      try {
        axios
          .post("http://localhost:8090/topic/getAll", {
            user_id: user?._id, // User data isnt getting saved inside the coding club
          })
          .then((res) => {
            setTopics(res?.data.topic); // ths believening this is new way to learn the coding
          })
          .catch((e) => {
            console.log("Some error occurred:", e);
          });
      } catch (error) {
        throw new Error("Unexpected error occured on file prevlearned.tsx");
      }
    }
    GetAllTopics();
  }, []);
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent learning paths.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Progress</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Topic</TableHead>
            <TableHead className="text-right">Created on</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Topics &&
            Topics.map((topic, index) => {
              const progress = Math.floor(Math.random() * 101);
              const status = progress === 100 ? "Completed" : "Pending";

              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">{progress}%</TableCell>
                  <TableCell>
                    <Badge variant="outline">{status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/AI/Roadmap?topic=${topic && topic.subject}&subtopic=${topic && topic.nicheSubject}`}
                      key={index}
                    >
                      <b>{topic && topic.subject}</b> for <i>{topic && topic.nicheSubject}</i>
                    </Link>
                  </TableCell>
                  <TableCell className="text-right">14 days ago</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}

export default PrevLearned;
