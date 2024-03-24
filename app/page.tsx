import Image from "next/image";
import Header from "./Landing/Header";
import Main from "./Landing/Main";
import Team from "./Landing/Team";
import { Feature } from "./Landing/Feature";

export default function Home() {
  return (
    <>
    <Header/>
    <Main/>
    <Feature/>
    <Team/>

    </>
  );
}
