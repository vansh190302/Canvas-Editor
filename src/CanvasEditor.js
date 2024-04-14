class CanvasEditor {
  constructor(canvas) {
      this.canvas = canvas;
      this.context = canvas.getContext('2d');
      this.image = null;
      this.strokeImage = null; // Added strokeImage property
      this.designPatternImage = null; // Added designPatternImage property
      this.caption = '';
      this.callToAction = '';
      this.backgroundColor = '#0369A1'; // Default background color as a shade of blue
      this.imageMask = { x: 80, y: 100, width: canvas.width - 180, height: canvas.height-180};
      this.lastPickedColors = [];
      this.captionOptions = {
          text: 'Line 1 - 1 & 2 BHK Luxury Apartments at\nLine 2 - just Rs.34.97 Lakhs',
          position: { x: 40, y: 10 },
          fontSize: 20, // Default font size
          alignment: 'left', // Default alignment
          textColor: '#ffffff', // Default text color
          maxCharactersPerLine: 31 // Default maximum characters per line
      };
      this.ctaOptions = {
          text: '',
          position: { x: 0, y: 0 },
          fontSize: 30, // Default font size
          textColor: '#000000', // Default text color
          backgroundColor: '#ffffff', // Default background color
          wrapLength: 30 // Default wrap length
      };
  }

  loadImage(imageUrl) {
      this.image = new Image();
      this.image.onload = () => {
          this.draw();
      };
      this.image.src = imageUrl;
  }
  loadStrokeImage(imageUrl) {
    this.strokeImage = new Image();
    this.strokeImage.onload = () => {
        this.draw();
    };
    this.strokeImage.src = imageUrl;
}
updateLastPickedColors(color) {
  this.lastPickedColors.unshift(color);

  if (this.lastPickedColors.length > 5) {
    this.lastPickedColors.pop();
  }
}
loadDesignPatternImage(imageUrl) {
  this.designPatternImage = new Image();
  this.designPatternImage.onload = () => {
      this.draw();
  };
  this.designPatternImage.src = imageUrl;
}
  draw() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.context.fillStyle = this.backgroundColor;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

      if (this.image) {
          this.context.save();
          this.context.beginPath();
          this.context.rect(this.imageMask.x, this.imageMask.y, this.imageMask.width, this.imageMask.height);
          this.context.closePath();
          this.context.clip();
          this.context.drawImage(this.image, this.imageMask.x, this.imageMask.y, this.imageMask.width, this.imageMask.height);
          this.context.restore();
      }

      this.context.fillStyle = this.captionOptions.textColor;
      this.context.font = `${this.captionOptions.fontSize}px Arial`;
      this.context.textAlign = this.captionOptions.alignment;
      this.context.textBaseline = 'top';
      const textHeight = this.wrapText(this.captionOptions.text, this.captionOptions.position.x, this.captionOptions.position.y, this.canvas.width - 20, this.captionOptions.fontSize + 5);

      if (this.ctaOptions.text) {
          const buttonWidth = 80;
          const buttonHeight = 20;
          const buttonX = 50;
          const buttonY = textHeight + 10;

          // Draw button background
          this.context.fillStyle = this.ctaOptions.backgroundColor;
          this.context.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

          // Draw button text (smaller)
          this.context.fillStyle = this.ctaOptions.textColor;
          const buttonFontSize = 15;
          this.context.font = `${buttonFontSize}px Arial`;
          this.context.textAlign = 'center';
          this.context.textBaseline = 'middle';
          this.context.fillText(this.ctaOptions.text, buttonX + buttonWidth / 2, buttonY + buttonHeight / 2);
      }
  }


  wrapText(text, x, y, maxWidth, lineHeight) {
    const lines = text.split('\n');
    let textHeight = 0;

    for (let i = 0; i < lines.length; i++) {
        const words = lines[i].split(' ');
        let line = '';

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = this.context.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                this.context.fillText(line, x, y + textHeight);
                line = words[n] + ' ';
                textHeight += lineHeight;
            } else {
                line = testLine;
            }
        }
        this.context.fillText(line, x, y + textHeight);
        textHeight += lineHeight;
    }

    return textHeight;
}


  setCaptionOptions(options) {
      this.captionOptions = { ...this.captionOptions, ...options };
      this.draw();
  }

  setCtaOptions(options) {
      this.ctaOptions = { ...this.ctaOptions, ...options };
      this.draw();
  }

  setBackgroundColor(color) {
      this.backgroundColor = color;
      this.draw();
  }
  updateLastPickedColors(color) {
    if (this.lastPickedColors.length === 5) {
      this.lastPickedColors.shift();
    }
    this.lastPickedColors.push(color);
  }

  setImageMask(mask) {
      this.imageMask = mask;
      this.draw();
  }

  setCaption(text) {
      this.captionOptions.text = text;
      this.draw();
  }

  setCallToAction(text) {
      this.ctaOptions.text = text;
      this.draw();
  }
}

export default CanvasEditor;
