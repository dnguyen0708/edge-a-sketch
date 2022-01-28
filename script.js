const container = document.querySelector('.grid-container');
const resizeBtn = document.querySelector(".resize");
const body = document.querySelector('body');
const rgbSelector = document.querySelector("#rgb");
const blackSelector = document.querySelector("#black");
const eraserSelector = document.querySelector("#eraser");
const clearBtn = document.querySelector(".clearGrid");

// const size = window.prompt("enter number of grids: ");

//initial size
let size = 16;

// function getRGB() {                          // changes rgb each subsequent mouseover
//     let r = Math.floor(Math.random() * 256);
//     let g = Math.floor(Math.random() * 256);
//     let b = Math.floor(Math.random() * 256);
//     return { r, g, b };
// }

//get user input and make new grid
function resizeGrid() {
    while (true) {
        try {
            size = Math.abs(parseInt(window.prompt("enter number of grids: ")));
            if (isNaN(size)) {
                alert("invalid input");
                continue;
            }
            if (size > 100) {
                alert("can't be greater than 100");
                continue;
            }
            buildGrid();
            break;
        } catch (e) {
            alert("invalid input");
            console.log(e);
        }
    }
}


//color selector
blackSelector.addEventListener('click', function (e) {
    this.checked = true;
    rgbSelector.checked = false;
    eraserSelector.checked = false;
})
rgbSelector.addEventListener('click', function (e) {
    this.checked = true;
    blackSelector.checked = false;
    eraserSelector.checked = false;
})
eraserSelector.addEventListener('click', function (e) {
    this.checked = true;
    blackSelector.checked = false;
    rgbSelector.checked = false;
})

//clear board(grid)
function clearGrid() {
    container.childNodes.forEach(child => {
        child.style.backgroundColor = 'white';
    })
    // console.log("clear!");
}

function buildGrid() {
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size ** 2; i++) {
        const div = document.createElement('div');
        div.classList.add("grid");
        div.style.width = `${Math.floor(960 / size)}px`;
        div.style.height = `${Math.floor(960 / size)}px`;
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        div.addEventListener('mouseover', function (e) {
            if (rgbSelector.checked) {
                // const { r, g, b } = getRGB();
                this.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            } else if (blackSelector.checked) {
                this.style.backgroundColor = 'black';
            }
            else if (eraserSelector.checked) {
                this.style.backgroundColor = 'white';
            }

        })
        container.appendChild(div);
    }
    // console.log("rebuilded");
}
buildGrid();
resizeBtn.addEventListener('click', resizeGrid);
clearBtn.addEventListener('click', clearGrid);
// console.log(container.childNodes)