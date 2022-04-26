const inquirer = require("inquirer")

const promptUser = () => {

return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your github username. (Required)',
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('Please enter your github user name!');
              return false;
            }
          }
    }, 
    {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section?',
        default: true
      },
    {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        when: ({ confirmAbout }) => {
            if (confirmAbout) {
              return true;
            } 
            else {
              return false;
            }
          }
    }
        
     
  ]); 
};

// If there is no project in the array then create one

const promptProject =  portfolioData => {
    console.log(`
  =================
  Add a New Project
  =================
  `);
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
 
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project?'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('Please provide a description!');
              return false;
            }
          }
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('Please provide a link to your project in GitHub!');
              return false;
            }
          }
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ])
  
  .then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {  // Condition is evaluating the user response to wheather they want to add more projects. If yes than condition = true
      return promptProject(portfolioData);
    } else {
      return portfolioData; // returnung the portfolioData so the object is returned to retrive the user answers 
    }
  });
};
promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
    // will be uncommented in lesson 4
    // const pageHTML = generatePage(portfolioData);
    // fs.writeFile('./index.html', pageHTML, err => {
    //   if (err) throw new Error(err);
    //   console.log('Page created! Check out index.html in this directory to see it!');
    // });
  });




