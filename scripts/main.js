fetch("publications.json")
.then(response => response.json())
.then(publications => {

const ol = document.getElementById("publication-list");

publications.forEach(pub => {

const li = document.createElement("li");

const authorsHTML = pub.authors.map(a => `<span class="authors">${a}</span>`).reduce((acc, curr, i, arr) => {
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
${pub.videoLink ? `<a target="_blank" href="${pub.videoLink}">[Video]</a>` : ""}
${pub.showAbstract ? `<button class="abstract-btn" data-target="${abstractId}">[Abstract]</button>` : ""}
<div id="${abstractId}" class="abstract">${pub.abstract}</div>
`;

ol.appendChild(li);

});

ol.addEventListener("click", e => {

if (!e.target.classList.contains("abstract-btn")) return;

const targetId = e.target.getAttribute("data-target");
const abstractDiv = document.getElementById(targetId);

const isVisible = abstractDiv.style.display === "block";
abstractDiv.style.display = isVisible ? "none" : "block";
e.target.textContent = isVisible ? "[Abstract]" : "[Hide Abstract]";

});

})
.catch(err => console.error("Failed to load publications:", err));