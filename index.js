//Function that loads JSON from a file
async function loadJSON(name){
    console.log("Loading JSON File: " + name)
    const response = await fetch(name)
    const json = await response.json()
    return json
    
}

//populates the project list using projects.json
async function populateProjects(){
    json = await loadJSON("projects.json")
    projectsBox = document.getElementById("projectsBox")
    
    //calculate the number of rows
    var rows = json.length%2==1 ? json.length/2 + 1 : json.length/2

    //for each row
    for(let i = 0; i < rows; i++){

        //create the row
        var projectrow = document.createElement('div')
        projectrow.className = "row"

        //append it as a child to the projectBox
        projectsBox.appendChild(projectrow)

        //make its project children
        for(let j = 0; j<2; j++){
            const index = i * 2 + j;
            //Exit this loop once we have passed the end of the json
            if (index >= json.length) break;
            var data = json[index];

            var project = document.createElement('div')
            project.className = "project"
            project.onclick = () =>loadprojectpage(index)
            
            var title = document.createElement('h3')
            title.innerText = data["title"]
            

            var image = document.createElement('img')
            image.src = data["imagePath"]
            image.className = "project-image"

            var shortDesc = document.createElement('p')
            shortDesc.innerText = data["shortDesc"]

            //create the document structure
            project.appendChild(title)
            project.appendChild(image)
            project.appendChild(shortDesc)
            projectrow.appendChild(project)
        }
    }



  
}

function loadprojectpage(index){
    const url = "../projectpages/project"+index+".html"
    fetch(url).then(response=>{
        if(response.ok){
            window.location =url
            
        }
        else{
            window.alert(`${url} not found`)

        }
        
    }
    ).catch(error=>{
        window.alert(error)
    })
    
}


function loadwindow(){
    //This code from https://stackoverflow.com/questions/16611497/how-can-i-get-the-name-of-an-html-page-in-javascript
    var path = window.location.pathname;
    var page = path.split("/").pop();
    console.log( "Directed to " + page );
    if(page === "projects.html"){
        //populateProjects()
    }
}
window.onload = loadwindow

