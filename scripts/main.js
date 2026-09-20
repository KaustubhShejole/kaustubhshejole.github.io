document.addEventListener("DOMContentLoaded", () => {

    // ============================================================
    // Publications
    // ============================================================

    fetch("publications.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then(publications => {

            const ol = document.getElementById("publication-list");

            if (!ol) return;

            publications.forEach(pub => {

                const li = document.createElement("li");

                // ------------------------------------------------
                // Authors
                // ------------------------------------------------

                const authorsHTML = pub.authors
                    .map(author => `<span class="authors">${author}</span>`)
                    .reduce((acc, curr, i, arr) => {
                        if (i === 0) return curr;
                        if (i === arr.length - 1) {
                            return `${acc} and ${curr}`;
                        }
                        return `${acc}, ${curr}`;
                    }, "");

                // ------------------------------------------------
                // Abstract
                // ------------------------------------------------

                const abstractId = `publication-abstract-${pub.id}`;

                // ------------------------------------------------
                // Links
                // ------------------------------------------------

                const linksHTML = [
                    pub.paperLink
                        ? `<a target="_blank" rel="noopener noreferrer" href="${pub.paperLink}">[Paper]</a>`
                        : "",

                    pub.githubLink
                        ? `<a target="_blank" rel="noopener noreferrer" href="${pub.githubLink}">[GitHub]</a>`
                        : "",

                    pub.videoLink
                        ? `<a target="_blank" rel="noopener noreferrer" href="${pub.videoLink}">[Video]</a>`
                        : "",

                    pub.posterLink
                        ? `<a target="_blank" rel="noopener noreferrer" href="${pub.posterLink}">[Poster]</a>`
                        : "",

                    pub.arxivLink
                        ? `<a target="_blank" rel="noopener noreferrer" href="${pub.arxivLink}">[ArXiv]</a>`
                        : "",

                    pub.showAbstract && pub.abstract
                        ? `<button class="abstract-btn" data-target="${abstractId}">[Abstract]</button>`
                        : ""
                ]
                    .filter(Boolean)
                    .join(" ");

                // ------------------------------------------------
                // Publication HTML
                // ------------------------------------------------

                li.innerHTML = `
                    <b>${pub.title}</b><br>
                    ${authorsHTML}.<br>
                    <span>${pub.venue}</span>${pub.year ? ` (${pub.year})` : ""}<br>

                    ${linksHTML}

                    ${
                        pub.abstract
                            ? `<div id="${abstractId}" class="abstract" style="display:none;">
                                ${pub.abstract}
                               </div>`
                            : ""
                    }
                `;

                ol.appendChild(li);
            });

        })
        .catch(error => {
            console.error("Failed to load publications:", error);
        });


    // ============================================================
    // Accomplishments
    // ============================================================

    fetch("accomplishments.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then(accomplishments => {

            const container =
                document.getElementById("accomplishments-list");

            if (!container) return;

            // ----------------------------------------------------
            // Section titles
            // ----------------------------------------------------

            const sectionTitles = {
                fellowship: "Fellowships",
                reviewer: "Reviewer",
                ethics_reviewer: "Ethics Reviewer",
                award: "Awards",
                publication: "Publications",
                talk: "Talks",
                service: "Service"
            };

            // ----------------------------------------------------
            // Group accomplishments by class
            // ----------------------------------------------------

            const grouped = {};

            accomplishments.forEach(item => {

                const key = item.class || "other";

                if (!grouped[key]) {
                    grouped[key] = [];
                }

                grouped[key].push(item);
            });

            // ----------------------------------------------------
            // Create each section
            // ----------------------------------------------------

            Object.keys(grouped).forEach(cls => {

                const section =
                    document.createElement("div");

                section.className =
                    "accomplishment-section";


                // ------------------------------------------------
                // Section heading
                // ------------------------------------------------

                const h4 =
                    document.createElement("h4");

                h4.textContent =
                    sectionTitles[cls] ||
                    cls
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, char => char.toUpperCase());

                section.appendChild(h4);


                // ------------------------------------------------
                // List
                // ------------------------------------------------

                const ol =
                    document.createElement("ol");


                grouped[cls].forEach(item => {

                    const li =
                        document.createElement("li");


                    // --------------------------------------------
                    // Abstract
                    // --------------------------------------------

                    const abstractId =
                        `accomplishment-abstract-${item.id}`;


                    // --------------------------------------------
                    // Main line
                    // --------------------------------------------

                    const mainLine = `
                        <b>${item.title || ""}</b>
                        ${item.year ? ` (${item.year})` : ""}
                        ${
                            item.description
                                ? `<br>${item.description}`
                                : ""
                        }
                    `;


                    // --------------------------------------------
                    // Optional links
                    // --------------------------------------------

                    const linksHTML = [

                        item.paperLink
                            ? `<a target="_blank" rel="noopener noreferrer" href="${item.paperLink}">[Paper]</a>`
                            : "",

                        item.githubLink
                            ? `<a target="_blank" rel="noopener noreferrer" href="${item.githubLink}">[GitHub]</a>`
                            : "",

                        item.videoLink
                            ? `<a target="_blank" rel="noopener noreferrer" href="${item.videoLink}">[Video]</a>`
                            : "",

                        item.posterLink
                            ? `<a target="_blank" rel="noopener noreferrer" href="${item.posterLink}">[Poster]</a>`
                            : "",

                        item.arxivLink
                            ? `<a target="_blank" rel="noopener noreferrer" href="${item.arxivLink}">[ArXiv]</a>`
                            : "",

                        item.showAbstract && item.abstract
                            ? `<button class="abstract-btn" data-target="${abstractId}">[Abstract]</button>`
                            : ""

                    ]
                        .filter(Boolean)
                        .join(" ");


                    // --------------------------------------------
                    // List item
                    // --------------------------------------------

                    li.innerHTML = `
                        ${mainLine}<br>

                        ${linksHTML}

                        ${
                            item.abstract
                                ? `<div
                                    id="${abstractId}"
                                    class="abstract"
                                    style="display:none;"
                                  >
                                    ${item.abstract}
                                  </div>`
                                : ""
                        }
                    `;

                    ol.appendChild(li);

                });


                section.appendChild(ol);
                container.appendChild(section);

            });

        })
        .catch(error => {
            console.error(
                "Failed to load accomplishments:",
                error
            );
        });


    // ============================================================
    // Abstract toggle
    // ============================================================

    document.addEventListener("click", event => {

        if (!event.target.classList.contains("abstract-btn")) {
            return;
        }

        const button =
            event.target;

        const targetId =
            button.getAttribute("data-target");

        const abstractDiv =
            document.getElementById(targetId);

        if (!abstractDiv) {
            return;
        }

        const isVisible =
            abstractDiv.style.display === "block";

        abstractDiv.style.display =
            isVisible ? "none" : "block";

        button.textContent =
            isVisible
                ? "[Abstract]"
                : "[Hide Abstract]";
    });

});