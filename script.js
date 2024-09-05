const boxes = document.querySelectorAll(".parentBox");
let firstBox = null;
let secondBox = null;
let lockBoard = false; 
let steps = 0; 
const stepCounter = document.getElementById("stepCounter"); 
const resetBtn = document.getElementById("resetBtn"); 
const newImages = [
  "https://digitalsynopsis.com/wp-content/uploads/2014/06/supercar-wallpapers-bugatti-4.jpg",
  "https://i.pinimg.com/736x/25/0e/22/250e22a082dae849a0b5e2d7ed3d3f4c.jpg",
  "https://wallpapers.com/images/featured/mustang-xqte6v5e9s6f3smk.jpg",
  "https://png.pngtree.com/thumb_back/fh260/background/20230521/pngtree-1920s-vintage-car-wallpaper-image_2680593.jpg",
  "https://rukminim2.flixcart.com/image/850/1000/kxnl6kw0/shopsy-poster/u/u/w/medium-movie-cars-lightning-mcqueen-car-on-fine-art-paper-hd-original-imaga2dhnq2pgqcz.jpeg?q=90&crop=false",
  "https://wallpaperaccess.com/full/33115.jpg",
  "https://images.freecreatives.com/wp-content/uploads/2015/06/colorful-cars-wallpaper.jpg",
  "https://e0.pxfuel.com/wallpapers/153/880/desktop-wallpaper-bmw-car-color-car-bmw-abstract.jpg"
];

const incrementStepCounter = () => {
  steps++;
  stepCounter.textContent = steps;
};

const flipBox = (box) => {
  box.style.transform = "rotateY(180deg)";
};

const unflipBoxes = () => {
  setTimeout(() => {
    firstBox.style.transform = "rotateY(0deg)";
    secondBox.style.transform = "rotateY(0deg)";
    resetBoard();
  }, 1000); 
};

const resetBoard = () => {
  [firstBox, secondBox] = [null, null];
  lockBoard = false;
};

const handleBoxClick = (e) => {
  if (lockBoard) return; 
  const clickedBox = e.currentTarget.querySelector('.mainBox1, .mainBox2, .mainBox3, .mainBox4, .mainBox5, .mainBox6, .mainBox7, .mainBox8, .mainBox9, .mainBox10, .mainBox11, .mainBox12, .mainBox13, .mainBox14, .mainBox15, .mainBox16');
  
  if (clickedBox === firstBox) return;

  flipBox(clickedBox);
  incrementStepCounter();

  if (!firstBox) {
    firstBox = clickedBox;
  } else {
    secondBox = clickedBox;
    lockBoard = true; 
    const firstImage = firstBox.querySelector('.backBox img').src;
    const secondImage = secondBox.querySelector('.backBox img').src;

    if (firstImage === secondImage) {
      resetBoard();
    } else {
      unflipBoxes();
    }
  }
};
boxes.forEach((box) => {
  box.addEventListener("click", handleBoxClick);
});
const resetGame = () => {
  boxes.forEach((box, index) => {
    const mainBox = box.querySelector('.mainBox1, .mainBox2, .mainBox3, .mainBox4, .mainBox5, .mainBox6, .mainBox7, .mainBox8, .mainBox9, .mainBox10, .mainBox11, .mainBox12, .mainBox13, .mainBox14, .mainBox15, .mainBox16');
    const backBox = mainBox.querySelector('.backBox img');
    backBox.src = newImages[index % newImages.length];
    
    mainBox.style.transform = "rotateY(0deg)";
  });
  
  steps = 0;
  stepCounter.textContent = steps;
  resetBoard();
};
resetBtn.addEventListener("click", resetGame);