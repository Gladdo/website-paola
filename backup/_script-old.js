// =======================================================================================|
// =======================================================================================|
// VERTICAL BACKGROUND LINES SETUP

document.addEventListener('DOMContentLoaded', function() {
   
    // -----------------------------------------------------|
    // Get the page height 

    const body = document.body;
    const html = document.documentElement;
    const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    
    // -----------------------------------------------------|
    // Get the left vertical line

    var vertical_line = document.getElementById("vertical-line");

    // -----------------------------------------------------|
    // Setup the left vertical line layout 
    
    vertical_line.style.position = "absolute";
    vertical_line.style.height = height;
    vertical_line.style.width = "60px";
    vertical_line.style.left = "0";
    vertical_line.style.marginLeft = "20px";
    vertical_line.style.zIndex = -1;

    // -----------------------------------------------------|
    // Setup the left vertical line style

    vertical_line.style.backgroundImage = "url('rsc/wood-texture.jpg')";
    vertical_line.style.backgroundRepeat = "repeat";
    vertical_line.style.filter = "drop-shadow(4px 2px 6px rgba(0, 0, 0, 0.5))";
    
    // -----------------------------------------------------|
    // Get the right vertical line

    var vertical_line_r = document.getElementById("vertical-line-r");

    vertical_line_r.style.position = "absolute";
    vertical_line_r.style.width = "60px";
    vertical_line_r.style.height = height;
    vertical_line_r.style.right = "0";
    vertical_line_r.style.marginRight = "20px";
    vertical_line_r.style.zIndex = -1;

    // -----------------------------------------------------|
    // Setup the right vertical line style

    vertical_line_r.style.backgroundImage = "url('rsc/wood-texture.jpg')";
    vertical_line_r.style.backgroundRepeat = "repeat";
    vertical_line_r.style.filter = "drop-shadow(-4px -2px 6px rgba(0, 0, 0, 0.5))";

});

// =======================================================================================|
// =======================================================================================|
// MAIN BANNER

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
// =======================================================================================|
// BUILD SECTION BACKGROUND

document.addEventListener('DOMContentLoaded', function() {
    const svgns = 'http://www.w3.org/2000/svg';
    /* ----------------------------------------------------------- */
    /* SETUP SECTION BACKGROUND HEIGTH AND PADDING */
    /* Setup section-background height and top padding to respectively section-content height and section-wrapper padding */
    var section_background = document.createElement("div");
    var c_height = document.getElementById("section-content").clientHeight;
    var c_width = document.getElementById("section-content").clientWidth;
    var wrapper = document.getElementById("section-wrapper");

    var svg = document.createElementNS(svgns, 'svg')
    svg.style.width = "0";
    svg.style.height = "0";
    svg.viewBox = "0 0 500 500";
    svg.preserveAspectRatio = "none";

    var defs = document.createElementNS(svgns, 'defs');

    var clipPath = document.createElementNS(svgns, 'clipPath');
    clipPath.setAttributeNS(null, "clipPathUnits", "objectBoundingBox");
    clipPath.id = "svgPath";

    // -----------------------------------------------------|
    // Build the borders path
    // Coordinate system: (0,0) on top left, (1,1) on bottom right

    var pt_height = [ 0.02, 0.05, 0.015];                // Points heights are specified as a perchentage of the width
    var cpt_height = [ 0.01, 0.08, 0.01];
    const coeff = (c_width) / c_height;               // pt * c_width finds a pixel_size; pixel_size / c_height find the relative size on the range [0,1] relative to c_height 

    /* if (false){
        var path_str = "M 0,0 L 1,0 L 1,1 L 0,1 Z";
    }else{ */

    pt_height[0] = pt_height[0] * coeff;         
    pt_height[1] = pt_height[1] * coeff;
    pt_height[2] = pt_height[2] * coeff;

    cpt_height[0] = cpt_height[0] * coeff;
    cpt_height[1] = cpt_height[1] * coeff;
    cpt_height[2] = cpt_height[2] * coeff;

    const vertical_trsl = 1 - pt_height[1]*1.5;

    var b_pt = [ vertical_trsl + pt_height[2], vertical_trsl + pt_height[1], vertical_trsl + pt_height[0]];
    var b_cpt = [ vertical_trsl + cpt_height[2], vertical_trsl + cpt_height[1], vertical_trsl + cpt_height[0]];
    
    var mid_pt_horizontal = 0.5;

    var left_midcpt_horizontal =            mid_pt_horizontal - 0.2;
    var left_midcpt_height =                cpt_height[1];
    var right_midcpt_horizontal =           mid_pt_horizontal + 0.2;
    var right_midcpt_height =               pt_height[1] - (cpt_height[1] - pt_height[1]);
            
    var bottm_left_midcpt_height =          vertical_trsl + left_midcpt_height;
    var bottm_right_midcpt_height =         vertical_trsl + right_midcpt_height;

    var path_str =  "M  " + 0                               + "," + pt_height[0]                +   // PT0
                    "C  " + 0.2                             + "," + cpt_height[0]               +   // CPT0
                    "   " + left_midcpt_horizontal          + "," + cpt_height[1]               +   // LEFT CPT1
                    "   " + mid_pt_horizontal               + "," + pt_height[1]                +   // PT1
                    "C  " + right_midcpt_horizontal         + "," + right_midcpt_height         +   // RIGHT CPT 1
                    "   " + 0.8                             + "," + cpt_height[2]               +   // CPT 2
                    "   " + 1                               + "," + pt_height[2]                +   // PT 2
                    "L  " + 1                               + "," + b_pt[2]                     +   // BPT2
                    "C  " + 0.8                             + "," + b_cpt[2]                    +   // BCPT2
                    "   " + right_midcpt_horizontal         + "," + bottm_right_midcpt_height   +   // BCPT1
                    "   " + mid_pt_horizontal               + "," + b_pt[1]                     +   // BPT1
                    "C  " + left_midcpt_horizontal          + "," + bottm_left_midcpt_height    +   // BCPT1
                    "   " + 0.2                             + "," + b_cpt[0]                    +   // BCPT0
                    "   " + 0                               + "," + b_pt[0]                     +   // BPT0 
                    " Z";   
    
    /* } */
    
    var path = document.createElementNS(svgns, 'path');
    path.setAttributeNS(null, "d", path_str );
    path.setAttributeNS(null, "style", "stroke: none; fill: red;");

    // -----------------------------------------------------|
    // Build the vertical line

    var vertical_line_left = document.createElement("div");
    vertical_line_left.style.position = "absolute";
    vertical_line_left.style.width = "60px";
    vertical_line_left.style.height = "100%";
    vertical_line_left.style.backgroundColor = "#521717";
    vertical_line_left.style.zIndex = 2;
    vertical_line_left.style.filter = "drop-shadow(6px 0px 6px rgba(0, 0, 0, 0.5))";
    vertical_line_left.style.marginLeft = "20px";

    var vertical_line_right = document.createElement("div");
    vertical_line_right.style.position = "absolute";
    vertical_line_right.style.width = "60px";
    vertical_line_right.style.height = "100%";
    vertical_line_right.style.backgroundColor = "#521717";
    vertical_line_right.style.zIndex = 2;
    vertical_line_right.style.filter = "drop-shadow(-6px 0px 6px rgba(0, 0, 0, 0.5))";
    vertical_line_right.style.marginRight = "20px";
    vertical_line_right.style.right = "0px";

    // -----------------------------------------------------|
    // Build the background div component
    
    section_background.style.clipPath = "url(#svgPath)";
    section_background.style.position = "absolute";
    section_background.style.overflow = "clip";
    section_background.style.width = "100%";
    section_background.style.height = c_height;
    section_background.style.top = window.getComputedStyle(wrapper).getPropertyValue('padding-top');
    section_background.style.background = "radial-gradient(#ce0707, #610404)"; // 7E0000

    // -----------------------------------------------------|
    // Append html elements

    svg.appendChild(defs);
    defs.appendChild(clipPath);
    clipPath.appendChild(path);
    section_background.appendChild(svg);
    section_background.appendChild(vertical_line_left);
    section_background.appendChild(vertical_line_right);
    wrapper.appendChild(section_background);

});

// =======================================================================================|
// =======================================================================================|
// MOBILE MENU

function ShowMenu(){
    let menu = document.getElementById("nav-bar__menu-container");
    if(menu.style.display == "none"){
        menu.style.display = "flex";
    }else{
        menu.style.display = "none";
    }

}