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
    vertical_line.style.zIndex = 1;

    // -----------------------------------------------------|
    // Setup the left vertical line style

    vertical_line.style.backgroundImage = "url('rsc/wood-texture.jpg')";
    vertical_line.style.backgroundRepeat = "repeat";
    vertical_line.style.filter = "drop-shadow(6px 0px 6px rgba(0, 0, 0, 0.5))";
    
    // -----------------------------------------------------|
    // Get the right vertical line

    var vertical_line_r = document.getElementById("vertical-line-r");

    vertical_line_r.style.position = "absolute";
    vertical_line_r.style.width = "60px";
    vertical_line_r.style.height = height;
    vertical_line_r.style.right = "0";
    vertical_line_r.style.marginRight = "20px";
    vertical_line_r.style.zIndex = 1;

    // -----------------------------------------------------|
    // Setup the right vertical line style

    vertical_line_r.style.backgroundImage = "url('rsc/wood-texture.jpg')";
    vertical_line_r.style.backgroundRepeat = "repeat";
    vertical_line_r.style.filter = "drop-shadow(-6px 0px 6px rgba(0, 0, 0, 0.5))";

});

// =======================================================================================|
// =======================================================================================|
// MAIN BANNER

bannerIndex = 0;
InitBanners();

function InitBanners(){

    // -----------------------------------------------------|
    // Initialize slides
    
    let banners = document.getElementsByClassName("hero-section__image")

    for (i = 0; i < banners.length; i++){
        banners[i].classList.add("hs-img-hidden-animation");
    }

    banners[bannerIndex].classList.remove("hs-img-hidden-animation");
    banners[bannerIndex].classList.add("hs-img-visible-animation");

}

function NextSlide(){
    let banners = document.getElementsByClassName("hero-section__image")

    // -----------------------------------------------------|
    // Increase bannerIndex

    var previous_index = bannerIndex;
    bannerIndex++;
    if (bannerIndex >= banners.length) { bannerIndex = 0; }

    // -----------------------------------------------------|
    // Display the visible banner

    banners[previous_index].classList.remove("hs-img-visible-animation");
    banners[previous_index].classList.add("hs-img-hidden-animation");

    banners[bannerIndex].classList.remove("hs-img-hidden-animation");
    banners[bannerIndex].classList.add("hs-img-visible-animation");

}

setInterval(()=>{ NextSlide(); }, 8000);

// =======================================================================================|
// =======================================================================================|
// BUILD SECTION BACKGROUND

var generatedPaths = 0;
var generatedBackgrounds = 0;
var oldWidth = 0;
const svgns = 'http://www.w3.org/2000/svg';

function MirrorCurvePointsVertically( inversion_range, pt, cpt ){
    var mirrored_pt = [ 
        { x: pt[2].x, y: inversion_range-pt[2].y }, 
        { x: pt[1].x, y: inversion_range-pt[1].y }, 
        { x: pt[0].x, y: inversion_range-pt[0].y }
    ]; 

    var mirrored_cpt = [ 
        { x: cpt[3].x, y: inversion_range-cpt[3].y },
        { x: cpt[2].x, y: inversion_range-cpt[2].y },
        { x: cpt[1].x, y: inversion_range-cpt[1].y },
        { x: cpt[0].x, y: inversion_range-cpt[0].y }
    ];

    return { pt: mirrored_pt, cpt: mirrored_cpt }; 
}

function UpdatePath(top_curve_pt, top_curve_cpt, bottom_curve_pt, bottom_curve_cpt, top_margin, bottom_margin){
    // -----------------------------------------------------|
    // Build the top border

    var pt = structuredClone(top_curve_pt);
    var cpt = structuredClone(top_curve_cpt);

    // -----------------------------------------------------|
    // Build the bottom border

    var b_pt = structuredClone(bottom_curve_pt);
    var b_cpt = structuredClone(bottom_curve_cpt);

    var b_points = MirrorCurvePointsVertically( 1 , b_pt, b_cpt);    
    b_pt = b_points.pt;
    b_cpt = b_points.cpt;

    // -----------------------------------------------------|
    // Apply offsets
    const bottom_offset = bottom_margin;
    const top_offset = top_margin;
    
    pt[0].y += top_offset;         
    pt[1].y += top_offset;   
    pt[2].y += top_offset;   

    cpt[0].y += top_offset;           
    cpt[1].y += top_offset;   
    cpt[2].y += top_offset;   
    cpt[3].y += top_offset;

    b_pt[0].y -= bottom_offset;         
    b_pt[1].y -= bottom_offset;   
    b_pt[2].y -= bottom_offset;   

    b_cpt[0].y -= bottom_offset;           
    b_cpt[1].y -= bottom_offset;   
    b_cpt[2].y -= bottom_offset;   
    b_cpt[3].y -= bottom_offset;  

    // -----------------------------------------------------|
    // Build the path

    var path_str =  "M  " + pt[0].x                         + "," + pt[0].y                 +   
                    "C  " + cpt[0].x                        + "," + cpt[0].y                +   
                    "   " + cpt[1].x                        + "," + cpt[1].y                +   
                    "   " + pt[1].x                         + "," + pt[1].y                 +   
                    "C  " + cpt[2].x                        + "," + cpt[2].y                +  
                    "   " + cpt[3].x                        + "," + cpt[3].y                +   
                    "   " + pt[2].x                         + "," + pt[2].y                 + 

                    "L  " + b_pt[0].x                       + "," + b_pt[0].y               +   
                    "C  " + b_cpt[0].x                      + "," + b_cpt[0].y              +   
                    "   " + b_cpt[1].x                      + "," + b_cpt[1].y              +   
                    "   " + b_pt[1].x                       + "," + b_pt[1].y               +   
                    "C  " + b_cpt[2].x                      + "," + b_cpt[2].y              +  
                    "   " + b_cpt[3].x                      + "," + b_cpt[3].y              +   
                    "   " + b_pt[2].x                       + "," + b_pt[2].y               +   
                    " Z";  
    return path_str; 
}

// Accetta paths specificati in coordinate relative al bounding box (con valori nell'intervallo [0,1])
function BuildClipPath( top_curve_pt, top_curve_cpt, bottom_curve_pt, bottom_curve_cpt, top_margin, bottom_margin){

    var clipPath = document.createElementNS(svgns, 'clipPath');
    clipPath.setAttributeNS(null, "clipPathUnits", "objectBoundingBox");
/*     clipPath.id = "svgPath" + generatedPaths;
    generatedPaths++; */

    // -----------------------------------------------------|
    // Build the borders path
    // Coordinate system: (0,0) on top left, (1,1) on bottom right

    // -----------------------------------------------------|
    // Build the top border

    var pt = structuredClone(top_curve_pt);
    var cpt = structuredClone(top_curve_cpt);

    // -----------------------------------------------------|
    // Build the bottom border

    var b_pt = structuredClone(bottom_curve_pt);
    var b_cpt = structuredClone(bottom_curve_cpt);

    var b_points = MirrorCurvePointsVertically( 1 , b_pt, b_cpt);    
    b_pt = b_points.pt;
    b_cpt = b_points.cpt;

    // -----------------------------------------------------|
    // Apply offsets
    const bottom_offset = bottom_margin;
    const top_offset = top_margin;
    
    pt[0].y += top_offset;         
    pt[1].y += top_offset;   
    pt[2].y += top_offset;   

    cpt[0].y += top_offset;           
    cpt[1].y += top_offset;   
    cpt[2].y += top_offset;   
    cpt[3].y += top_offset;

    b_pt[0].y -= bottom_offset;         
    b_pt[1].y -= bottom_offset;   
    b_pt[2].y -= bottom_offset;   

    b_cpt[0].y -= bottom_offset;           
    b_cpt[1].y -= bottom_offset;   
    b_cpt[2].y -= bottom_offset;   
    b_cpt[3].y -= bottom_offset;  

    // -----------------------------------------------------|
    // Build the path

    var path_str =  "M  " + pt[0].x                         + "," + pt[0].y                 +   
                    "C  " + cpt[0].x                        + "," + cpt[0].y                +   
                    "   " + cpt[1].x                        + "," + cpt[1].y                +   
                    "   " + pt[1].x                         + "," + pt[1].y                 +   
                    "C  " + cpt[2].x                        + "," + cpt[2].y                +  
                    "   " + cpt[3].x                        + "," + cpt[3].y                +   
                    "   " + pt[2].x                         + "," + pt[2].y                 + 

                    "L  " + b_pt[0].x                       + "," + b_pt[0].y               +   
                    "C  " + b_cpt[0].x                      + "," + b_cpt[0].y              +   
                    "   " + b_cpt[1].x                      + "," + b_cpt[1].y              +   
                    "   " + b_pt[1].x                       + "," + b_pt[1].y               +   
                    "C  " + b_cpt[2].x                      + "," + b_cpt[2].y              +  
                    "   " + b_cpt[3].x                      + "," + b_cpt[3].y              +   
                    "   " + b_pt[2].x                       + "," + b_pt[2].y               +   
                    " Z";   
   
    
    var path = document.createElementNS(svgns, 'path');
    path.setAttributeNS(null, "d", path_str );
    path.setAttributeNS(null, "style", "stroke: none; fill: red;");

    clipPath.appendChild(path);
    return clipPath;
}

/* // Accetta paths specificati in coordinate relative al bounding box (con valori nell'intervallo [0,1])
function BuildClipPath( top_margin, bottom_margin, container_px_width, container_px_height){

    var c_width = container_px_width;
    var c_height = container_px_height;

    var clipPath = document.createElementNS(svgns, 'clipPath');
    clipPath.setAttributeNS(null, "clipPathUnits", "objectBoundingBox");
    clipPath.id = "svgPath" + generatedPaths;
    generatedPaths++;

    // -----------------------------------------------------|
    // Build the borders path
    // Coordinate system: (0,0) on top left, (1,1) on bottom right

    // -----------------------------------------------------|
    // Build the top border

    const coeff = (c_width) / c_height;  // pt * c_width finds a pixel_size; pixel_size / c_height find the relative size on the range [0,1] relative to c_height 

    var pt = [ // Points y are specified as a perchentage of the width
        { x: 0,     y: 0.02 * coeff},    
        { x: 0.5,   y: 0.05 * coeff}, 
        { x: 1 ,    y: 0.015 * coeff} 
    ];         
    
    var cpt = [ // Points y are specified as a perchentage of the width
        { x: 0.2,               y: 0.01  * coeff}, 
        { x: pt[1].x - 0.2,     y: 0.08  * coeff},    
        { x: pt[1].x + 0.2,     y: (pt[1].y - (0.08 * coeff - pt[1].y )) }, 
        { x: 0.8,               y: 0.01  * coeff}
    ];

    // -----------------------------------------------------|
    // Build the bottom border

    var b_points = MirrorCurvePointsVertically( 1 , pt, cpt);    
    var b_pt = b_points.pt;
    var b_cpt = b_points.cpt;

    // -----------------------------------------------------|
    // Apply offsets
    const bottom_offset = bottom_margin;
    const top_offset = top_margin;
    
    pt[0].y += top_offset;         
    pt[1].y += top_offset;   
    pt[2].y += top_offset;   

    cpt[0].y += top_offset;           
    cpt[1].y += top_offset;   
    cpt[2].y += top_offset;   
    cpt[3].y += top_offset;

    b_pt[0].y -= bottom_offset;         
    b_pt[1].y -= bottom_offset;   
    b_pt[2].y -= bottom_offset;   

    b_cpt[0].y -= bottom_offset;           
    b_cpt[1].y -= bottom_offset;   
    b_cpt[2].y -= bottom_offset;   
    b_cpt[3].y -= bottom_offset;   

    // -----------------------------------------------------|
    // Build the path

    var path_str =  "M  " + pt[0].x                         + "," + pt[0].y                 +   
                    "C  " + cpt[0].x                        + "," + cpt[0].y                +   
                    "   " + cpt[1].x                        + "," + cpt[1].y                +   
                    "   " + pt[1].x                         + "," + pt[1].y                 +   
                    "C  " + cpt[2].x                        + "," + cpt[2].y                +  
                    "   " + cpt[3].x                        + "," + cpt[3].y                +   
                    "   " + pt[2].x                         + "," + pt[2].y                 + 

                    "L  " + b_pt[0].x                       + "," + b_pt[0].y               +   
                    "C  " + b_cpt[0].x                      + "," + b_cpt[0].y              +   
                    "   " + b_cpt[1].x                      + "," + b_cpt[1].y              +   
                    "   " + b_pt[1].x                       + "," + b_pt[1].y               +   
                    "C  " + b_cpt[2].x                      + "," + b_cpt[2].y              +  
                    "   " + b_cpt[3].x                      + "," + b_cpt[3].y              +   
                    "   " + b_pt[2].x                       + "," + b_pt[2].y               +   
                    " Z";   
   
    
    var path = document.createElementNS(svgns, 'path');
    path.setAttributeNS(null, "d", path_str );
    path.setAttributeNS(null, "style", "stroke: none; fill: red;");

    clipPath.appendChild(path);
    return clipPath;
} */

function BuildRedSectionBackground(section_width, section_height, main_color, main_color_shade, secondary_color, secondary_color_shade){
    /* ----------------------------------------------------------- */
    /* SETUP SECTION BACKGROUND HEIGTH AND PADDING */
    /* Setup section-background height and top padding to respectively section-content height and section-wrapper padding */
    var section_background = document.createElement("div");
    var c_height = section_height;
    var c_width = section_width;
    /* var wrapper = document.getElementById("section-wrapper"); */

    var svg = document.createElementNS(svgns, 'svg')
    svg.style.width = "0";
    svg.style.height = "0";
    svg.viewBox = "0 0 500 500";
    svg.preserveAspectRatio = "none";

    var defs = document.createElementNS(svgns, 'defs');

    // -----------------------------------------------------|
    // Build all the clip paths and append them to defs

    // --------------------------|
    // Define the curve path (specified with coordinates between 0 and 1)

    const coeff = (c_width) / c_height;  // pt * c_width finds a pixel_size; pixel_size / c_height find the relative size on the range [0,1] relative to c_height 

    
    var pt = [ // Points y are specified as a perchentage of the width
        { x: 0,     y: 0.02 * coeff},    
        { x: 0.5,   y: 0.05 * coeff}, 
        { x: 1 ,    y: 0.015 * coeff} 
    ];      
    
    var cpt = [ // Points y are specified as a perchentage of the width
        { x: 0.2,               y: 0.01  * coeff}, 
        { x: pt[1].x - 0.2,     y: 0.08  * coeff},    
        { x: pt[1].x + 0.2,     y: (pt[1].y - (0.08 * coeff - pt[1].y )) }, 
        { x: 0.8,               y: 0.01  * coeff}
    ];

/*     var b_pt = [ // Points y are specified as a perchentage of the width
        { x: 0,     y: 0.10 * coeff},    
        { x: 0.5,   y: 0.05 * coeff}, 
        { x: 1 ,    y: 0.015 * coeff} 
    ];      

    var b_cpt = [ // Points y are specified as a perchentage of the width
        { x: 0.3,               y: 0.15  * coeff}, 
        { x: pt[1].x - 0.2,     y: 0.08  * coeff},    
        { x: pt[1].x + 0.2,     y: (pt[1].y - (0.08 * coeff - pt[1].y )) }, 
        { x: 0.8,               y: 0.01  * coeff}
    ]; */

    // --------------------------|
    // Build the clipPaths

/*     var hl_clipPath = BuildClipPath(pt, cpt, pt ,cpt, 0.25, 0.55 );
    defs.appendChild(hl_clipPath); */

    var inner_clipPath = BuildClipPath(pt, cpt, pt ,cpt, 0.02, 0.02 );
    inner_clipPath.id = "red-section-background-clip-path";
    defs.appendChild(inner_clipPath);

    // -----------------------------------------------------|
    // Build the vertical line

    var inner_div = document.createElement("div");
    inner_div.style.position = "absolute";
    inner_div.style.width = "100%";
    inner_div.style.height = "100%";
    inner_div.style.zIndex = 2;
    var inner_div_background_str_2 = "radial-gradient(circle, rgba(255,42,15,1) 0%, rgba(138,4,8,1) 62%, rgba(51,0,2,1) 100%)" 
    var inner_div_background_str = "radial-gradient(circle, rgba(255,42,15,1) 0%, rgba(143,4,8,1) 66%, rgba(84,1,5,1) 100%)"
   /*  var inner_div_background_str = "radial-gradient( rgb(250,150,15), "+ main_color_shade +")"; *//* "radial-gradient( "+ main_color +", "+ main_color_shade +")";  */
    inner_div.style.background = inner_div_background_str/* "radial-gradient( rgb(255, 43, 15), #330002 )" */;  /* "radial-gradient(#ce0707, #610404)"; // 7E0000 */
    inner_div.style.clipPath = "url(#" + inner_clipPath.id + ")";

/*     var horizontal_line = document.createElement("div");
    horizontal_line.style.position = "absolute";
    horizontal_line.style.width = "100%";
    horizontal_line.style.height = "100%";
    horizontal_line.style.zIndex = 2;
    horizontal_line.style.backgroundColor = "white";
    horizontal_line.style.clipPath = "url(#" + hl_clipPath.id + ")"; */

    var vertical_line_left = document.createElement("div");
    vertical_line_left.style.position = "absolute";
    vertical_line_left.style.width = "60px";
    vertical_line_left.style.height = "100%";
    vertical_line_left.style.backgroundColor = secondary_color_shade;
    /* vertical_line_left.style.zIndex = 3; */
    vertical_line_left.style.filter = "drop-shadow(6px 0px 6px rgba(0, 0, 0, 0.5))";
    vertical_line_left.style.marginLeft = "20px";

    var vertical_line_right = document.createElement("div");
    vertical_line_right.style.position = "absolute";
    vertical_line_right.style.width = "60px";
    vertical_line_right.style.height = "100%";
    vertical_line_right.style.backgroundColor = secondary_color_shade;
    /* vertical_line_right.style.zIndex = 3; */
    vertical_line_right.style.filter = "drop-shadow(-6px 0px 6px rgba(0, 0, 0, 0.5))";
    vertical_line_right.style.marginRight = "20px";
    vertical_line_right.style.right = "0px";

    /* var wooden_vertical_line_left = document.createElement("div");
    wooden_vertical_line_left.style.position = "absolute";
    wooden_vertical_line_left.style.width = "60px";
    wooden_vertical_line_left.style.height = "100%";
    wooden_vertical_line_left.style.zIndex = 3;
    wooden_vertical_line_left.style.marginLeft = "20px";
    wooden_vertical_line_left.style.backgroundImage = "url('rsc/wood-texture.jpg')";
    wooden_vertical_line_left.style.backgroundRepeat = "repeat";
    wooden_vertical_line_left.style.filter = "drop-shadow(6px 0px 6px rgba(0, 0, 0, 0.5))";
    wooden_vertical_line_left.style.zIndex = "-2"

    var wooden_vertical_line_right = document.createElement("div");
    wooden_vertical_line_right.style.position = "absolute";
    wooden_vertical_line_right.style.width = "60px";
    wooden_vertical_line_right.style.height = "100%";
    wooden_vertical_line_right.style.zIndex = 3;
    wooden_vertical_line_right.style.filter = "drop-shadow(-6px 0px 6px rgba(0, 0, 0, 0.5))";
    wooden_vertical_line_right.style.marginRight = "20px";
    wooden_vertical_line_right.style.backgroundImage = "url('rsc/wood-texture.jpg')";
    wooden_vertical_line_right.style.backgroundRepeat = "repeat";
    wooden_vertical_line_right.style.zIndex = "-2"
    wooden_vertical_line_right.style.right = "0px"; */

    // -----------------------------------------------------|
    // Build the background div component
    
    /* section_background.style.clipPath = "url(#svgPath)"; */
    section_background.style.position = "absolute";
    section_background.style.overflow = "clip";
    section_background.style.width = "100%";
    section_background.style.height = c_height;
    section_background.style.top = "0";
    /* section_background.style.zIndex = "-1" */
    /* section_background.style.top = window.getComputedStyle(wrapper).getPropertyValue('padding-top'); */
    section_background.style.background =  "white";/* "radial-gradient("+secondary_color+", "+secondary_color+")"; */ // 7E0000 521717 #610404 #ce0707

    // -----------------------------------------------------|
    // Append html elements

    svg.appendChild(defs);
    section_background.appendChild(svg);
/*     section_background.appendChild(wooden_vertical_line_left);
    section_background.appendChild(wooden_vertical_line_right); */
    inner_div.appendChild(vertical_line_right);
    inner_div.appendChild(vertical_line_left);
    /* section_background.appendChild(horizontal_line); */
    section_background.appendChild(inner_div);
    /* wrapper.appendChild(section_background); */

    return section_background;
}

function BuildBlueSectionBackground(section_width, section_height, main_color, main_color_shade, secondary_color, secondary_color_shade){
    /* ----------------------------------------------------------- */
    /* SETUP SECTION BACKGROUND HEIGTH AND PADDING */
    /* Setup section-background height and top padding to respectively section-content height and section-wrapper padding */
    var section_background = document.createElement("div");
    var c_height = section_height;
    var c_width = section_width;
    /* var wrapper = document.getElementById("section-wrapper"); */

    var svg = document.createElementNS(svgns, 'svg')
    svg.style.width = "0";
    svg.style.height = "0";
    svg.viewBox = "0 0 500 500";
    svg.preserveAspectRatio = "none";

    var defs = document.createElementNS(svgns, 'defs');

    // -----------------------------------------------------|
    // Build all the clip paths and append them to defs

    // --------------------------|
    // Define the curve path (specified with coordinates between 0 and 1)

    const coeff = (c_width) / c_height;  // pt * c_width finds a pixel_size; pixel_size / c_height find the relative size on the range [0,1] relative to c_height 

    var pt = [ // Points y are specified as a perchentage of the width
        { x: 0,     y: 0.12 * coeff},    
        { x: 0.55,   y: 0.05 * coeff}, 
        { x: 1 ,    y: 0.15 * coeff} 
    ];      

    var cpt = [ // Points y are specified as a perchentage of the width
        { x: 0.3,      y: 0.15  * coeff}, 
        { x: pt[1].x - 0.2,     y: 0.08  * coeff},    
        { x: pt[1].x + 0.2,     y: (pt[1].y - (0.08 * coeff - pt[1].y )) }, 
        { x: 0.8,               y: 0.15  * coeff}
    ];

    var b_pt = [ // Points y are specified as a perchentage of the width
    { x: 0,     y: 0.12 * coeff},    
    { x: 0.45,   y: 0.05 * coeff}, 
    { x: 1 ,    y: 0.06 * coeff} 
    ];      
    
    var b_cpt = [ // Points y are specified as a perchentage of the width
        { x: 0.3,      y: 0.15  * coeff}, 
        { x: b_pt[1].x - 0.2,     y: 0.08  * coeff},    
        { x: b_pt[1].x + 0.2,     y: (b_pt[1].y - (0.08 * coeff - b_pt[1].y )) }, 
        { x: 0.8,               y: 0.08  * coeff}
    ];

    // --------------------------|
    // Build the clipPaths

    var inner_clipPath = BuildClipPath(pt, cpt, b_pt , b_cpt, 0.03, 0.04 );
    inner_clipPath.id = "blue-section-background-clip-path";
    defs.appendChild(inner_clipPath);

    // -----------------------------------------------------|
    // Build the vertical line

    var inner_div = document.createElement("div");
    inner_div.style.position = "absolute";
    inner_div.style.width = "100%";
    inner_div.style.height = "100%";
    inner_div.style.zIndex = 2;
    var inner_div_background_str = "radial-gradient( rgb(15,150,250), rgb(8, 4, 138) )";/* "radial-gradient( "+ main_color +", "+ main_color_shade +")" ; */
    inner_div.style.background = inner_div_background_str;  /* "radial-gradient(#ce0707, #610404)"; // 7E0000 */
    inner_div.style.clipPath = "url(#" + inner_clipPath.id + ")";

/*     var horizontal_line = document.createElement("div");
    horizontal_line.style.position = "absolute";
    horizontal_line.style.width = "100%";
    horizontal_line.style.height = "100%";
    horizontal_line.style.zIndex = 2;
    horizontal_line.style.backgroundColor = "white";
    horizontal_line.style.clipPath = "url(#" + hl_clipPath.id + ")"; */

    var vertical_line_left = document.createElement("div");
    vertical_line_left.style.position = "absolute";
    vertical_line_left.style.width = "60px";
    vertical_line_left.style.height = "100%";
    vertical_line_left.style.backgroundColor = secondary_color_shade;
    /* vertical_line_left.style.zIndex = 3; */
    vertical_line_left.style.filter = "drop-shadow(6px 0px 6px rgba(0, 0, 0, 0.5))";
    vertical_line_left.style.marginLeft = "20px";

    var vertical_line_right = document.createElement("div");
    vertical_line_right.style.position = "absolute";
    vertical_line_right.style.width = "60px";
    vertical_line_right.style.height = "100%";
    vertical_line_right.style.backgroundColor = secondary_color_shade;
    /* vertical_line_right.style.zIndex = 3; */
    vertical_line_right.style.filter = "drop-shadow(-6px 0px 6px rgba(0, 0, 0, 0.5))";
    vertical_line_right.style.marginRight = "20px";
    vertical_line_right.style.right = "0px";

    /* var wooden_vertical_line_left = document.createElement("div");
    wooden_vertical_line_left.style.position = "absolute";
    wooden_vertical_line_left.style.width = "60px";
    wooden_vertical_line_left.style.height = "100%";
    wooden_vertical_line_left.style.zIndex = 3;
    wooden_vertical_line_left.style.marginLeft = "20px";
    wooden_vertical_line_left.style.backgroundImage = "url('rsc/wood-texture.jpg')";
    wooden_vertical_line_left.style.backgroundRepeat = "repeat";
    wooden_vertical_line_left.style.filter = "drop-shadow(6px 0px 6px rgba(0, 0, 0, 0.5))";
    wooden_vertical_line_left.style.zIndex = "-2" */

    /* var wooden_vertical_line_right = document.createElement("div");
    wooden_vertical_line_right.style.position = "absolute";
    wooden_vertical_line_right.style.width = "60px";
    wooden_vertical_line_right.style.height = "100%";
    wooden_vertical_line_right.style.zIndex = 3;
    wooden_vertical_line_right.style.filter = "drop-shadow(-6px 0px 6px rgba(0, 0, 0, 0.5))";
    wooden_vertical_line_right.style.marginRight = "20px";
    wooden_vertical_line_right.style.backgroundImage = "url('rsc/wood-texture.jpg')";
    wooden_vertical_line_right.style.backgroundRepeat = "repeat";
    wooden_vertical_line_right.style.zIndex = "-2"
    wooden_vertical_line_right.style.right = "0px"; */

    // -----------------------------------------------------|
    // Build the background div component
    
    /* section_background.style.clipPath = "url(#svgPath)"; */
    section_background.style.position = "absolute";
    section_background.style.overflow = "clip";
    section_background.style.width = "100%";
    section_background.style.height = c_height;
    section_background.style.top = "0";
    /* section_background.style.zIndex = "-1" */
    /* section_background.style.top = window.getComputedStyle(wrapper).getPropertyValue('padding-top'); */
    section_background.style.background = "white"; /* "radial-gradient("+secondary_color+", "+secondary_color+")"; */ // 7E0000 521717 #610404 #ce0707

    // -----------------------------------------------------|
    // Append html elements

    svg.appendChild(defs);
    section_background.appendChild(svg);
/*     section_background.appendChild(wooden_vertical_line_left);
    section_background.appendChild(wooden_vertical_line_right); */
    inner_div.appendChild(vertical_line_right);
    inner_div.appendChild(vertical_line_left);
    /* section_background.appendChild(horizontal_line); */
    section_background.appendChild(inner_div);
    /* wrapper.appendChild(section_background); */

    return section_background;
}

document.addEventListener('DOMContentLoaded', function() {

    var red_main_color = "#d9090f";
    var red_main_color_shade = "#8a0408" ;
    var red_secondary_color = "#6e0306";
    var red_secondary_color_shade = "#450606";

    var blue_main_color = "#397eed";
    var blue_main_color_shade = "#153f82" ;
    var blue_secondary_color = "#0d2b5c";
    var blue_secondary_color_shade = "#051736";

    var section_content;
    var section_background

    section_content = document.getElementById("js-red-section");
    section_background = BuildRedSectionBackground(
        section_content.clientWidth, 
        section_content.clientHeight, 
        red_main_color, 
        red_main_color_shade, 
        red_secondary_color, 
        red_secondary_color_shade );
    section_background.id = "js-red-section-background";
    generatedBackgrounds++;
    section_content.appendChild(section_background);

    section_content = document.getElementById("js-blue-section");
    section_background = BuildBlueSectionBackground(        
        section_content.clientWidth, 
        section_content.clientHeight, 
        blue_main_color, 
        blue_main_color_shade, 
        blue_secondary_color, 
        blue_secondary_color_shade );
    section_background.id = "js-blue-section-background";
    generatedBackgrounds++;
    section_content.appendChild(section_background);


   
});

addEventListener("resize", function() {
    var section_content;
    var section_background

    // -----------------------------------------------------|
    // Update red section background
    /* section_content = document.getElementById("js-red-section"); */
    section_background = document.getElementById("js-red-section-background");
    section_content = section_background.parentElement;
    section_background.style.height = section_content.clientHeight;
    var path = section_background.querySelector("path");

    var c_height = section_content.clientHeight;
    var c_width = section_content.clientWidth;
    var coeff = (c_width) / c_height;  // pt * c_width finds a pixel_size; pixel_size / c_height find the relative size on the range [0,1] relative to c_height 

    
    var pt = [ // Points y are specified as a perchentage of the width
        { x: 0,     y: 0.02 * coeff},    
        { x: 0.5,   y: 0.05 * coeff}, 
        { x: 1 ,    y: 0.015 * coeff} 
    ];      
    
    var cpt = [ // Points y are specified as a perchentage of the width
        { x: 0.2,               y: 0.01  * coeff}, 
        { x: pt[1].x - 0.2,     y: 0.08  * coeff},    
        { x: pt[1].x + 0.2,     y: (pt[1].y - (0.08 * coeff - pt[1].y )) }, 
        { x: 0.8,               y: 0.01  * coeff}
    ];
    
    var path_str = UpdatePath(pt, cpt, pt, cpt, 0.02, 0.02 );
    path.setAttributeNS(null, "d", path_str );


    // -----------------------------------------------------|
    // Update blue section background
    section_background = document.getElementById("js-blue-section-background");
    section_content = section_background.parentElement;
    section_background.style.height = section_content.clientHeight;
    path = section_background.querySelector("path");

    c_height = section_content.clientHeight;
    c_width = section_content.clientWidth;

    coeff = (c_width) / c_height;  // pt * c_width finds a pixel_size; pixel_size / c_height find the relative size on the range [0,1] relative to c_height 
 
    
    pt = [ // Points y are specified as a perchentage of the width
        { x: 0,     y: 0.12 * coeff},    
        { x: 0.55,   y: 0.05 * coeff}, 
        { x: 1 ,    y: 0.15 * coeff} 
    ];      

    cpt = [ // Points y are specified as a perchentage of the width
        { x: 0.3,      y: 0.15  * coeff}, 
        { x: pt[1].x - 0.2,     y: 0.08  * coeff},    
        { x: pt[1].x + 0.2,     y: (pt[1].y - (0.08 * coeff - pt[1].y )) }, 
        { x: 0.8,               y: 0.15  * coeff}
    ];

    var b_pt = [ // Points y are specified as a perchentage of the width
    { x: 0,     y: 0.12 * coeff},    
    { x: 0.45,   y: 0.05 * coeff}, 
    { x: 1 ,    y: 0.06 * coeff} 
    ];      
    
    var b_cpt = [ // Points y are specified as a perchentage of the width
        { x: 0.3,      y: 0.15  * coeff}, 
        { x: b_pt[1].x - 0.2,     y: 0.08  * coeff},    
        { x: b_pt[1].x + 0.2,     y: (b_pt[1].y - (0.08 * coeff - b_pt[1].y )) }, 
        { x: 0.8,               y: 0.08  * coeff}
    ];
    
    path_str = UpdatePath(pt, cpt, b_pt, b_cpt, 0.03, 0.04 );
    path.setAttributeNS(null, "d", path_str );


    // -----------------------------------------------------|
    // Update wooden vertical lines height
    const body = document.body;
    const html = document.documentElement;
    const height = html.clientHeight; /* Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight); */

    var vertical_line = document.getElementById("vertical-line");
    vertical_line.style.height = height;

    var vertical_line_r = document.getElementById("vertical-line-r");
    vertical_line_r.style.height = height;


});

// =======================================================================================|
// =======================================================================================|
// MOBILE MENU

function ShowMenu(){
    let menu = document.getElementsByClassName("nav-bar__menu")[0];
    /* let style = window.getComputedStyle(menu);
    console.log("AA" + style.getPropertyValue("display")); */
    if(menu.classList.contains("active")){
        menu.classList.remove("active");
        /* menu.style.setProperty("height", "300px");
        menu.style.setProperty("opacity", "1"); */
    }else{
        menu.classList.add("active");
        /* menu.style.setProperty("height", "0px");
        menu.style.setProperty("opacity", "0"); */
    }

}