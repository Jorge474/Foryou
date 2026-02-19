let flowerTime = 0;

let flowerOpen = false;

function randomBookColor(){
    const colors = ["#8b0000","#2f4f4f","#556b2f","#4b0082","#b8860b"];
    return colors[Math.floor(Math.random()*colors.length)];
}




function isModalOpen(){
    return !document.getElementById("bookModal").classList.contains("hidden") ||
           !document.getElementById("laptopModal").classList.contains("hidden") ||
           !document.getElementById("appModal").classList.contains("hidden") ||
           !document.getElementById("flowerModal").classList.contains("hidden");

}

const shelfBooks = []; // libros del librero

for(let i = 0; i < 50; i++){
    shelfBooks.push({
        x: 10 + i * 16,
        y: 20,
        width: 10,
        height: 40,
        color: randomBookColor() // color fijo
    });
}

/* ✨ PARTICULAS ROMÁNTICAS */


const catImg = new Image();
catImg.src = "img/gato.png";

const tableImg = new Image();
tableImg.src = "img/table.jpeg";

const laptopImg = new Image();
laptopImg.src = "img/computer.gif";

const flowerImg = new Image();
flowerImg.src = "img/dalia.png";


const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

canvas.setAttribute("tabindex", "0");
canvas.focus();


const particles = [];

for(let i = 0; i < 40; i++){
    particles.push(createParticle());
}

function createParticle(){
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 12 + 6,
        speedY: Math.random() * 0.7 + 0.3,
        drift: Math.random() * 0.6 - 0.3,
        type: Math.random() > 0.5 ? "petal" : "heart",
        rotation: Math.random() * Math.PI * 2
    };
}


let cat = {
    x: 380,
    y: 280,
    size: 80,
    speed: 2,
    dir: "right" 
};

let keys = {};

/* 🎮 TECLAS */

window.addEventListener("keydown", e => {

    const key = e.key;

if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(key)){
    e.preventDefault();
}

keys[e.code] = true;

if(key === " "){   // 🔥 SPACE REAL
    if(!isModalOpen()) interact();
}

    if(e.code === "Escape"){
        closeBook();
        closeLaptop();
        closeApp();
        closeFlower();
    }
});

window.addEventListener("keyup", e => {
    keys[e.code] = false;
});




window.addEventListener("blur", () => {
    keys = {};
});

/* 📚 GENERAMOS 24 LIBROS */

const books = [];

let startX = 90;
let startY = 110;
let spacingX = 120;
let spacingY = 90;

const recuerdos = [
    "¿Te acuerdas cuando vimos nuestra primera pelicula?, te quedaste dormidita y yo no lo sabia pero fue un momento muy tierno :3",
    "¿Te acuerdas de nuestros primeros te amo y nuestros primeros besitos en llamada? ❤️",
    "¿Te acuerdas de cuando te pusiste a discutir con JC de quien me amaba más cuando recien lo conoci? 😂",
    "¿Te acuerdas de cuando hicimos videollamada con JC y nos pusimos a jugar con peluche los tres y con los gatitos? ✨",
    "¿Te acuerdas de cuando te ayude a hacer las tareas?, estabas triste y mal,pero me esforce para lograrte sacar una sonrisa 💕",
    "¿Te acuerdas de cuando hice un dibujo chibi de los dos y me corregiste el color de cabello?",

    "¿Te acuerdas de cuando pusimos reglas a nuestra relación y esa noche no paramos de darnos besitos? 🤍",
    "¿Te acuerdas de cuando llegaron las flores y yo andaba por todo el camino pensando en que si te gustaron o no? :c",
    "¿Te acuerdas de cuando te pedi ser mi novia en coreano? jaj ❤️",
    "¿Te acuerdas de cuando llegaste emocionada y me dijiste amooooooorrr y te sonrojabas cuando lo repetia? ✨",
    "¿Te acuerdas de nuestras primeras cartitas? recuerdo que te gustaban mucho 💖",
    "¿Te acuerdas de cuando tu no querias que durmamos porque querias quedarte hasta tarde dandonos cariños? me dio ternura :3",

    "¿Te acuerdas de cuando me pediste ayuda para ayudarte con una prueba en el colegio? :v",
    "¿Te acuerdas de cuando te prometi los makis porque no habias llevado comida? :3 ",
    "¿Te acuerdas de nuestra primera cita virtual? 😌",
    "Aún recuerdo nuestras primeras sonrisas ¿tu las recuerdas? 💕",
    "¿Te acuerdas de nuestro fin de año juntos? nos llamamos justito a las 12 :3 ✨",
    "¿Te acuerdas de cuando nos haciamos bullying con cualquier cosa?,ahora te resientes carepoto ksksk :3",

    "¿Te acuerdas de los berrinches que hacias cuando jugabamos plato juntos? 😌",
    "Yo aun recuerdo la felicidad que senti en esas nocges en las que solo eramos nosotros dos¿A ti también te ponian feliz? ❤️",
    "¿Te acuerdas de nuestros rapidines de año nuevo ksksk? 💖",
    "¿Te acuerdas de la primera vez que hablamos de Andromeda? ✨",
    "¿Te acuerdas de cuando te acompañaba hasta tarde con tus tareas mientras nos haciamos bromas? 😌",
    "¿Te acuerdas de cuando nos ayudabamos con nuestras tareas mientras nos dabamos cariños,y yo te ayudaba con los canvas con gatitos? ❤️"
];


for(let row = 0; row < 4; row++){
    for(let col = 0; col < 6; col++){

        const index = row * 6 + col; // 🔥 magia

        books.push({
            x: startX + col * spacingX,
            y: startY + row * spacingY,
            text: recuerdos[index]
        });

    }
}


/* 💻 LAPTOP */

const laptop = { x: 680, y: 500 };


const flower = { x: 40, y: 500 };


/* 🔁 LOOP */
document.addEventListener("keydown", e => {
    console.log("TECLA:", e.code);
});


function gameLoop(){

    moveCat();

    updateParticles();   // ✨ movimiento
    drawScene();

    drawParticles();     // ✨ dibujo

    requestAnimationFrame(gameLoop);
}

/* 🐱 MOVIMIENTO */
function moveCat(){

    if(keys["ArrowUp"]) cat.y -= cat.speed;
    if(keys["ArrowDown"]) cat.y += cat.speed;

    if(keys["ArrowLeft"]) {
      cat.x -= cat.speed;
      cat.dir = "right";
    }

    if(keys["ArrowRight"]) {
      cat.x += cat.speed;
      cat.dir = "left";
    }



    cat.x = Math.max(0, Math.min(canvas.width - cat.size, cat.x));
    cat.y = Math.max(0, Math.min(canvas.height - cat.size, cat.y));
}


/* 🎨 ESCENA */

function drawScene(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawWoodFloor();
    drawShelves();
    drawTables();
    drawBooks();
    drawLamps();
    drawLaptop();
    drawCat();
    drawFlower();

}

/* 🪵 PISO */

function drawWoodFloor(){

    ctx.fillStyle = "#775993";
    ctx.fillRect(0,0,800,600);

    for(let i=0;i<20;i++){
        ctx.fillStyle = i % 2 ? "#bba5f7" : "#9a82d1";
        ctx.fillRect(i*40,0,40,600);
    }
}

function drawFlower(){

    if(!flowerImg.complete || flowerImg.naturalWidth === 0) return;

    flowerTime += 0.03;

    flowerSway = Math.sin(flowerTime) * 6;

    const flowerX = flower.x + flowerSway;
    const flowerY = flower.y;

    /* ✨ BRILLO CUANDO ESTÁ CERCA */

    if(isNear(flowerX + 45, flowerY + 45)){

        const glow = 18 + Math.sin(flowerTime * 2) * 4;

        ctx.save();

        ctx.fillStyle = "rgba(255, 120, 120, 0.25)";
        ctx.beginPath();
        ctx.arc(flowerX + 45, flowerY + 45, glow, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(255, 180, 200, 0.18)";
        ctx.beginPath();
        ctx.arc(flowerX + 45, flowerY + 45, glow + 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    /* 🌺 FLOR */

    ctx.drawImage(flowerImg, flowerX, flowerY, 90, 90);
}

/* 📚 LIBREROS */

function drawShelves(){
    ctx.fillStyle = "#3b2a1f";
    ctx.fillRect(0, 0, 800, 80);

    shelfBooks.forEach(book => {
        ctx.fillStyle = book.color;
        ctx.fillRect(book.x, book.y, book.width, book.height);
    });
}



/* 🪑 MESITAS */

function drawTables(){
    books.forEach(book=>{
        ctx.drawImage(tableImg, book.x - 20, book.y - 12, 70, 45);
    });
}


/* 📖 LIBROS */

function drawBooks(){

    books.forEach(book=>{

        if(isNear(book.x + 15, book.y + 11)){
            ctx.fillStyle = "#fff5f5";   // ✨ brillito suave
        } else {
            ctx.fillStyle = "white";
        }

        ctx.fillRect(book.x, book.y, 26, 20);

        ctx.strokeStyle = "#ddd";
        ctx.strokeRect(book.x, book.y, 26, 20);
    });
}

function drawParticles(){

    particles.forEach(p => {

        ctx.save();

        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if(p.type === "heart"){
            ctx.fillStyle = "rgba(255,180,200,0.7)";
            ctx.font = p.size + "px serif";
            ctx.fillText("❤", 0, 0);
        }
        else{
            ctx.fillStyle = "rgba(255,200,200,0.6)";
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size * 0.6, p.size, 0, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    });
}

/* 🕯 LÁMPARAS */

function drawLamps(){

    books.forEach(book=>{

        ctx.fillStyle = "rgba(255, 220, 150, 0.35)";
        ctx.beginPath();
        ctx.arc(book.x + 15, book.y - 18, 30, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#ffddaa";
        ctx.fillRect(book.x + 11, book.y - 32, 8, 14);
    });
}

/* 💻 LAPTOP */

function drawLaptop(){
    ctx.drawImage(laptopImg, laptop.x, laptop.y, 120, 90);
}


/* 🐱 GATITO */

function drawCat(){
    ctx.save(); // guardamos el estado actual del canvas

    if(cat.dir === "left"){
        // Voltear horizontalmente
        ctx.translate(cat.x + cat.size/2, cat.y + cat.size/2);
        ctx.scale(-1, 1); // espejo horizontal
        ctx.drawImage(catImg, -cat.size/2, -cat.size/2, cat.size, cat.size);
    } else {
        // Normal
        ctx.drawImage(catImg, cat.x, cat.y, cat.size, cat.size);
    }

    ctx.restore(); // restauramos el estado del canvas
}

function openApp(type){

    const title = document.getElementById("appTitle");
    const content = document.getElementById("appContent");
    const mensajesCartitas = [
    "Gracias por existir en mi vida ❤️",
    "Tu sonrisa es mi lugar favorito 😌",
    "Contigo todo es más bonito ✨",
    "Eres mi casualidad favorita 💕",
    "Me encantas más de lo que imaginas 😏",
    "Siempre tú seras el amor de mi vida ❤️",
    "Eres mi persona favorita,la que siempre me hace sentir feliz 😌",
    "Eres la paz que siempre necesite,enserio te amo mi cielo ✨",
    "Mi lugar seguro es a tu lado,estar contigo para mi es lo mejor 💖",
    "Te elegiría mil veces en esta y todas las vidas 💕"
];


    content.innerHTML = "";

    if(type === "suenos"){
        title.innerText = "Sueños y metas contigo 💭";
        content.innerHTML = `
<ul class="romanticList">
    <li>Viajar juntos por el mundo :3 </li>
    <li>Reír contigo todos los días :3 </li>
    <li>Conocernos en persona :3 </li>
    <li>Vernos en el concierto de Humbe :3 </li>
    <li>Casarnos cuando estemos listos :3</li>
    <li>Tener miles de citas juntos :3</li>
    <li>Tener unos lindos niños :3</li>
    <li>Cumplir nuestras metas individuales :3</li>
    <li>Vivir juntos :D</li>
    <li>Conocer a nuestras familias :3</li>
    <li>Ser felices y estar juntos para siempre :3</li>
    <li>Disfrutar nuestro dia a dia,mejorar con el tiempo y cumplir con todo esto :3 ❤️</li>
</ul>
`;

    }

    if(type === "amo"){
        title.innerText = "Lo que amo de ti ❤️";
        content.innerHTML = `
<ul class="romanticList">
    <li>Tu sonrisa 😌</li>
    <li>Tu voz 💕</li>
    <li>Tu forma de mirarme ✨</li>
    <li>Tu manera de existir ❤️</li>
    <li>Tu forma de ser 😌</li>
    <li>Tu fisico 💕</li>
    <li>Tus ojitos ✨</li>
    <li>La manera de amarme ❤️</li>
    <li>Como siempre me apoyas y ayudas 😌</li>
    <li>Tus besos 💕</li>
    <li>Tus mimos ✨</li>
    <li>Tu carita toda hermosa ❤️</li>
    <li>Tus ganas de salir adelante 😌</li>
    <li>Tuuuu me encantaass 💕</li>
    <li>Cuando me invitas a estar contigo ✨</li>
    <li>Lo emocionada que te pones a hablar de nuestro futuro ❤️</li>
    <li>Tus planes 😌</li>
    <li>Tu cabello :3 💕</li>
    <li>Como me calmas  ✨</li>
    <li>Como me animas ❤️</li>
    <li>Tus chichis :3 ksk 😌</li>
    <li>Tu brillo 💕</li>
    <li>Tu creatividad ✨</li>
    <li>Tus detalles ❤️</li>
    <li>Tu lado maduro 😌</li>
    <li>Tu lado tierno  💕</li>
    <li>Tus berrinches ✨</li>
    <li>Tus celos ❤️</li>
    <li>Cuando te terminas de arreglar y joderr te ves hermosa 😌</li>
    <li>Cuando recien te levantas :3 💕</li>
    <li>Cuando me llamas en el trabajo ✨</li>
    <li>Cuando te emocionas por verme ❤️</li>
    <li>amo cuando bailas 😌</li>
    <li>Lo valiente que eres 💕</li>
    <li>La exclusividad que me das ✨</li>
    <li>Tu,sencillamente TU me encantas,todo todo todo de ti me encanta y se que por eso me falto escribir mucho mas aqui y se que cuando nos veamos en persona seran muchas mas y siempre iran aumentando :3 ❤️</li>
</ul>
`;
    }

    if(type === "imagenes"){

        title.innerText = "Nuestras imágenes 🖼️";

        const grid = document.createElement("div");
        grid.style.display = "grid";
        grid.style.gridTemplateColumns = "repeat(4, 1fr)";
        grid.style.gap = "10px";
        grid.style.marginTop = "10px";

        const images = [
            "img/foto1.jpeg",
            "img/foto2.jpeg",
            "img/foto3.jpeg",
            "img/foto4.jpeg",
            "img/foto5.jpeg",
            "img/foto6.jpeg",
            "img/foto7.jpeg",
            "img/foto8.jpeg"
        ];

        for(let i=0; i<8; i++){

    const frame = document.createElement("div");

    frame.style.background = "white";
    frame.style.padding = "8px";
    frame.style.borderRadius = "6px";
    frame.style.boxShadow = "0 6px 12px rgba(0,0,0,0.25)";
    const rotation = (Math.random()*6 - 3);

    frame.style.transform = "rotate(" + rotation + "deg)";
 
    frame.style.transition = "0.3s";
    frame.style.cursor = "pointer";

    const box = document.createElement("div");

    box.style.width = "100%";
    box.style.height = "120px";   // ✅ altura real
    box.style.position = "relative";
    box.style.overflow = "hidden";
    box.style.borderRadius = "6px";


    const img = document.createElement("img");
    img.src = images[i];
    img.style.position = "absolute";
    img.style.top = "0";
    img.style.left = "0";

    img.style.width = "100%";
    img.style.height = "100%";

    img.style.objectFit = "cover";
    img.style.objectPosition = "center center";

    img.style.background = "black";

    img.style.transition = "0.3s";

    frame.addEventListener("mouseenter", () => {
    frame.style.transform = "rotate(" + rotation + "deg) scale(1.05)";
});

frame.addEventListener("mouseleave", () => {
    frame.style.transform = "rotate(" + rotation + "deg)";
});


    box.appendChild(img);
    frame.appendChild(box);
    grid.appendChild(frame);
}


        content.appendChild(grid);
    }

    if(type === "mensajes"){

    title.innerText = "Mensajes 💌";

    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(5, 1fr)";
    grid.style.gap = "12px";
    grid.style.marginTop = "15px";

    mensajesCartitas.forEach((mensaje, index) => {

        const sobre = document.createElement("div");

        sobre.innerText = "✉️";
        sobre.style.fontSize = "48px";
        sobre.style.padding = "10px";
        sobre.style.cursor = "pointer";
        sobre.style.transition = "0.25s";
        sobre.style.userSelect = "none";

        sobre.addEventListener("mouseenter", () => {
            sobre.style.transform = "scale(1.2)";
        });

        sobre.addEventListener("mouseleave", () => {
            sobre.style.transform = "scale(1)";
        });

        sobre.addEventListener("click", () => {

            content.innerHTML = "";   // 🔥 Limpia la ventana

            const carta = document.createElement("div");

            carta.style.background = "white";
            carta.style.padding = "20px";
            carta.style.borderRadius = "10px";
            carta.style.boxShadow = "0 10px 25px rgba(0,0,0,0.25)";
            carta.style.marginTop = "10px";
            carta.style.animation = "fadeIn 0.4s ease";

            carta.innerText = mensaje;

            const btnBack = document.createElement("button");
            btnBack.innerText = "Volver 💌";
            btnBack.style.marginTop = "15px";

            btnBack.onclick = () => openApp("mensajes");

            content.appendChild(carta);
            content.appendChild(btnBack);
        });

        grid.appendChild(sobre);
    });

    content.appendChild(grid);
}


    document.getElementById("appModal").classList.remove("hidden");
}


function updateParticles(){

    particles.forEach(p => {

        p.y += p.speedY;
        p.x += p.drift;
        p.rotation += 0.01;

        if(p.y > canvas.height){
            Object.assign(p, createParticle(), {
                y: -20
            });
        }

        if(p.x < -20) p.x = canvas.width + 20;
        if(p.x > canvas.width + 20) p.x = -20;
    });
}




function interact(){

      console.log("INTERACT funcionando");

    // 🌺 FLOR PRIMERO (máxima prioridad)
    if(
        cat.x + cat.size > flower.x &&
        cat.x < flower.x + 90 &&
        cat.y + cat.size > flower.y &&
        cat.y < flower.y + 90
    ){
        openFlower();
        return;
    }

    // 💻 Laptop después
    if(isNear(laptop.x + 25, laptop.y + 17)){
        openLaptop();
        return;
    }

    // 📖 Libros al final
    for(let book of books){
        if(isNear(book.x + 15, book.y + 11)){
            openBook(book.text);
            return;
        }
    }
}




/* 📏 DETECCIÓN PERFECTA */

function isNear(x, y){

    const catCenterX = cat.x + cat.size / 2;
    const catCenterY = cat.y + cat.size / 2;

    const distance = Math.hypot(catCenterX - x, catCenterY - y);

    return distance < 55;
}

/* 📖 LIBRO */

function openBook(text){

    document.getElementById("bookText").innerText = text;
    document.getElementById("bookModal").classList.remove("hidden");
}

function closeBook(){
    document.getElementById("bookModal").classList.add("hidden");
    canvas.focus(); 
}

function openFlower(){

    if(flowerOpen) return;

    flowerOpen = true;

    document.getElementById("flowerModal").classList.remove("hidden");

    // 🔥 FIX CRÍTICO
    setTimeout(() => canvas.focus(), 50);
}


function closeFlower(){

    flowerOpen = false;

    document.getElementById("flowerModal").classList.add("hidden");

    canvas.focus();
}

document.addEventListener("click", () => {
    canvas.focus();
});


/* 💻 LAPTOP */

function openLaptop(){
    document.getElementById("laptopModal").classList.remove("hidden");
}

function closeLaptop(){
    document.getElementById("laptopModal").classList.add("hidden");
    canvas.focus();
}


function closeApp(){
    document.getElementById("appModal").classList.add("hidden");
    canvas.focus();
}

const music = document.getElementById("bgMusic");

document.addEventListener("click", () => {
    music.play();
}, { once: true });




/* 🚀 START */

gameLoop();
