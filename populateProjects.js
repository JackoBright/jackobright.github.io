const fs = require('fs').promises;
const path = require('path');

// Load the JSON data
async function loadJSON(filepath) {
  const fullPath = path.resolve(__dirname, filepath);
  const data = await fs.readFile(fullPath, 'utf-8');
  return JSON.parse(data);
}

// Populate the HTML with projects data
async function populateProjects() {
  // Load project data from JSON
  const projects = await loadJSON('./projects.json');

  // Read the template HTML file
  const templatePath = path.resolve(__dirname, 'projectsTemplate.html');
  let htmlContent = await fs.readFile(templatePath, 'utf-8');

  //This bit generated using AI
  // Generate HTML for the projects: two per row
  let projectsHTML = '';
  for (let i = 0; i < projects.length; i += 2) {
    const rowProjects = projects.slice(i, i + 2);
    const rowHTML = rowProjects.map((p,indexinrow) => `
      <div class="project" onClick="loadprojectpage(${i+indexinrow+1})">
        <h2>${p.title}</h2>
        <img class="project-image" src="../${p.imagePath}" alt="${p.title}"/>
        <p>${p.shortDesc}</p>
      </div>
    `).join('');
    projectsHTML += `<div class="row">${rowHTML}</div>\n`;
  }

  // Replace the placeholder in your template
  htmlContent = htmlContent.replace('<!-- {{projects}} -->', projectsHTML);

  // Write the output
  const outputPath = path.resolve(__dirname,'generatedpages', 'projects.html');
  await fs.writeFile(outputPath, htmlContent, 'utf-8');
  
  // const singleprojectTemplatePath = path.resolve(__dirname, 'singleprojectTemplate.html')
  // const singleprojecttemplate = await fs.readFile(singleprojectTemplatePath, 'utf-8')
  
  // for(let i = 0; i<projects.length; i++){
  //   var step1 = singleprojecttemplate.replace('<!--title-->', projects[i].title)
  //   var step2 = step1.replace('<!--shortDesc-->', projects[i].shortDesc)
  //   var step3 = step1.replace('<!--image')

  //   var filename = "project#" + i + ".html"
  //   const outputPath = path.resolve(__dirname,'generatedpages', filename);
  //   fs.writeFile(outputPath, step2, 'utf-8')


  // }


  console.log('projects.html has been generated!');
}

populateProjects().catch(console.error);