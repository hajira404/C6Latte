import axios from 'axios';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const GOOGLE_VISION_URL = https://vision.googleapis.com/v1/images:annotate?key=${API_KEY};

export const analyzeImage = async (imageBase64: string) => {
    try {
        const response = await axios.post(GOOGLE_VISION_URL, {
            requests: [
                {
                    image: { content: imageBase64 },
                    features: [{ type: "LABEL_DETECTION", maxResults: 5 }],
                },
            ],
        });

        return response.data.responses[0].labelAnnotations;
    } catch (error) {
        console.error("Error analyzing image:", error);
        return null;
    }
};