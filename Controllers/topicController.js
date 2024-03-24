const Topic = require("../Models/Topic");
const RoadMap = require("../Models/Roadmap");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run(prompt) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}





const newTopic = async (req, res) => {
  console.log("code is running", req.body);
  try {
    const projectExists = await RoadMap.findOne({user: req.body.user_id, subject:  req.body.subject,
      nicheSubject: req.body.nicheSubject});
    if(projectExists){
      console.log(projectExists)
      res.send({RoadMap: projectExists.roadmap, projectExists}).status(200) ;
      return;
    }
    const new_Project = new Topic({
      user: req.body.user_id,
      subject: req.body.subject,
      nicheSubject: req.body.nicheSubject,
    });
    const result = await new_Project.save();
    if (result) {
      const prompt = `we have to show on our frontend app, please create a ${req.body.subject} for ${req.body.nicheSubject} roadmap in JSON format (as a text) with titles, descriptions, 
             in english.  dont give me any other text because 
            i want to add json directly to ui. give atleast 10 steps parent steps. directly give me the json object as follows, [{id: unique(), title: "", description""}, {id: unique(), title:"", description: ""}]`;
      const response = await run(prompt);
      console.log("Result After storing the Data", result);
      console.log("AI Response", response);
      if (response) {
        const regex = /```json\n([\s\S]+?)\n```/;

        let RoadMapJSON;
        // Find the JSON content using the regular expression
        const match = regex.exec(response);

        if (match && match[1]) {
          const jsonString = match[1];
          const jsonObject = JSON.parse(jsonString);
          RoadMapJSON = jsonObject;
        } else {
          console.log("No JSON content found.");
        }
        const Road = new RoadMap({
          topicId: result._id,
          subject: req.body.subject,
          user: req.body.user_id,
          roadmap: RoadMapJSON,
          nicheSubject: req.body.nicheSubject
        });

        if (await Road.save()) {
          res.status(200).send({ RoadMap: RoadMapJSON, result: result });
        }
      } else {
        res
          .status(200)
          .send({ msg: "this is reply", result: result, aiResponse: response });
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(400)
      .send({ success: false, msg: "Unexpected Error occurred", error: error });
  }
};

const UpdateTopic = async (req, res) => {
  //
  const response = await run("hii my name is Mayur, I am Student Can you teach me simple linear regression? Please include a detailed explanation of the concept on the topic, some examples, common use cases, tables, code snippets  text with a necessary YouTube video URL and images links in png and jpg format. your images and videos are not available on internet so i cant understand, include real images only include the currently available videos upload in recent 3 years. also add like their thumbnail image for example,the video you're given doesn't exists - [![Alt text](https://img.youtube.com/vi/video_id/0.jpg)](https://www.youtube.com/watch?v=video_id). add headings, paragrpahs, tables if necessary make article friendly and explaining enough in 1000-5000 words ")
  res.send({response})
};


const GetAllTopics = async (req, res) => {
  try {
    
    const Topics = await Topic.find({ user: req.body.user_id }).sort({ created_at: 'desc' }).limit(10);
    if(Topics && Topics.length >= 1){
      res.send({topic: Topics}).status(200)
    }else{
      res.status(201).send({msg: "Some Unexpected Error Occured"});
    }
  } catch (error) {
    throw new Error("Internal Error Occured on backend")
  }
}

module.exports = { newTopic, UpdateTopic,GetAllTopics };
