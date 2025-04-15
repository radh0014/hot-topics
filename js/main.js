// GET THE REFERENCES
const container = document.getElementById('content-container');
const links = document.querySelectorAll('.nav-link');
let url = './partials/home.html'; // Default content

// CREATE THE FUNCTION THAT WILL LOAD THE REQUESTED PARTIAL
const loadContent = (urlFeed) => {
    /*
    IMPORTANT NOTES:
    loadContent RUNS EVERY TIME A LINK IS CLICKED.
    loadContent REQUIRES THE INPUT. THIS INPUT IS
    THE VALUE OF href ATTRIBUTE OF THE CLICKED LINK.
    EVERY TIME A LINK IS CLICKED, urlFeed WILL GET 
    THE UPDATED PATH TO THE REQUESTED CONTENT.
    */
    
    // RUN THE fetch(urlFeed).then().then().catch()
    fetch(urlFeed)
        .then(response => {
            // Check if the response is ok (status in the range 200-299)
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            // Insert the fetched HTML into the container
            container.innerHTML = data;
            
            // Update active class on navigation links
            const pageName = urlFeed.split('/').pop().split('.')[0];
            links.forEach(link => {
                if (link.getAttribute('data-page') === pageName) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
            
            // Update masthead background based on the page
            const masthead = document.querySelector('.masthead');
            if (pageName === 'home') {
                masthead.style.backgroundImage = "url('./img/masthead-home.jpg')";
            } else if (pageName === 'portfolio') {
                masthead.style.backgroundImage = "url('./img/masthead-portfolio.jpg')";
            }
        })
        .catch(error => {
            console.error('Error loading content:', error);
            container.innerHTML = `<p>Error loading content. Please try again later.</p>`;
        });
};

// CREATE THE FUNCTION THAT WILL SELECT A PARTIAL:
const selectContent = (event) => {
    // PREVENT DEFAULT BEHAVIOUR OF A LINK TAG
    event.preventDefault();
    
    // GET THE VALUE OF href ATTRIBUTE OF THE CLICKED LINK
    const href = event.target.getAttribute('href');
    
    // CALL THE FUNCTION loadContent PROVIDING THE href
    // VALUE OF THE CLICKED LINK AS THE VALUE FOR THE PARAMETER
    // OF loadContent FUNCTION.
    loadContent(href);
};

// REGISTER links FOR CLICK EVENT WITH selectContent AS EVENT HANDLER!
links.forEach(link => {
    link.addEventListener('click', selectContent);
});

// Load the default content when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadContent(url);
});