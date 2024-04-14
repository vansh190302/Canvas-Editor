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
      <div className="container-fluid">
        <h1 className="text-center my-4">Canvas Editor</h1>
        <div className="row">
          <div className="col-md-6">
            <div className="d-flex flex-column align-items-center">
              {/* <label htmlFor="imageUpload" className="mb-2">Upload Image :</label> */}
              <h5>Choose the Image to be shown in the template</h5>
              <input type="file" id="imageUpload" accept="image/*" onChange={handleImageUpload} className="mb-3" />
              <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Caption</span>
                <input type="text" className="form-control" value={caption} onChange={handleCaptionChange} placeholder="Caption" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Call To Action</span>
                <input type="text" className="form-control" value={callToAction} onChange={handleCallToActionChange} placeholder="Call to Action" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
              </div>
              <label htmlFor="backgroundColor" className="mb-2">Background Color : </label>
              <input type="color" id="backgroundColor" value={backgroundColor} onChange={handleBackgroundColorChange} className="mb-3" />
              <h4>Last Picked Colors:</h4>
              <div className="d-flex">
                {lastPickedColors.map((color, index) => (
                  <div key={index} className="rounded-circle bg-gray-200 mx-1" style={{ width: '30px', height: '30px', backgroundColor: color }}></div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <canvas ref={canvasRef} width={400} height={400} className="border"></canvas>
          </div>
        </div>
      </div>
    );
  };

export default CanvasEditorApp;
