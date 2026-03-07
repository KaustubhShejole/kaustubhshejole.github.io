/**
 * Load and render publications from publications.json
 */
function loadPublications() {
    fetch("publications.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(publications => {
            renderPublications(publications);
        })
        .catch(err => {
            console.error("Failed to load publications:", err);
            const ol = document.getElementById("publication-list");
            if (ol) {
                ol.innerHTML = "<li><em>Error loading publications. Please try again later.</em></li>";
            }
        });
}

/**
 * Render publication list
 * @param {Array} publications - Array of publication objects
 */
function renderPublications(publications) {
    const ol = document.getElementById("publication-list");
    if (!ol) return;

    ol.innerHTML = "";

    publications.forEach(pub => {
        const li = document.createElement("li");

        // Format authors with commas and "and"
        const authorsHTML = pub.authors
            .map(a => `<span class="authors">${a}</span>`)
            .reduce((acc, curr, i, arr) => {
                if (i === 0) return curr;
                if (i === arr.length - 1) return `${acc} and ${curr}`;
                return `${acc}, ${curr}`;
            }, "");

        const abstractId = `abstract-${pub.id}`;

        li.innerHTML = `
            <b>${pub.title}</b><br>
            ${authorsHTML}.<br>
            <span>${pub.venue}</span><br>
            <a target="_blank" href="${pub.paperLink}">[Paper]</a>
            ${pub.githubLink ? `<a target="_blank" href="${pub.githubLink}">[GitHub]</a>` : ""}
            ${pub.showAbstract ? `<button class="abstract-btn" data-target="${abstractId}">[Abstract]</button>` : ""}
            <div id="${abstractId}" class="abstract">${pub.abstract}</div>
        `;

        ol.appendChild(li);
    });

    // Add event listener for abstract toggle
    ol.addEventListener("click", handleAbstractToggle);
}

/**
 * Handle abstract toggle button clicks
 * @param {Event} e - Click event
 */
function handleAbstractToggle(e) {
    if (!e.target.classList.contains("abstract-btn")) return;

    const targetId = e.target.getAttribute("data-target");
    const abstractDiv = document.getElementById(targetId);

    if (!abstractDiv) return;

    const isVisible = abstractDiv.style.display === "block";
    abstractDiv.style.display = isVisible ? "none" : "block";
    e.target.textContent = isVisible ? "[Abstract]" : "[Hide Abstract]";
}

// Initialize publications when DOM is ready
document.addEventListener("DOMContentLoaded", loadPublications);
