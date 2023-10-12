 'use strict';

const STEP_INTERVAL_MS = 50;
const STEP_SIZE_PX = 10;
const DANCE_TIME_MS = 5000;
const DANCING_CAT_URL =
  'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';
let isDancing = false;
let hasDanced = false;

function walk(img, startPos, stopPos) {
  return new Promise((resolve) => {
    img.style.left = `${startPos}px`;
    const interval = setInterval(() => {
      const currentPos = parseInt(img.style.left);

      if(isDancing) return;

      img.style.left = currentPos + STEP_SIZE_PX + 'px';
      if(currentPos >= stopPos && !hasDanced){
        isDancing = true;
        resolve();
      } else if ((currentPos >= stopPos) && hasDanced) {
        clearInterval(interval);
        resolve();
      }
    }, STEP_INTERVAL_MS);
  });
}

function dance(img) {
  return new Promise((resolve) => {
    img.src = DANCING_CAT_URL;
        setTimeout(() => {
          isDancing = false;
          hasDanced = true;
          img.src = "http://www.anniemation.com/clip_art/images/cat-walk.gif";
          resolve();
        }, DANCE_TIME_MS); 
  });
}

async function catWalk() {
  const img = document.querySelector('img');
  const startPos = -img.width;
  const centerPos = (window.innerWidth - img.width) / 2;
  const stopPos = window.innerWidth;

  // Use async/await syntax to loop the walk and dance functions
  async function repeatCatActions() {
    while(true){
      await walk(img, startPos, centerPos);
      await dance(img);
      await walk(img, centerPos, stopPos);
    }   
  } 
  repeatCatActions();
}

window.addEventListener('load', catWalk);