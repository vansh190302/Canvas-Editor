import React, { useState, useRef, useEffect } from 'react';
import CanvasEditor from './CanvasEditor';

const CanvasEditorApp = () => {
  const initialTemplateData = {
    caption: {
      text: "1 & 2 BHK Luxury Apartments at\njust Rs.34.97 Lakhs",
      position: { x: 50, y: 50 },
      max_characters_per_line: 31,
      font_size: 44,
      alignment: "left",
      text_color: "#FFFFFF",
    },
    cta: {
      text: "Shop Now",
      position: { x: 190, y: 320 },
      text_color: "#FFFFFF",
      background_color: "#000000",
    },
    image_mask: { x: 56, y: 442, width: 970, height: 600 },
    urls: {
      mask:
        "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_mask.png",
      stroke:
        "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Mask_stroke.png",
      design_pattern:
        "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Design_Pattern.png",
    },
  };
  const [imageFile, setImageFile] = useState(null);
  const [caption, setCaption] = useState(initialTemplateData.caption.text);
  const [callToAction, setCallToAction] = useState(initialTemplateData.cta.text);
  const [backgroundColor, setBackgroundColor] = useState(initialTemplateData.cta.background_color);
  const [lastPickedColors, setLastPickedColors] = useState([]);

  const canvasRef = useRef(null);
  const canvasEditorRef = useRef(null);

  useEffect(() => {
    canvasEditorRef.current = new CanvasEditor(canvasRef.current);
    canvasEditorRef.current.loadImage(initialTemplateData.urls.mask);
    canvasEditorRef.current.loadStrokeImage(initialTemplateData.urls.stroke);
    canvasEditorRef.current.loadDesignPatternImage(initialTemplateData.urls.design_pattern);
    canvasEditorRef.current.setCaption(initialTemplateData.caption.text);
    canvasEditorRef.current.setCallToAction(initialTemplateData.cta.text);
    canvasEditorRef.current.setBackgroundColor('#0369A1');
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageFile(reader.result);
        canvasEditorRef.current.loadImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
    canvasEditorRef.current.setCaption(e.target.value);
  };

  const handleCallToActionChange = (e) => {
    setCallToAction(e.target.value);
    canvasEditorRef.current.setCallToAction(e.target.value);
  };

  const handleBackgroundColorChange = (e) => {
    const color = e.target.value;
    setBackgroundColor(color);
    canvasEditorRef.current.setBackgroundColor(color);
    canvasEditorRef.current.updateLastPickedColors(color);
    setLastPickedColors(canvasEditorRef.current.lastPickedColors);
  };
  return (
    <div className="container mx-auto p-4 flex justify-center items-center">
    <center><h1>Canvas Editor</h1></center>
      <div className="flex flex-col mr-4">
        <div className="mb-4">
          <label htmlFor="imageUpload" className="block mb-2">Upload Image : </label>
          <input type="file" id="imageUpload" accept="image/*" onChange={handleImageUpload} className="hidden" />
          {/* <label htmlFor="imageUpload" className="cursor-pointer bg-blue-500 text-white rounded px-4 py-2 transition duration-300 ease-in-out hover:bg-blue-600 mb-4">Upload Image</label> */}
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">Caption</span>
          <input type="text" id="caption" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" value={caption} onChange={handleCaptionChange}/>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">Call to Action</span>
          <input type="text" id="callToAction" value={callToAction} onChange={handleCallToActionChange} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
        </div>
        <div><center>
          <label htmlFor="backgroundColor" className="block mb-2">Background Color :  </label>
          <input type="color" id="backgroundColor" value={backgroundColor} onChange={handleBackgroundColorChange} className="border rounded p-2" />
        </center></div>
        {/* Last picked colors */}
        <div className="mt-4 mr-4">
          <h4>Last Picked Colors:</h4>
          <div className="flex mt-2">
            {lastPickedColors.map((color, index) => (
              <div key={index} className="rounded-full bg-gray-200" style={{ width: '25px', height: '25px', backgroundColor: color }}></div>
            ))}
              </div>
        </div>
      </div>
      <center>
        <canvas ref={canvasRef} width={400} height={400} className="border" /></center>
    </div>
  );
};

export default CanvasEditorApp;
