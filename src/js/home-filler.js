/* eslint-disable */

function generateHTMLFromCSV() {
    let baseFolder;
    if(window.location.href.includes("localhost")){
        baseFolder = "/";
    }
    else{
        baseFolder = "/WebsiteJoke/";
    }
    const url = baseFolder + "csv/home.csv";

//     fetch(url)
//         .then(response => response.text())
//         .then(data => {
//             var rows = data.split("\r\n"); 
//             var htmlCode = "";

//             for (var i = 0; i < rows.length - 1; i++) {
//                 console.log(rows[i])
//                 if(i == rows.length - 1 && rows[i].trim() == ""){
//                     break;
//                 }   
//                 htmlCode += `<div class="swiper-slide swiper-slide-overlay-disable swiper-slide-center" data-slide-bg="${baseFolder}images/home/${i + 1}.jpg"></div>`
//             }
//             document.getElementById('swiper-wrapper').innerHTML = htmlCode;
//     })
//   .catch(error => console.log(error));

 
    var htmlCode = "";
    htmlCode += `<div class="swiper-slide swiper-slide-overlay-disable swiper-slide-center" data-slide-bg="${baseFolder}images/home/${1}.jpg"></div>`;
    htmlCode += `<div class="swiper-slide swiper-slide-overlay-disable swiper-slide-center" data-slide-bg="${baseFolder}images/home/${2}.jpg"></div>`;
    htmlCode += `<div class="swiper-slide swiper-slide-overlay-disable swiper-slide-center" data-slide-bg="${baseFolder}images/home/${3}.jpg"></div>`;
    document.getElementById('swiper-wrapper').innerHTML = htmlCode;
}

document.addEventListener("DOMContentLoaded", () => {
    generateHTMLFromCSV();
  });


