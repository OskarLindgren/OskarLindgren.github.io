    let isTitleDone = false;

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

function getRandomInt(x, y) {
    // Generate a random number between x and y, inclusive
    return Math.floor(Math.random() * (y - x + 1)) + x;
}

//-setCodes();
// fetch code for the projects tab
async function setCodes() {
    var languages = ['Python', 'C', 'JavaScript'];
    var projects = ['FizzBuzz', 'TwentyOne', 'ReferenceChart'];

    // get it from my github page
    for (var projects_index = 0; projects_index < projects.length; projects_index++) {
        for (var languages_index = 0; languages_index < languages.length; languages_index++) {
            await fetch("https://raw.githubusercontent.com/OskarLindgren/OskarLindgren.github.io/main/Projects/"
            + projects[projects_index] + "/" + languages[languages_index] + ".txt")
            .then(response => response.text())
            .then(data => {
                document.getElementById(projects[projects_index] + languages[languages_index]).innerHTML = data;
            })
        }
    }
}

// get the code for the specified project & language
async function getCode(project, language) {

    // get the code from the apropriate github file
    await fetch("https://raw.githubusercontent.com/OskarLindgren/OskarLindgren.github.io/main/Projects/"
    + project + "/" + language + ".txt")

    .then(response => response.text())
    .then(response => {
        document.getElementById(`code_${project}`).className = `language-${language}`;
        document.getElementById(`code_${project}`).innerHTML = response;
    })
}


// make the gif poof after it is done palying
const gifImage = document.getElementById("profilePicture1");
setTimeout(function () {
    gifImage.remove();
}, 2400);


// typing effect
const title = document.getElementById("Title");
const text = "[u] Oskar Lindgren [/u]   ↵";
let i = 0;

function showName() {
    if (i < text.length) {
        setTimeout(function () {
            title.innerHTML = text.slice(0, i + 1);
            i++;
            showName(); // call showName() recursively for the next character
        }, getRandomInt(60, 150));
    }
    else {
        setTimeout(function () {
            title.innerHTML = "Oskar Lindgren";
            title.style.textDecoration = "underline";
            title.style.color = "var(--color10)"
            document.getElementById("arrow0").style.opacity = "1"; 
            isTitleDone = true;
        }, 400);
    }
}
showName(); // start the typing effect

// function for arrow button
function scrollNext() {
    let scrollY = window.scrollY;
    let viewportHeight = window.innerHeight;
    let nextPos = Math.floor(scrollY / viewportHeight) * viewportHeight + viewportHeight;
    scroll(0, nextPos);
}

// load stuff depending on how far the user has scrolled
// keep track of what places have been passed, to not trigger the same stuff multiple times
scrollStages = [false, false]
//              75     175
// Attach event listener to window scroll event
window.addEventListener("scroll", function () {
    // Retrieve scroll position
    let scrollY = window.scrollY;
    let viewportHeight = window.innerHeight;
    let scrollPercentage = Math.round((scrollY / viewportHeight) * 100);
    console.log(scrollY);

    // wether or not the scroll arrows should be visible
    if (isTitleDone) {
        if (scrollPercentage >= 50) {
            document.getElementById("arrow0").style.opacity = "0";
        }
        else {
            document.getElementById("arrow0").style.opacity = "1";
        }

        if (scrollPercentage >= 150) {
            document.getElementById("arrow1").style.opacity = "0";
        }
        else {
            document.getElementById("arrow1").style.opacity = "1";
        }
    }

    // skills
    // left, top
    let skillPositions = 
                    [[50, 50], // Python
                     [56, 66], // IFTTT
                     [26, 43], // C
                     [64, 40], // Css
                     [40, 76], // JavaScript
                     [33, 65], // Linux
                     [43, 37], // NodeJS
                     [21, 54], // MySQL
                     [64, 31], // Unity
                     [68, 76], // HTML
                     [18, 68]] // Java

    if (scrollPercentage >= 65 && !scrollStages[0]) {
        scrollStages[0] = true;
        let skillsListChildren = document.getElementById("skillsList").querySelectorAll('a');
        for (let i = 0; i < skillsListChildren.length; i++){
            skillsListChildren[i].style.opacity = "1";
            skillsListChildren[i].style.left = skillPositions[i][0]+"%";
            skillsListChildren[i].style.top = skillPositions[i][1]+"%";
        }

        document.getElementById("educationContainer").style.left = "50%";
        let educationListChildren = document.getElementById("educationContainer").querySelectorAll('span');
        for (let i = 0; i < educationListChildren.length; i++){
            educationListChildren[i].style.opacity = "1";
        }

        document.getElementById("workContainer").style.left = "50%";
        let workListChildren = document.getElementById("workContainer").querySelectorAll('span');
        for (let i = 0; i < workListChildren.length; i++){
            workListChildren[i].style.opacity = "1";
        }
    }

    if (scrollPercentage >= 165 && !scrollStages[1]) {
        scrollStages[1] = true;
        document.getElementById("projectsContainer").style.left = "2.5vw"
        let projectsContainerChildren = document.getElementById("projectsContainer").querySelectorAll('div');
        for (let i = 0; i < projectsContainerChildren.length; i++){
            projectsContainerChildren[i].style.opacity = "1";
        }

        let projectDescriptions = document.getElementsByClassName("projectDescriptionContent");
        for (let i = 0; i < projectDescriptions.length; i++){
            projectDescriptions[i].style.opacity = "1";
        }
    }

});
  
  
  
  