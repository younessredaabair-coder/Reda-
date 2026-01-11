const game = document.getElementById("game");
const car = document.getElementById("car");
const scoreText = document.getElementById("score");

let carLeft = 135;
let score = 0;
let speed = 4;
let playing = true;

// تحكم بلوحة المفاتيح
document.addEventListener("keydown", e=>{
  if(e.key === "ArrowLeft" && carLeft > 10) carLeft -= 20;
  if(e.key === "ArrowRight" && carLeft < 260) carLeft += 20;
  car.style.left = carLeft + "px";
});

// تحكم بالأزرار
document.getElementById("left").addEventListener("click", ()=>{
  if(carLeft > 10) carLeft -= 20;
  car.style.left = carLeft + "px";
});
document.getElementById("right").addEventListener("click", ()=>{
  if(carLeft < 260) carLeft += 20;
  car.style.left = carLeft + "px";
});
document.getElementById("up").addEventListener("click", ()=>{
  speed += 1;
  if(speed>10) speed=10;
});

// إنشاء سيارات عدو
function createEnemy(){
  if(!playing) return;

  const enemy = document.createElement("div");
  enemy.classList.add("enemy");
  enemy.style.left = Math.floor(Math.random()*260) + "px";
  game.appendChild(enemy);

  let enemyTop = -120;

  const move = setInterval(()=>{
    if(!playing){
      clearInterval(move);
      return;
    }

    enemyTop += speed;
    enemy.style.top = enemyTop + "px";

    // تصادم
    if(
      enemyTop > 380 &&
      enemy.offsetLeft < carLeft + 50 &&
      enemy.offsetLeft + 50 > carLeft
    ){
      playing = false;
      alert("Game Over | Score: "+score);
      location.reload();
    }

    if(enemyTop > 520){
      score++;
      scoreText.innerText = "Score: " + score;
      enemy.remove();
      clearInterval(move);
    }
  },20);
}

// توليد الأعداء كل 1.5 ثانية
setInterval(createEnemy,1500);