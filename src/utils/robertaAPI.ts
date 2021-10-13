import axios from "axios";
import me from "../data/me.json";
import { setupInterceptorsTo } from "./interceptors";
setupInterceptorsTo(axios);

//insert auth token from huggingface.co
const authToken = process.env.REACT_APP_HUGGING_TOKEN;

//description to send the model on which to infer
const description = me.description;

interface huggingfaceRes {
  data: {
    answer: string
  }
}

export async function getAnswer(question: string): Promise< huggingfaceRes | undefined> {
  console.log(authToken)
  try {
    return await axios.post(
      "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2",
      {
        context: description,
        question: question,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
  } catch (e) {
    console.log(e);
  }
}
