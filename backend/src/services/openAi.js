import { OpenAI } from 'openai';


// console.log(process.env.OPENAI_API_KEY)
const openai = new OpenAI({
  apiKey: "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",
});

const getResponse = async (prompt) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
          });
    
        return response;
    } catch (error) {
        return error.message;
    }
}

// console.log(getResponse("Hi! this is my first time testing open ai api!"))

getResponse("Hi! this is my first time testing open ai api!")
.then((response) => {
    console.log(response);
})
.catch((error) => {
    console.log(error);
})