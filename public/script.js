document.addEventListener("DOMContentLoaded", () => {
    const httpStatusCode = document.getElementById("httpStatusCode").textContent || "Unknown";
    // Define the data for the script actions
    const data = [
      {
        action: 'type',
        strings: ["[USER]: Try to access Website..."],
        output: `<span class='system-text'>[SYSTEM]:</span> ${httpStatusCode} detected.<br><br>`,
        postDelay: 2000
      },
      {
        action: 'type',
        strings: ["[USER]: Oh damn! What's this?"],
        output: "<span class='system-text'>[SYSTEM]:</span> There seems to be a technical glitch or an error in the matrix. No matter what, we wish you good luck!<br>&nbsp;",
        postDelay: 2000
      },
      {
        action: 'type',
        strings: ["[USER]: What does that mean?"],
        output: "<span class='system-text'>[SYSTEM]:</span> It means that there's an issue either with the service we're trying to reach or something really dangerous is going on... this was a joke!<br>&nbsp;",
        postDelay: 2000
      },
      {
        action: 'type',
        strings: ["<span class='system-text'>[SYSTEM]:</span> I know these errors are not the one you're looking for and you must be really confused, but...", "<span class='system-text'>[SYSTEM]:</span>You can:<br>1. Try reloading the page in a few minutes.<br>2. Check your internet connection.<br>3. If the issue persists, report it to the site administrator or just pray..."],
        postDelay: 3000
      },
      {
        action: 'view',
        postDelay: 1000
      }
    ];
    // Function to execute the scripted actions
    runScripts(data, 0);
  });

  /**
   * Creates a new DOM element with the given type and content
   * @param {string} type - The type of the element to create (e.g., 'div', 'span').
   * @param {string} content - The inner HTML content of the element.
   * @returns {HTMLElement} The created DOM element.
   */
  const createElementWithContent = (type, content) => {
    const element = document.createElement(type);
    element.innerHTML = content;
    return element;
  }
  
  /**
   * Sequentially runs each script action
   * @param {Array} data - An array of script actions to run.
   * @param {number} pos - The current position in the script actions array.
   */
  const runScripts = (data, pos) => {
    const prompt = document.querySelector('.prompt');
    const script = data[pos];
  
    switch (script.action) {
      // 'type' action types out a string and outputs a system message
      case 'type':
        new Typed(prompt, {
          strings: script.strings,
          typeSpeed: 30,
          showCursor: false,
          onComplete: () => {
            // After typing is complete, wait for the specified post delay
            setTimeout(() => {
              const history = document.querySelector('.history');
              // If the next action is not 'view', append the typed string to the history
              if (!(pos === data.length - 2 && data[pos + 1].action === 'view')) {
                history.appendChild(createElementWithContent('div', `$ ${prompt.textContent}`));
                // If there is an output for the script, append it to the history
                if (script.output) {
                  history.appendChild(createElementWithContent('div', script.output));
                }
                // Clear the prompt
                prompt.innerHTML = '';
              }
              // Scroll to the bottom of the terminal
              document.querySelector('section.terminal').scrollTop = document.querySelector('section.terminal').scrollHeight;
              // Move to the next script
              pos++;
              // If there are more scripts, run the next one after a delay
              if (pos < data.length) {
                setTimeout(() => {
                  runScripts(data, pos);
                }, script.postDelay || 1000);
              }
              // If this is the last script, add a custom cursor to the prompt
              if (pos === data.length - 1) {
                const cursor = createElementWithContent('span', '');
                cursor.classList.add('custom-cursor');
                prompt.appendChild(cursor);
              }
            }, 2000);
          }
        });
        break;
      // 'view' action displays a stickman animation
      case 'view':
        // Create a new div for the stickman and add it to the terminal
        const stickmanDiv = createElementWithContent('div', '');
        stickmanDiv.classList.add('stickman');
        const terminalSection = document.querySelector('section.terminal');
        terminalSection.appendChild(stickmanDiv);
        
        // Define the frames for the stickman animation
        const stickmanFrames = [
          " O \n/|\\\n/ \\",
          " O \n\\|/\n/ \\",
          " O \n\\|/\n\\ /",
          " O \n/|\\\n\\ /"
        ];
        
        // Initialize variables for the animation
        let frameIndex = 0;
        let positionX = 0;
        const lastTextNode = terminalSection.lastChild;
        const initialPositionY = lastTextNode ? lastTextNode.getBoundingClientRect().bottom - terminalSection.getBoundingClientRect().top : 0;
        let positionY = initialPositionY;
        const speed = 1;
        let direction = 'down';
        const terminalRect = terminalSection.getBoundingClientRect();
        const stickmanHeight = stickmanDiv.getBoundingClientRect().height;
        const terminalHeight = terminalRect.height;
        const frameChangeRate = 10;
        let frameChangeCounter = 0;
        
        /**
         * Animates the stickman by changing its frame and position
         */
        const animateStickman = () => {
          // Change the frame every 10 frames
          if (frameChangeCounter % frameChangeRate === 0) {
            stickmanDiv.textContent = stickmanFrames[frameIndex];
            frameIndex = (frameIndex + 1) % stickmanFrames.length;
          }
          frameChangeCounter++;
          
          // Move the stickman down or up
          if (direction === 'down') {
            positionY += speed;
            // If the stickman reaches the bottom, change direction to up
            if (positionY + stickmanHeight >= terminalHeight) {
              direction = 'up';
            }
          } else if (direction === 'up') {
            positionY -= speed;
            positionX += speed;
            // If the stickman reaches the initial position, change direction to down
            if (positionY <= initialPositionY) {
              direction = 'down';
            }
          }
          
          // Update the position of the stickman
          stickmanDiv.style.left = positionX + 'px';
          stickmanDiv.style.top = positionY + 'px';
          
          // If the stickman goes off the right edge, reset its position
          if (positionX - stickmanDiv.getBoundingClientRect().width > terminalRect.width) {
            positionX = -stickmanDiv.getBoundingClientRect().width;
            positionY = initialPositionY;
            direction = 'down';
          }
          
          // Request the next animation frame
          requestAnimationFrame(animateStickman);
        }
        
        // Start the animation
        animateStickman();
        break;
    }
  }
