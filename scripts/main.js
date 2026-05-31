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

fetch("accomplishments.json")
.then(response => response.json())
.then(accomplishments => {

    const container = document.getElementById("accomplishments-list");

    const sectionTitles = {
        reviewer: "Reviewer",
        award: "Awards",
        publication: "Publications",
        talk: "Talks",
        service: "Service"
    };

    const grouped = {};

    accomplishments.forEach(item => {
        const key = item.class || "other";
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(item);
    });

    Object.keys(grouped).forEach(cls => {

        const section = document.createElement("div");
        section.className = "accomplishment-section";

        const h4 = document.createElement("h4");
        h4.textContent = sectionTitles[cls] || cls.charAt(0).toUpperCase() + cls.slice(1);
        section.appendChild(h4);

        const ol = document.createElement("ol");

        grouped[cls].forEach(item => {
            const li = document.createElement("li");

            const abstractId = `abstract-${item.id}`;

            let mainLine = "";

            if (cls === "reviewer") {
                mainLine = `<b>${item.venue}</b> (${item.year})`;
            } else if (cls === "award") {
                mainLine = `<b>${item.title || item.venue}</b>${item.venue ? `, <span>${item.venue}</span>` : ""}${item.year ? ` (${item.year})` : ""}`;
            } else {
                mainLine = `<b>${item.title || item.venue}</b>${item.year ? ` (${item.year})` : ""}`;
            }

            li.innerHTML = `
                ${mainLine}<br>
                ${item.paperLink ? `<a target="_blank" href="${item.paperLink}">[Paper]</a>` : ""}
                ${item.githubLink ? `<a target="_blank" href="${item.githubLink}">[GitHub]</a>` : ""}
                ${item.videoLink ? `<a target="_blank" href="${item.videoLink}">[Video]</a>` : ""}
                ${item.showAbstract ? `<button class="abstract-btn" data-target="${abstractId}">[Abstract]</button>` : ""}
                ${item.abstract ? `<div id="${abstractId}" class="abstract" style="display:none;">${item.abstract}</div>` : ""}
            `;

            ol.appendChild(li);
        });

        section.appendChild(ol);
        container.appendChild(section);
    });

    container.addEventListener("click", e => {
        if (!e.target.classList.contains("abstract-btn")) return;

        const targetId = e.target.getAttribute("data-target");
        const abstractDiv = document.getElementById(targetId);

        if (!abstractDiv) return;

        const isVisible = abstractDiv.style.display === "block";
        abstractDiv.style.display = isVisible ? "none" : "block";
        e.target.textContent = isVisible ? "[Abstract]" : "[Hide Abstract]";
    });

})
.catch(err => console.error("Failed to load accomplishments:", err));