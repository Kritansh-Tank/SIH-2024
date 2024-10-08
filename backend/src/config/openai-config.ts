import Configuration from "openai"; // Change to default import if required

export const configureOpenAI = () => {
  const config = new Configuration({
    apiKey: process.env.OPEN_AI_SECRET,
    //organization: process.env.OPENAI_ORGANIZATION_ID,
  });
  return config;
};

export interface ChatCompletionRequestMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatCompletionResponse {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    index: number;
    finish_reason: string;
  }>;
}
