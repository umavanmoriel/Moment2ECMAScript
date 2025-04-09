// Hämtar html-element från DOM
const menuEl = document.getElementById("menu");
const dropdownEl = document.getElementById("dropdown-menu");
const courseCodeEl = document.getElementById("courseCode");
const courseNameEl = document.getElementById("courseName");
const courseProgEl = document.getElementById("courseProg");
const searchInputEl = document.getElementById("search-input");


// Initialisering när sidan laddas om
window.onload = init;

// Funktion för att initialisera applikationen och hämta information
function init() {
    processData();
}

//Eventlistener
menuEl.addEventListener('click', () => {
    dropdownEl.classList.toggle('show');
})

courseCodeEl.addEventListener("click", (event) => {
    courseCodeSort(courses);
});

courseNameEl.addEventListener("click", (event) => {
    courseNameSort(courses);
});

courseProgEl.addEventListener("click", (event) => {
    courseProgSort(courses);
});

//Filtrera efter sökfras
searchInputEl.addEventListener('input', function() {
    const filterData = this.value.toLowerCase();

    const filteredData = window.courses.filter(item => 
        item.code.toLowerCase().includes(filterData) || 
        item.coursename.toLowerCase().includes(filterData)
    );
    coursesInfoDisplay(filteredData);
});


//Hämta kurser
async function getCoursesInfo() {
    try {
        const response = await fetch('https://webbutveckling.miun.se/files/ramschema_ht24.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

// Användning av den asynkrona funktionen
async function processData() {
    try {
        const result = await getCoursesInfo();
        console.log('Received data:', result);
        coursesInfoDisplay(result);
        window.courses = result;
    } catch (error) {
        console.error('Error processing data:', error);
    }
}

// Visa information för kurser
function coursesInfoDisplay(courses) {
    const coursesListEl = document.getElementById('courses-list'); 
    // Rensa tidigare innehåll
    coursesListEl.innerHTML = ''; 

    // Loopa genom och skapa nya list element
    courses.forEach(course => {
        const newRowEl = document.createElement('tr');

        const courseCodeEl = document.createElement('td');
        const courseCodeTextEl = document.createTextNode(course.code);
        courseCodeEl.appendChild(courseCodeTextEl);
        newRowEl.appendChild(courseCodeEl); 

        const courseNameEl = document.createElement('td');
        const courseNameTextEl = document.createTextNode(course.coursename);
        courseNameEl.appendChild(courseNameTextEl);
        newRowEl.appendChild(courseNameEl); 

        const courseProgEl = document.createElement('td');
        const courseProgTextEl = document.createTextNode(course.progression);
        courseProgEl.appendChild(courseProgTextEl);
        newRowEl.appendChild(courseProgEl);

        coursesListEl.appendChild(newRowEl);
    });
}

// Sortera efter kod
function courseCodeSort(courses) {
    const sortedCourses = courses.sort((a, b) => a.code.localeCompare(b.code)); 
    coursesInfoDisplay(sortedCourses); 
}

 // Sortera efter kursnamn
function courseNameSort(courses) {
    const sortedNames = courses.sort((a, b) => a.coursename.localeCompare(b.coursename));
    coursesInfoDisplay(sortedNames);
}

// Sortera efter progression
function courseProgSort(courses) {
    const sortedProg = courses.sort((a, b) => a.progression.localeCompare(b.progression)); 
    coursesInfoDisplay(sortedProg);
}