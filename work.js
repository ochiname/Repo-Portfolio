// document.addEventListener('DOMContentLoaded', () => {
//     fetchGitHubRepos();
// });

const apiUrl = "https://api.github.com/users/Ochiname/repos";
const apiKey = process.env.API_KEY; // Directly access API_KEY from the environment

console.log("API Key:", apiKey); // Debugging to ensure it's loaded

const img = [
    "https://img.freepik.com/free-vector/flat-design-portfolio-template-design_52683-80880.jpg?ga=GA1.1.428427330.1724148117&semt=ais_hybrid",   
    "https://img.freepik.com/free-vector/weather-icon-collection_1294-69.jpg?t=st=1733270521~exp=1733274121~hmac=b56c819c31843866ff4d961378f4a98b2d270fbb647dd31ae31435e8ad952acc&w=740",
    "https://img.freepik.com/free-vector/self-checkout-concept-illustration_114360-2228.jpg?t=st=1733270424~exp=1733274024~hmac=0eee00d4fbd31b936cbca8ab72767df971ff822588e20d6574b01e560d76668c&w=740",
    "https://img.freepik.com/free-photo/3d-illustration-hand-putting-tick-paper_107791-15903.jpg?t=st=1733270582~exp=1733274182~hmac=65f934a15708a89206b0203f3cc03db9185e7c9d4d8bd9383b05dafcfc506d10&w=740"
];

const fetchGitHubRepos = async () => {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `token ${apiKey}` // Use the API key securely
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const repos = await response.json();
        rendering(repos);
    } catch (error) {
        console.error("Failed to fetch repositories:", error);
    }
};

function rendering(repos) {
    const container2 = document.getElementById("container2");
    if (!container2) {
        console.error('Container with ID "container2" not found in DOM');
        return;
    }

    repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    container2.innerHTML = '';

    repos.forEach((repo, index) => {
        const imgUrl = img[index % img.length]; 
        const createdAt = repo.created_at;
        const updatedAt = repo.updated_at;
        const year = new Date(createdAt).getFullYear();
        const update = new Date(updatedAt).getFullYear();

        const repoItem = document.createElement('div');
        repoItem.classList.add('repo-item');

        const repoLink = document.createElement('a');
        repoLink.href = repo.html_url;

        const repoImg = document.createElement('img');
        repoImg.src = imgUrl;
        repoImg.alt = repo.name;
        repoImg.width = 100;
        repoImg.height = 70;

        repoLink.appendChild(repoImg);

        const repoName = document.createElement('h2');
        repoName.textContent = repo.name;

        const repoDescription = document.createElement('p');
        repoDescription.textContent = repo.description;

        const createdYear = document.createElement('li');
        createdYear.textContent = `Year Created: ${year}`;

        const updatedYear = document.createElement('li');
        updatedYear.textContent = `Year Updated: ${update}`;

        repoItem.appendChild(repoLink);
        repoItem.appendChild(repoName);
        repoItem.appendChild(repoDescription);
        repoItem.appendChild(createdYear);
        repoItem.appendChild(updatedYear);

        container2.appendChild(repoItem);
    });
}

// Fetch GitHub Repositories
fetchGitHubRepos();
