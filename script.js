// =======================================================================================|
// NAVBAR


// =======================================================================================|
// BANNER

bannerIndex = 0;
InitBanners();

function InitBanners(){

    // -----------------------------------------------------|
    // Initialize slides
    
    let banners = document.getElementsByClassName("main-banner__img")

    for (i = 0; i < banners.length; i++){
        banners[i].style.display = "none";
    }

    banners[0].style.display = "block";

}

function NextSlide(){
    let banners = document.getElementsByClassName("main-banner__img")

    // -----------------------------------------------------|
    // Increase bannerIndex

    bannerIndex++;
    if (bannerIndex >= banners.length) { bannerIndex = 0; }

    // -----------------------------------------------------|
    // Display the visible banner

    for (i = 0; i < banners.length; i++){
        banners[i].style.display = "none";
    }

    banners[bannerIndex].style.display = "block";

}

// =======================================================================================|

function ShowMenu(){
    let menu = document.getElementById("nav-bar__menu-container");
    if(menu.style.display == "none"){
        menu.style.display = "flex";
    }else{
        menu.style.display = "none";
    }

}