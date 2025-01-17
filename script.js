// =======================================================================================|
// MAIN BANNER

bannerIndex = 0;
InitBanners();

function InitBanners(){
    
    let banners = document.getElementsByClassName("hero-section__image")

    for (i = 0; i < banners.length; i++){
        banners[i].classList.add("hs-img-hidden-animation");
    }

    banners[bannerIndex].classList.remove("hs-img-hidden-animation");
    banners[bannerIndex].classList.add("hs-img-visible-animation");

}

function NextSlide(){

    let banners = document.getElementsByClassName("hero-section__image")

    var previous_index = bannerIndex;
    bannerIndex++;
    if (bannerIndex >= banners.length) { bannerIndex = 0; }

    banners[previous_index].classList.remove("hs-img-visible-animation");
    banners[previous_index].classList.add("hs-img-hidden-animation");

    banners[bannerIndex].classList.remove("hs-img-hidden-animation");
    banners[bannerIndex].classList.add("hs-img-visible-animation");

}

setInterval(()=>{ NextSlide(); }, 8000);

// =======================================================================================|
// MOBILE MENU

function ShowMenu(){
    let menu = document.getElementsByClassName("nav-bar__menu")[0];
    if(menu.classList.contains("active")){
        menu.classList.remove("active");
    }else{
        menu.classList.add("active");
    }
}

// =======================================================================================|
// EVENT LISTENER

document.addEventListener('DOMContentLoaded', function() {

    // Crea il background alla sezione di paola

    var paola_section_div = document.getElementById("js-paola-section");
    var paola_section_background_div = BuildRedSectionBackground( paola_section_div.clientWidth, paola_section_div.clientHeight);
    paola_section_background_div.id = "js-red-section-background";
    paola_section_background_div.style.height = "100%";
    paola_section_div.appendChild(paola_section_background_div);

    // Crea il background alla sezione dei servizi

    var services_section_div = document.getElementById("js-services-section");
    services_section_background_div = BuildBlueSectionBackground( services_section_div.clientWidth, services_section_div.clientHeight );
    services_section_background_div.id = "js-blue-background";
    services_section_background_div.style.height = "100%";
    services_section_div.appendChild(services_section_background_div);
   
});

document.addEventListener("resize", function() {
     
    // Aggiorna il background alla sezione di paola

    var paolaSection_backgroundDiv = document.getElementById("js-red-section-background");
    var paolaSection_backgroundWrapperDiv = paolaSection_backgroundDiv.parentElement;
    var paolaSection_path = paolaSection_backgroundDiv.querySelector("path");
    paolaSection_backgroundDiv.style.height = paolaSection_backgroundWrapperDiv.clientHeight;
    ComputeRedSectionCurvePoints( 
        paolaSection_backgroundWrapperDiv.clientWidth, 
        paolaSection_backgroundWrapperDiv.clientHeight 
    );
    var paolaSection_pathStr = BuildWaveStripePathStr(
        redSection_topCurve_Points, 
        redSection_topCurve_controlPoints,  
        redSection_topCurve_Points, 
        redSection_topCurve_controlPoints,
        redSection_topCurve_margin,
        redSection_bottomCurve_margin 
    );
    paolaSection_path.setAttributeNS(null, "d", paolaSection_pathStr );

    // Aggiorna il background alla sezione dei servizi

    var servicesSection_backgroundDiv = document.getElementById("js-blue-background");
    var servicesSection_backgroundWrapperDiv = servicesSection_backgroundDiv.parentElement;
    var servicesSection_path = servicesSection_backgroundDiv.querySelector("path");
    servicesSection_backgroundDiv.style.height = servicesSection_backgroundWrapperDiv.clientHeight;
    ComputeBlueSectionCurvePoints(
        servicesSection_backgroundWrapperDiv.clientWidth,
        servicesSection_backgroundWrapperDiv.clientHeight
    );
    var servicesSection_pathStr = BuildWaveStripePathStr(        
        blueSection_topCurve_Points, 
        blueSection_topCurve_controlPoints, 
        blueSection_bottomCurve_Points , 
        blueSection_bottomCurve_controlPoints, 
        blueSection_topCurve_margin, 
        blueSection_bottomCurve_margin,
    );
    servicesSection_path.setAttributeNS(null, "d", servicesSection_pathStr );

});

// =======================================================================================|
// RED SECTION BACKGROUND FUNCTIONS

// Definizione dei parametri del background nella sezione paola
var redSection_topCurve_Points = [ ];      
var redSection_topCurve_controlPoints = [ ];
var redSection_topCurve_margin = 0.02;
var redSection_bottomCurve_margin = 0.02;

function ComputeRedSectionCurvePoints(pixel_width, pixel_height){
    // Vogliamo che l'altezza delle "onde" del path siano proporzionali alla larghezza
    // del div: più è stretto il div, meno accentuate vogliamo le onde.
    // Si va dunque a esprimere le y dei punti come percentuale del width; per fare ciò
    // ci basta moltiplicare le y per il seguente coefficente che implementa le seguenti
    // trasformazioni:
    //  > y * pixel_width = pixels length as perchentage of width
    //  > (y * pixel_width) / pixel_height = perchentage of height relative to a pixel length
    const coeff = (pixel_width) / pixel_height;  

    redSection_topCurve_Points[0] = { x: 0,     y: 0.02 * coeff};
    redSection_topCurve_Points[1] = { x: 0.5,   y: 0.05 * coeff};
    redSection_topCurve_Points[2] = { x: 1 ,    y: 0.015 * coeff};
    
    redSection_topCurve_controlPoints[0] = { x: 0.2,                                       y: 0.01  * coeff};
    redSection_topCurve_controlPoints[1] = { x: redSection_topCurve_Points[1].x - 0.2,     y: 0.08  * coeff};
    redSection_topCurve_controlPoints[2] = { x: redSection_topCurve_Points[1].x + 0.2,     y: (redSection_topCurve_Points[1].y - (0.08 * coeff - redSection_topCurve_Points[1].y )) };
    redSection_topCurve_controlPoints[3] = { x: 0.8,                                       y: 0.01  * coeff};

}

function BuildRedSectionBackground(div_width, div_height){
    
    var main_color = "rgba(255,42,15,1)";
    var main_color_shade = "rgba(143,4,8,1)" ;
    var secondary_color = "rgba(84,1,5,1)";
    var secondary_color_shade = "#450606";

    ComputeRedSectionCurvePoints(div_width, div_height);

    // Costruzione dell'svg
    var clipPath_tag_id = "red-section-background-clip-path";
    var svg_tag = BuilBackgroundWaveSvg( 
        redSection_topCurve_Points, 
        redSection_topCurve_controlPoints, 
        redSection_topCurve_Points , 
        redSection_topCurve_controlPoints, 
        redSection_topCurve_margin, 
        redSection_bottomCurve_margin, 
        clipPath_tag_id 
    );

    // Costruzione del div di background a cui applicare l'svg
    var background_div = BuildBackgroundDiv(
        "radial-gradient(circle, "+ main_color +" 0%, "+ main_color_shade +" 66%, "+ secondary_color +" 100%)",
        secondary_color_shade
    );

    // Il tag svg è inserito nel codice html ma di per se non viene renderizzato (serve solo a DFINIRE un oggetto grafico).
    // Lo si utilizza quindi come clipPath del div di background
    background_div.style.clipPath = "url(#" + clipPath_tag_id + ")";

    // Il div che fa da wrapper ai tag del "svg_tag" e "background_div" 
    var background_wrapper_div = document.createElement("div");
    background_wrapper_div.style.position = "absolute";
    background_wrapper_div.style.overflow = "clip";
    background_wrapper_div.style.width = "100%";
    background_wrapper_div.style.height = div_height;
    background_wrapper_div.style.top = "0px";
    background_wrapper_div.style.background = "white"; 
    background_wrapper_div.appendChild(svg_tag); 
    background_wrapper_div.appendChild(background_div);

    return background_wrapper_div;
}

// =======================================================================================|
// BLUE SECTION BACKGROUND FUNCTIONS

// Definizione dei parametri del background
var blueSection_topCurve_Points = [ ];
var blueSection_topCurve_controlPoints = [ ];
var blueSection_bottomCurve_Points = [ ];    
var blueSection_bottomCurve_controlPoints = [ ];
var blueSection_topCurve_margin = 0.03;
var blueSection_bottomCurve_margin = 0.04;

function ComputeBlueSectionCurvePoints(pixel_width, pixel_height){
    // Vogliamo che l'altezza delle "onde" del path siano proporzionali alla larghezza
    // del div: più è stretto il div, meno accentuate vogliamo le onde.
    // Si va dunque a esprimere le y dei punti come percentuale del width; per fare ciò
    // ci basta moltiplicare le y per il seguente coefficente che implementa le seguenti
    // trasformazioni:
    //  > y * pixel_width = pixels length as perchentage of width
    //  > (y * pixel_width) / pixel_height = perchentage of height relative to a pixel length
    const coeff = (pixel_width) / pixel_height;  

    blueSection_topCurve_Points[0] = { x: 0,        y: 0.12 * coeff};
    blueSection_topCurve_Points[1] = { x: 0.55,     y: 0.05 * coeff};
    blueSection_topCurve_Points[2] = { x: 1 ,       y: 0.15 * coeff};
    blueSection_topCurve_controlPoints[0] = { x: 0.3,                                        y: 0.15  * coeff};
    blueSection_topCurve_controlPoints[1] = { x: blueSection_topCurve_Points[1].x - 0.2,     y: 0.08  * coeff};
    blueSection_topCurve_controlPoints[2] = { x: blueSection_topCurve_Points[1].x + 0.2,     y: (blueSection_topCurve_Points[1].y - (0.08 * coeff - blueSection_topCurve_Points[1].y )) };
    blueSection_topCurve_controlPoints[3] = { x: 0.8,                                        y: 0.15  * coeff};
    blueSection_bottomCurve_Points[0] = { x: 0,     y: 0.12 * coeff};
    blueSection_bottomCurve_Points[1] = { x: 0.45,   y: 0.05 * coeff};
    blueSection_bottomCurve_Points[2] = { x: 1 ,    y: 0.06 * coeff};
    blueSection_bottomCurve_controlPoints[0] = { x: 0.3,                                           y: 0.15  * coeff};
    blueSection_bottomCurve_controlPoints[1] = { x: blueSection_bottomCurve_Points[1].x - 0.2,     y: 0.08  * coeff}
    blueSection_bottomCurve_controlPoints[2] = { x: blueSection_bottomCurve_Points[1].x + 0.2,     y: (blueSection_bottomCurve_Points[1].y - (0.08 * coeff - blueSection_bottomCurve_Points[1].y )) };
    blueSection_bottomCurve_controlPoints[3] = { x: 0.8,                                           y: 0.08  * coeff}

}

function BuildBlueSectionBackground( div_width, div_height ){

    var main_color = "rgb(15,150,250)";
    var main_color_shade = "rgb(8, 4, 138)";
    var secondary_color = "#0d2b5c";
    var secondary_color_shade = "#051736";

    ComputeBlueSectionCurvePoints(div_width, div_height);

    // Costruzione dell'svg
    var clipPath_tag_id = "blue-section-background-clip-path";
    var svg_tag = BuilBackgroundWaveSvg( 
        blueSection_topCurve_Points, 
        blueSection_topCurve_controlPoints, 
        blueSection_bottomCurve_Points , 
        blueSection_bottomCurve_controlPoints, 
        blueSection_topCurve_margin, 
        blueSection_bottomCurve_margin, 
        clipPath_tag_id 
    );

    // Costruzione del div di background a cui applciare l'svg
    var background_div = BuildBackgroundDiv("radial-gradient( "+ main_color +", "+ main_color_shade+"  )", secondary_color_shade );

    // Il tag svg è inserito nel codice html ma di per se non viene renderizzato (serve solo a DFINIRE un oggetto grafico).
    // Lo si utilizza quindi come clipPath del div di background
    background_div.style.clipPath = "url(#" + clipPath_tag_id + ")";

    // Il div che fa da wrapper ai tag del "svg_tag" e "background_div" 
    var background_wrapper_div = document.createElement("div");
    background_wrapper_div.style.position = "absolute";
    background_wrapper_div.style.overflow = "clip";
    background_wrapper_div.style.width = "100%";
    background_wrapper_div.style.height = div_height;
    background_wrapper_div.style.top = "0px";
    background_wrapper_div.style.background = "white"; 
    background_wrapper_div.appendChild(svg_tag); 
    background_wrapper_div.appendChild(background_div);

    return background_wrapper_div;
}

// =======================================================================================|
// COMMON SECTION BACKGROUND FUNCTIONS

const svgns = 'http://www.w3.org/2000/svg';

// Costruisce un ClipPath che specifica una stripe ondulata in cui:
//  - la curva superiore è specificata da 3 punti "top_curve_pt" e da 4 control points "top_curve_cpt",
//    specificati da sinistra verso destra.
//  - la curva inferiore è specificata da 3 punti "bottom_curve_pt" e da 4 control points "bottom_curve_cpt",
//    sempre specificati da sinistra verso destra (questa viene poi ribaltata dalla funzione )
//  - "top_margin" e "bottom_margin" specificano un offset con cui traslare rispettivamente
//    la curva superiore verso il basso e la curva inferiore verso l'alto.
// Nota: tutti i precedenti valori devono essere nel range [0, 1]. ( il path costruito specifica le
// posizioni come percentuali delle dimensioni di un canvas )
function BuildWaveStripeClipPath( top_curve_pt, top_curve_cpt, bottom_curve_pt, bottom_curve_cpt, top_margin, bottom_margin){

    var clipPath = document.createElementNS(svgns, 'clipPath');
    clipPath.setAttributeNS(null, "clipPathUnits", "objectBoundingBox");

    // Costruisce la string che specifica l'effettivo path della stripe
    var path_str = BuildWaveStripePathStr(top_curve_pt, top_curve_cpt, bottom_curve_pt, bottom_curve_cpt, top_margin, bottom_margin);
    
    var path = document.createElementNS(svgns, 'path');
    path.setAttributeNS(null, "d", path_str );
    path.setAttributeNS(null, "style", "stroke: none; fill: red;");

    clipPath.appendChild(path);
    return clipPath;
}

function BuildWaveStripePathStr(top_curve_pt, top_curve_cpt, bottom_curve_pt, bottom_curve_cpt, top_margin, bottom_margin){

    // Crea dei cloni dei punti forniti come input, altrimenti pt, cpt,
    // b_pt e b_cpt fungono da riferimenti e modificano i vettori originali
    var pt = structuredClone(top_curve_pt);
    var cpt = structuredClone(top_curve_cpt);
    var b_pt = structuredClone(bottom_curve_pt);
    var b_cpt = structuredClone(bottom_curve_cpt);

    var b_points = MirrorCurvePointsVertically( 1 , b_pt, b_cpt);    
    b_pt = b_points.pt;
    b_cpt = b_points.cpt;

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

// Dati 3 points "pt" e 4 control points "cpt" di una curva, specificati da sinistra verso
// destra e rispetto al bordo superiore del canvas, restituisce 3 points e 4 control points 
// di un curva che risulta identica a quello originale ma specificata da destra verso 
// sinistra e rispetto al bordo inferiore del canvas.
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

// Crea un svg al cui interno è presente un clipPath definito dai punti "top_curve_points" e "bottom_curve_points" (bottom)
function BuilBackgroundWaveSvg(
    top_curve_points, 
    top_curve_control_points, 
    bottom_curve_points, 
    bottom_curve_control_points, 
    top_curve_margin,
    bottom_curve_margin, 
    clipPath_tag_id
){

    // Il tag "svg" specifica il canvas su cui definire il path
    var svg_tag = document.createElementNS(svgns, 'svg')
    svg_tag.style.width = "0px";
    svg_tag.style.height = "0px";
    svg_tag.viewBox = "0px 0px 500px 500px";
    svg_tag.preserveAspectRatio = "none";

    // Il tag "defs" fa semplicemente da storage per oggetti grafici
    var defs_tag = document.createElementNS(svgns, 'defs');

    var clipPath_tag = BuildWaveStripeClipPath(
        top_curve_points, 
        top_curve_control_points, 
        bottom_curve_points , 
        bottom_curve_control_points, 
        top_curve_margin, 
        bottom_curve_margin 
    );
    clipPath_tag.id = clipPath_tag_id;

    defs_tag.appendChild(clipPath_tag);
    svg_tag.appendChild(defs_tag);
    
    return svg_tag;

}

function BuildBackgroundDiv(background_color, vertical_lines_color){
    
    var background_div = document.createElement("div");
    background_div.style.position = "absolute";
    background_div.style.width = "100%";
    background_div.style.height = "100%";
    background_div.style.zIndex = 2;
    background_div.style.background = background_color;  

    var vertical_line_left = document.createElement("div");
    vertical_line_left.style.position = "absolute";
    vertical_line_left.style.width = "60px";
    vertical_line_left.style.height = "100%";
    vertical_line_left.style.backgroundColor = vertical_lines_color;
    vertical_line_left.style.filter = "drop-shadow(6px 0px 6px rgba(0, 0, 0, 0.5))";
    vertical_line_left.style.marginLeft = "20px";

    var vertical_line_right = document.createElement("div");
    vertical_line_right.style.position = "absolute";
    vertical_line_right.style.width = "60px";
    vertical_line_right.style.height = "100%";
    vertical_line_right.style.backgroundColor = vertical_lines_color;
    vertical_line_right.style.filter = "drop-shadow(-6px 0px 6px rgba(0, 0, 0, 0.5))";
    vertical_line_right.style.marginRight = "20px";
    vertical_line_right.style.right = "0px";

    background_div.appendChild(vertical_line_right);
    background_div.appendChild(vertical_line_left);

    return background_div;

}
