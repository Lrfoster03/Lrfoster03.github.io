window.onload = event => {
  //alert();
};

//This is some additional code for the Image slideshow

var slideIndex = 1;

var myTimer;

var slideshowContainer;

window.addEventListener("load", function () {
  showSlides(slideIndex);
  myTimer = setInterval(function () { plusSlides(1) }, 5000);


})

// NEXT AND PREVIOUS CONTROL
function plusSlides(n) {
  clearInterval(myTimer);
  if (n < 0) {
    showSlides(slideIndex -= 1);
  } else {
    showSlides(slideIndex += 1);
  }


  //Set the auto-fade continuously, repeats as a loop, every 3 secs//
  if (n === -1) {
    myTimer = setInterval(function () { plusSlides(n + 2) }, 10000);
  } else {
    myTimer = setInterval(function () { plusSlides(n + 1) }, 10000);
  }

  //Pause Video when Change Slides
  if (slideIndex != 1) {
    document.getElementsByClassName("Code Club Video")[0].pause();
  }
}

//Controls the current slide and resets interval if needed
function currentSlide(n) {
  clearInterval(myTimer);
  myTimer = setInterval(function () { plusSlides(n + 1) }, 10000);
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

pause = () => {
  clearInterval(myTimer);
}

resume = () => {
  clearInterval(myTimer);
  myTimer = setInterval(function () { plusSlides(slideIndex) }, 3000);
}