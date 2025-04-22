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
  const templatePath = path.resolve(__dirname, 'projects.html');
  let htmlContent = await fs.readFile(templatePath, 'utf-8');

  // Generate HTML for the projects
  const projectsHTML = projects.map(p => `<div class="project"><h2>${p.title}</h2><img class="project-image" src=${p.imagePath}></img><p>${p.shortDesc}</p></div>`).join('');

  // Replace the placeholder with actual project HTML
  htmlContent = htmlContent.replace('<!-- {{projects}} -->', projectsHTML);

  // Write the final HTML to a new file
  const outputPath = path.resolve(__dirname, 'projects.html');
  await fs.writeFile(outputPath, htmlContent, 'utf-8');

  console.log('projects.html has been generated!');
}

populateProjects().catch(console.error);