export async function analyzeImage(base64Image: string) {
    const apiKey = import.meta.env.VITE_GOOGLE_VISION_API_KEY;
    const url = https://vision.googleapis.com/v1/images:annotate?key=${apiKey};

    const requestBody = {
        requests: [
            {
                image: { content: base64Image },
                features: [{ type: "LABEL_DETECTION" }] // You can change this to TEXT_DETECTION, FACE_DETECTION, etc.
            }
        ]
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        return data.responses[0].labelAnnotations; // This returns detected labels
    } catch (error) {
        console.error("Error calling Vision API:", error);
        return null;
    }
}