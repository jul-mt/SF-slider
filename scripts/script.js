let images = [
    {
        url: './images/image2-1.jpg',
        sity: 'Rostov-on-Don',
        adress: 'LCD admiral',
        time: '3.5 month',
        area: '81 m2'
    },{
        url: "./images/Section2Mobile.jpg",
        sity: 'Sochi',
        adress: 'Thieves',
        time: '5.3 month',
        area: '181 m2'
    },{
        url: "./images/Section6Img3.jpg",
        sity: 'Rostov-on-Don',
        adress: 'Patriotic center',
        time: '8 month',
        area: '777 m2'
    },
];

function initSlider (options) {
    if (!images || !images.length) return;
    
    options = options || {
        autoplay: false
      };

    let projectsphotos = document.querySelector(".section2-projectsphoto");
    let arrows = document.querySelector(".section2-projectnavigation");
    let param = document.querySelector(".section2-projectparam");
    let projNames = document.querySelector(".section2-projectslist");
    let sliderDots = document.querySelector(".section2-projectnavigation__dots");
    


    initImages();
    initArrow();
    initDots();
    projNameClick();

    if (options.autoplay) {
        initAutoplay();
      }


    function initImages() {
        images.forEach((image, index) => {
            let imgDiv = `<div class="section2_image n${index} ${index === 0 ? "active" : ""}" style="background-image:url(${images[index].url});" data-index = "${index}"></div>`;
            projectsphotos.innerHTML +=  imgDiv;


        })
    }


    function initArrow() {
        arrows.querySelectorAll(".sliderArrow").forEach(arrow => {
            arrow.addEventListener("click", function () {
                

                let cutNumber = +projectsphotos.querySelector(".active").dataset.index;
                let nextNumber;

                if (arrow.classList.contains("left")){
                    nextNumber = cutNumber === 0? images.length - 1 : cutNumber - 1;
                } else {
                    nextNumber = cutNumber === images.length - 1 ? 0 : cutNumber + 1;
                }

                moveSlider(nextNumber);

                
                
            });

        });

    }



    function initDots () {
        images.forEach((image, index) => {
            let dot = `<div class="section2-projectnavigation__dot n${index} ${index === 0 ? "activeDot" : ""}" data-index = "${index}"></div>`
            sliderDots.innerHTML += dot;

        });

        sliderDots.querySelectorAll(".section2-projectnavigation__dot").forEach(dot =>{
            dot.addEventListener("click", function (){
                moveSlider(this.dataset.index);                
            });
        });
    }


    function projNameClick() {
        projNames.querySelectorAll(".section2-projectslist__item").forEach(item =>{
            item.addEventListener('click', function() {
                
                moveSlider(this.dataset.index);
            })
        })

    }

    


    function moveSlider(num) {

        

        projectsphotos.querySelector(".active").classList.remove("active");
        projectsphotos.querySelector(`.n${num}`).classList.add("active");

        sliderDots.querySelector(".activeDot").classList.remove("activeDot");
        sliderDots.querySelector(`.n${num}`).classList.add("activeDot");

        projNames.querySelector(".projActive").classList.remove("projActive");
        projNames.querySelector(`.proj${+num+1}`).classList.add("projActive");

        param.querySelector(".sity").innerText = images[num].sity;
        param.querySelector(".adress").innerText = images[num].adress;
        param.querySelector(".square").innerText = images[num].area;
        param.querySelector(".time").innerText = images[num].time;

    }


    function initAutoplay() {
        setInterval(() => {
          let curNumber = +projectsphotos.querySelector(".active").dataset.index;
          let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
          moveSlider(nextNumber);
        }, options.interval);
      }


}

let sliderOptions = {
    autoplay: true,
    interval: 3000,
}

document.addEventListener("DOMContentLoaded", function() {
    initSlider(sliderOptions);
  });

