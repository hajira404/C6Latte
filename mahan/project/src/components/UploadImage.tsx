import { useState } from "react";
import { analyzeImage } from "../utils/imageAnalyzer";

const UploadImage = () => {
    const [image, setImage] = useState<File | null>(null);
    const [result, setResult] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!image) return;

        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = async () => {
            if (reader.result) {
                const base64String = reader.result.toString().split(",")[1];
                const labels = await analyzeImage(base64String);

                if (labels) {
                    const descriptions = labels.map(label => label.description);
                    setResult(Detected objects: ${descriptions.join(", ")});
                } else {
                    setResult("Could not analyze the image.");
                }
            }
        };
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload & Verify</button>
            {result && <p>{result}</p>}
        </div>
    );
};

export default UploadImage;