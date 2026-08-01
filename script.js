const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

let w, h;

function resize(){

    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;

}

resize();

window.addEventListener("resize",resize);



// PARTICLES

let particles = [];

for(let i=0;i<120;i++){

    particles.push({

        x:Math.random()*w,
        y:Math.random()*h,
        size:Math.random()*2+0.5,
        speed:Math.random()*0.5+0.2,
        alpha:Math.random()

    });

}



function drawParticles(){

    ctx.clearRect(0,0,w,h);


    particles.forEach(p=>{


        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI*2
        );


        ctx.fillStyle=
        `rgba(0,245,255,${p.alpha})`;

        ctx.fill();



        p.y -= p.speed;



        if(p.y < 0){

            p.y = h;
            p.x = Math.random()*w;

        }


    });


    requestAnimationFrame(drawParticles);

}


drawParticles();





// CUSTOM CURSOR


const cursor = document.querySelector(".cursor");


document.addEventListener("mousemove",(e)=>{


    cursor.style.left =
    e.clientX + "px";


    cursor.style.top =
    e.clientY + "px";



});




// CURSOR SCALE


document.querySelectorAll("a,.tags span")
.forEach(item=>{


item.addEventListener("mouseenter",()=>{


cursor.style.transform="scale(3)";


});



item.addEventListener("mouseleave",()=>{


cursor.style.transform="scale(1)";


});


});





// 3D CARD TILT


const cards =
document.querySelectorAll(".cards a");


cards.forEach(card=>{


card.addEventListener("mousemove",(e)=>{


const rect =
card.getBoundingClientRect();



const x =
e.clientX - rect.left;


const y =
e.clientY - rect.top;



const rotateX =
(y - rect.height/2) / 12;


const rotateY =
(rect.width/2 - x) / 12;



card.style.transform =

`
perspective(600px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-10px)
`;



});



card.addEventListener("mouseleave",()=>{


card.style.transform="";


});


});






// TEXT GLITCH EFFECT


const title =
document.querySelector(".content h1");


setInterval(()=>{


title.style.textShadow=
`
3px 0 #00f5ff,
-3px 0 #ff2d75
`;



setTimeout(()=>{


title.style.textShadow="";


},150);



},4000);





// SCROLL REVEAL


const sections =
document.querySelectorAll("section");


const observer =
new IntersectionObserver(entries=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.style.opacity="1";
entry.target.style.transform=
"translateY(0)";


}


});


});



sections.forEach(section=>{


section.style.opacity="0";

section.style.transform=
"translateY(50px)";


section.style.transition=
"1s ease";


observer.observe(section);


});