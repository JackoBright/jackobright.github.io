
function loadwindow(){

    // document.getElementById("navbarplaceholder").innerHTML='<object type="text/html" data="navbar.html" ></object>';
}
window.onload = loadwindow

function aboutMeButton(){
    window.alert("About me Button Pressed")
}

function projectsButton(){
    window.alert("Projects Button Pressed")
    window.location.replace("./projects.html")
}

function repositoriesButton(){
    window.alert("Repositories Button Pressed")
}