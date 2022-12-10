import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
const dotenvConfig = dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const imageController = async (req, res) => {
  const { nString, size, prompt } = req.body;
  const nInt = parseInt(nString);
  const imageSize =
    size === "large" ? "1024x1024" : size === "medium" ? "512x512" : "256x256";
  try {
    const response = await openai.createImage({
      prompt: prompt,
      n: nInt,
      size: imageSize,
    });

    res.status(200).json(response.data.data);
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      message: "The Image could not be generated.",
      error: error,
    });
  }
};

export default imageController;
