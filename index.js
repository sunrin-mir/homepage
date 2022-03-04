let dotNumber = 1;
let x_position = 0;

let portfolioDotArr = [1,1,1,1,1,1,1,1,1];
let portfolioXposition = [0,0,0,0,0,0,0,0,0];

let overlayArr;
let slider;
let modal;
let modalImg;
let modalClose;

let isDown = false;
let startX;
let scrollLeft;


function onSpriteClick(direction) {
    let style = getComputedStyle(document.querySelector("#room_sprite")).background;
    let idx_Xpx = style.indexOf("px");
    let idx_temp = style.indexOf("scroll") + 7;
    x_position = parseInt(style.slice(idx_temp, idx_Xpx));

    if (direction === "left") {
        x_position += 563;
        if (dotNumber <= 1) {
            dotNumber = 3;
        } else {
            dotNumber--;
        }
    } else {
        x_position -= 563;
        if (dotNumber >= 3) {
            dotNumber = 1;
        } else {
            dotNumber++;
        }
    }
    document.querySelector("#room_sprite").style.background = `url('room_sprite.jpg') ${x_position}px 0`;
    setColor();
    document.querySelector(`#dots${dotNumber}`).style.color = "white";

}

function disableClick(element) {
    element.style.pointerEvents = "none";
    setTimeout(() => {
        element.style.pointerEvents = "auto"
    }, 400);
}

function setColor(target =0) {
    if(target == 0) {
        for (let i = 1; i <= 3; i++) {
            document.querySelector(`#dots${i}`).style.color = "gray";
        }
    } else {
        let numofPortfolio = document.querySelector(`.portfolio${target}`).querySelector(".portfolioSlide").childElementCount;
        for (let i = 1; i <= numofPortfolio; i++) {
            document.querySelector(`#portfolio${target}Dot${i}`).style.color = "gray";
        }
    }
    
}

function changeSpriteByNumber(number) {
    if (dotNumber <= number) {
        x_position -= ((number - dotNumber) * 563);
    } else {
        x_position += ((dotNumber - number) * 563);
    }
    document.querySelector("#room_sprite").style.background = `url('room_sprite.jpg') ${x_position}px 0`;
    dotNumber = number;
    setColor();
    document.querySelector(`#dots${dotNumber}`).style.color = "white";
}

function displayModal(number) {
    modal.style.display = "block";
    modalImg.src = `full_posters/no${number}.jpg`;
    modalImg.style.transform = "calc(60%)";
}

function myscrollTo(element) {
    document.querySelector(`.${element}`).scrollIntoView();
}

window.addEventListener("load", () => {
    overlayArr = document.querySelectorAll(".overlay");
    posterArr = document.querySelectorAll('.poster');
    slider = document.querySelector('#posters');
    modal = document.getElementById("modal");
    modalImg = document.getElementById("modalImg");
    modalClose = document.querySelector("#close");

    for(let i =0; i < posterArr.length; i++ ) {
        posterArr[i].addEventListener("dblclick", () => {
            displayModal(i+1);
        })
    }

    overlayArr.forEach(el => {
        el.addEventListener("mouseover", () => {
            el.classList.add("active");
        })

        el.addEventListener('mousedown', () => {
            el.style.cursor = "grabbing";
        })

        el.addEventListener('mouseleave', () => {
            el.style.cursor = "pointer";

        });

        el.addEventListener('mouseup', () => {
            el.style.cursor = "pointer";
        })

        el.addEventListener("mouseout", () => {
            el.classList.remove("active");
        })
    })


    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = "grabbing";
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
        isDown = false;

    });
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = "grab";
    });
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
    });

    modal.addEventListener("change", () => {
        if(modal.style.display == "block") {
            document.querySelector("body").classList.add("stop-scrolling");
        } else {
            document.querySelector("body").classList.remove("stop-scrolling");
        }
    })

    modalClose.addEventListener('click', () => {
        modal.style.display = "none";
    })
})


function portfolioArrowHandler(target, direction) {
    let style = getComputedStyle(document.querySelector(`.portfolio${target}`)).background;
    let numofPortfolio = document.querySelector(`.portfolio${target}`).querySelector(".portfolioSlide").childElementCount;
    let idx_Xpx = style.indexOf("px");
    let idx_temp = style.indexOf("scroll") + 7;
    portfolioXposition[target-1] = parseInt(style.slice(idx_temp, idx_Xpx));

    if (direction === "left") {
        portfolioXposition[target-1] += 425;
        if (portfolioDotArr[target-1] <= 1) {
            portfolioDotArr[target-1] = numofPortfolio;
        } else {
            portfolioDotArr[target-1]--;
        }
    } else {
        portfolioXposition[target-1] -= 425;
        if (portfolioDotArr[target-1] >= numofPortfolio) {
            portfolioDotArr[target-1] = 1;
        } else {
            portfolioDotArr[target-1]++;
        }
    }
    document.querySelector(`.portfolio${target}`).style.background = `url('portfolio_sprite/no${target}.jpg') ${portfolioXposition[target-1]}px 0`;
    setColor(target);
    document.querySelector(`#portfolio${target}Dot${portfolioDotArr[target-1]}`).style.color = "white";
}
