import Configuration from "openai"; // Change to default import if required
export const configureOpenAI = () => {
    const config = new Configuration({
        apiKey: process.env.OPEN_AI_SECRET,
        //organization: process.env.OPENAI_ORGANIZATION_ID,
    });
    return config;
};
//# sourceMappingURL=openai-config.js.map