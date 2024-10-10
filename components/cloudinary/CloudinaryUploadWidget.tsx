"use client";

import { createContext, useEffect, useState } from "react";
import { RiUpload2Fill } from "react-icons/ri";
import styled from "styled-components";

declare global {
  interface Window {
    cloudinary: any;
  }
}

type CloudinaryWidgetTypes = {
  uwConfig: {
    cloudName: string | undefined;
    uploadPreset: string | undefined;
    sources: string[];
    multiple: boolean;
    folder: string;
    maxImageFileSize: number;
    maxImageWidth: number;
    // theme: "purple", //change to a purple theme
  };
  setPublicId: (publicId: string) => void;
  setNewImage: (newImage: string) => void;
};

// Create a context to manage the script loading state
const defaultValues: CloudinaryContextTypes = {
  loaded: false,
};

const CloudinaryScriptContext =
  createContext<CloudinaryContextTypes>(defaultValues);

function CloudinaryUploadWidget({
  uwConfig,
  setPublicId,
  setNewImage,
}: CloudinaryWidgetTypes) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            // console.log("Done! Here is the image info: ", result.info);
            setPublicId(result.info.public_id);
            setNewImage(result.info.secure_url);
          }
        }
      );
      myWidget.open();
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <StyledBtn onClick={initializeCloudinaryWidget}>
        Dodaj nowy obraz <br />
        <RiUpload2Fill />
      </StyledBtn>
    </CloudinaryScriptContext.Provider>
  );
}

const StyledBtn = styled.button`
  text-decoration: none;
  background: var(--secondaryColor3);
  padding: 10px 20px;
  text-align: center;
  color: white;
  font-family: var(--titleFont);
  border-radius: 10px;
  font-size: 1.4rem;
  font-weight: 500;
  text-transform: uppercase;
  margin-top: 3vh;
  transition: 0.4s;
  border: none;
  cursor: pointer;
  @media screen and (max-width: 800px) {
    font-size: 1.2rem;
  }
  svg {
    color: white !important;
    font-size: 2rem !important;
    margin: 10px auto !important;
  }
  :hover {
    background: var(--secondaryColor);
  }
`;

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
