import React, {useState} from "react";
import { useHistory } from "react-router-dom";


const UploadVideo = () => {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const [video, setVideo] = useState(null);
    const [videoLoading, setVideoLoading] = useState(false);
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("video", video);
        
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setVideoLoading(true);

        const res = await fetch('/api/upload', {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            await res.json();
            setVideoLoading(false);
            history.push("/");
        }
        else {
            setVideoLoading(false);
            // a real app would probably use more advanced
            // error handling
            console.log("error");
        }
    }
    
    const updateVideo = (e) => {
        const file = e.target.files[0];
        setVideo(file);
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept="mp4"
              onChange={updateVideo}
            />
            <button type="submit">Submit</button>
            {(videoLoading)&& <p>Loading...</p>}
        </form>
    )
}

export default UploadVideo;