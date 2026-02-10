// App.js
import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [response, setResponse] = useState(null);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [buttonSize, setButtonSize] = useState({ width: 120, height: 50 });
  const containerRef = useRef(null);
  const yesButtonRef = useRef(null);
  const noButtonRef = useRef(null);

  const handleYesClick = () => {
    setResponse('yes');
  };

  const handleNoHover = () => {
    if (containerRef.current && noButtonRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const button = noButtonRef.current.getBoundingClientRect();
      
      // Calculate new random position within container
      const maxX = container.width - button.width - 20;
      const maxY = container.height - button.height - 20;
      
      const newX = Math.floor(Math.random() * maxX);
      const newY = Math.floor(Math.random() * maxY);
      
      setNoButtonPosition({ x: newX, y: newY });
      
      // Occasionally change button size to make it more challenging
      if (Math.random() > 0.7) {
        const newWidth = Math.max(80, Math.floor(Math.random() * 150));
        const newHeight = Math.max(40, Math.floor(Math.random() * 80));
        setButtonSize({ width: newWidth, height: newHeight });
      }
    }
  };

  const resetResponse = () => {
    setResponse(null);
    setNoButtonPosition({ x: 0, y: 0 });
    setButtonSize({ width: 120, height: 50 });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Did you guys miss me?</h1>
        
        {!response ? (
          <div className="question-container" ref={containerRef}>
            <div className="response-options">
              <button
                ref={yesButtonRef}
                className="response-button yes-button"
                onClick={handleYesClick}
              >
                YES
              </button>
              
              <button
                ref={noButtonRef}
                className="response-button no-button"
                onMouseEnter={handleNoHover}
                onMouseMove={handleNoHover}
                style={{
                  transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                  width: `${buttonSize.width}px`,
                  height: `${buttonSize.height}px`,
                }}
              >
                NO
              </button>
            </div>
            
            <div className="instructions">
              <p>Try to click "NO" if you can! 😉</p>
            </div>
          </div>
        ) : (
          <div className="response-message">
            <div className="heart-container">
              <div className="heart">❤️</div>
              <div className="heart">💖</div>
              <div className="heart">💕</div>
            </div>
            <h2 className="message">I know girls that you love me too much!</h2>
            <p className="sub-message">You couldn't even click "NO" even if you wanted to! 😄</p>
            <button className="reset-button" onClick={resetResponse}>
              Ask Again
            </button>
          </div>
        )}
        
        <div className="footer">
          <p>Made with React & mischief ✨</p>
        </div>
      </header>
    </div>
  );
}

export default App;