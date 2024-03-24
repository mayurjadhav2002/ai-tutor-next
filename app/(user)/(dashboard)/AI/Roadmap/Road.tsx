import React from "react";
import "./style.css";
import Link from "next/link";
function getRandomClass() {
  const classes = [
    "timeline__event--type1",
    "timeline__event--type2",
    "timeline__event--type3",
    "timeline__event--type1",
    "timeline__event--type2",
    "timeline__event--type3",
  ];
  const randomIndex = Math.floor(Math.random() * classes.length);
  return classes[randomIndex];
}
function Road({Data}:{Data:any}) {
  // console.log(Data)
  const ProjectId = Data.projectExists?._id;
  const User = Data.projectExists?.user;
  const TopicId = Data.projectExists?.topicId;
  const Subject = Data.projectExists?.subject;
  const NicheSubject = Data.projectExists?.nicheSubject;
  // const 
  return (
    <div>
      <div className="timeline">
        {Data.RoadMap.map((data: { title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; id: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, key: React.Key | null | undefined) => (
          <Link href={`/AI/Content?topic=${data.title}&r_id=${ProjectId}&p_id=${ProjectId}&user_id=${User}&t_id=${TopicId}&subject=${Subject}&nicheSubject=${NicheSubject}`}
            key={key}
            className={`timeline__event animated fadeInUp delay-1s ${getRandomClass()}`}
          >
            <div className="timeline__event__icon ">
              <i className="lni-cake"></i>
            </div>
            <div className="timeline__event__date px-5">{data.id}</div>
            <div className="timeline__event__content ">
              <div className="timeline__event__title">{data.title}</div>
              <div className="timeline__event__description">
                <p>{data.description}</p>
              </div>
            </div>
          </Link>
        ))}

      </div>
    </div>
  );
}

export default Road;
