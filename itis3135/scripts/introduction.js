
const form = document.getElementById("introduction-form");
const courses = document.getElementById("courses");
const result = document.getElementById("result");
const formArea = document.getElementById("form-area");
const footerLinks = document.getElementById("footer-links");

const originalCourses = [
    ["AERO", "4101", "Aerospace Studies", "Required AFROTC class for my minor and commissioning as an officer in the military."],
    ["ITCS", "4145", "Parallel Programming", "Required class to graduate and for my concentration elective."],
    ["ITIS", "3135", "Front End Web App Development", "Elective I chose due to familiarity with HTML."],
    ["ITCS", "2610", "Computing Leadership Development", "Class required to continue my scholarship in school."],
    ["AERO", "1100", "Leadership Laboratory", "A required class for AFROTC."],
    ["STAT", "2122", "Intro to Probability and Statistics", "A required class to graduate."]
];

const originalLinks = [
    ["Charlotte Web", ""],
    ["GitHub.io", ""],
    ["GitHub", ""],
    ["freeCodeCamp", ""],
    ["LinkedIn", ""]
];

function addCourse(data = ["", "", "", ""]) {
    const course = document.createElement("div");
    course.className = "course";

    const labels = ["Department", "Course Number", "Course Name", "Reason"];

    labels.forEach((label, index) => {
        const fieldLabel = document.createElement("label");
        fieldLabel.textContent = label + ":";

        const input = document.createElement("input");
        input.type = "text";
        input.value = data[index];
        input.placeholder = label;
        input.required = true;

        course.appendChild(fieldLabel);
        course.appendChild(input);
    });

    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "Remove Course";
    remove.addEventListener("click", () => course.remove());

    course.appendChild(remove);
    courses.appendChild(course);
}

function loadCourses() {
    courses.innerHTML = "";
    originalCourses.forEach((course) => addCourse(course));
}

function loadLinks() {
    footerLinks.innerHTML = "";

    originalLinks.forEach((link, index) => {
        const label = document.createElement("label");
        label.textContent = "Link " + (index + 1) + " Name:";

        const name = document.createElement("input");
        name.type = "text";
        name.value = link[0];
        name.required = true;

        const urlLabel = document.createElement("label");
        urlLabel.textContent = "Link " + (index + 1) + " URL:";

        const url = document.createElement("input");
        url.type = "url";
        url.value = link[1];
        url.placeholder = "https://example.com";
        url.required = true;

        footerLinks.append(label, name, urlLabel, url);
    });
}

loadCourses();
loadLinks();

document.getElementById("add-course").addEventListener("click", () => {
    addCourse();
});

form.addEventListener("reset", () => {
    setTimeout(() => {
        loadCourses();
        loadLinks();
        document.getElementById("picture").value = "";
    }, 0);
});

document.getElementById("clear").addEventListener("click", () => {
    form.querySelectorAll("input, textarea").forEach((field) => {
        field.value = "";
    });

    courses.innerHTML = "";
    addCourse();

    footerLinks.querySelectorAll("input").forEach((field) => {
        field.value = "";
    });
});

function getValue(id) {
    return document.getElementById(id).value.trim();
}

function createElement(tag, text) {
    const element = document.createElement(tag);
    element.textContent = text;
    return element;
}

function addBullet(list, heading, value) {
    const li = document.createElement("li");
    const strong = createElement("strong", heading + ": ");
    li.append(strong, document.createTextNode(value));
    list.appendChild(li);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const name = [
        getValue("firstName"),
        getValue("middleName"),
        getValue("nickname"),
        getValue("lastName")
    ].filter(Boolean).join(" ");

    const divider = getValue("divider");
    const adjective = getValue("adjective");
    const animal = getValue("animal");

    result.innerHTML = "";

    result.appendChild(
        createElement("h6", name + " " + divider + " " + adjective + " " + animal)
    );

    const figure = document.createElement("figure");
    const image = document.createElement("img");

    const uploadedImage = document.getElementById("picture").files[0];

    if (uploadedImage) {
        image.src = URL.createObjectURL(uploadedImage);
    } else {
        image.src = "images/your-photo.jpg";
    }

    image.alt = name;
    image.width = 400;
    image.height = 500;

    figure.appendChild(image);
    figure.appendChild(createElement("figcaption", getValue("caption")));
    result.appendChild(figure);

    result.appendChild(createElement("p", getValue("statement")));

    const list = document.createElement("ul");

    addBullet(list, "Personal Background", getValue("personal"));
    addBullet(list, "Professional Background", getValue("professional"));
    addBullet(list, "Academic Background", getValue("academic"));
    addBullet(list, "Primary Work Computer", getValue("computer"));
    addBullet(list, "Primary Work Location", getValue("location"));
    addBullet(list, "Alternate Computer & Location", getValue("alternate"));

    const courseBullet = document.createElement("li");
    courseBullet.appendChild(
        createElement("strong", "Courses I'm Taking, & Why:")
    );

    const orderedList = document.createElement("ol");

    courses.querySelectorAll(".course").forEach((course) => {
        const fields = course.querySelectorAll("input");

        const department = fields[0].value;
        const number = fields[1].value;
        const title = fields[2].value;
        const reason = fields[3].value;

        const li = document.createElement("li");
        const strong = createElement(
            "strong",
            department + number + " - " + title + ": "
        );

        li.append(strong, document.createTextNode(reason));
        orderedList.appendChild(li);
    });

    courseBullet.appendChild(orderedList);
    list.appendChild(courseBullet);
    result.appendChild(list);

    const quote = document.createElement("blockquote");
    quote.appendChild(
        document.createTextNode("“" + getValue("quote") + "”")
    );
    quote.appendChild(document.createElement("br"));

    const author = createElement("em", "- " + getValue("quoteAuthor"));
    quote.appendChild(author);
    result.appendChild(quote);

    if (getValue("funny")) {
        result.appendChild(
            createElement("p", "Funny Thing: " + getValue("funny"))
        );
    }

    if (getValue("share")) {
        result.appendChild(
            createElement("p", "Something to Share: " + getValue("share"))
        );
    }

    const linksHeading = createElement("h3", "Links");
    const linksList = document.createElement("ul");

    const linkInputs = footerLinks.querySelectorAll("input");

    for (let i = 0; i < linkInputs.length; i += 2) {
        const li = document.createElement("li");
        const anchor = document.createElement("a");

        anchor.textContent = linkInputs[i].value;
        anchor.href = linkInputs[i + 1].value;

        li.appendChild(anchor);
        linksList.appendChild(li);
    }

    result.appendChild(linksHeading);
    result.appendChild(linksList);

    const acknowledgment = createElement(
        "p",
        getValue("acknowledgment") + " " + getValue("acknowledgmentDate")
    );

    result.appendChild(acknowledgment);

    const startOver = document.createElement("a");
    startOver.href = "#";
    startOver.textContent = "Reset Form";

    startOver.addEventListener("click", (event) => {
        event.preventDefault();
        formArea.hidden = false;
        result.innerHTML = "";
        form.reset();
        window.scrollTo(0, 0);
    });

    result.appendChild(startOver);

    formArea.hidden = true;
    window.scrollTo(0, 0);
});


/* Generate HTML, JSON, and XML from the introduction form */

function getFormData() {
    const courseData = [];

    courses.querySelectorAll(".course").forEach((course) => {
        const fields = course.querySelectorAll("input");

        courseData.push({
            department: fields[0].value,
            number: fields[1].value,
            title: fields[2].value,
            reason: fields[3].value
        });
    });

    const linkData = [];
    const linkInputs = footerLinks.querySelectorAll("input");

    for (let i = 0; i < linkInputs.length; i += 2) {
        linkData.push({
            name: linkInputs[i].value,
            url: linkInputs[i + 1].value
        });
    }

    return {
        firstName: getValue("firstName"),
        middleName: getValue("middleName"),
        nickname: getValue("nickname"),
        lastName: getValue("lastName"),
        acknowledgment: getValue("acknowledgment"),
        acknowledgmentDate: getValue("acknowledgmentDate"),
        adjective: getValue("adjective"),
        animal: getValue("animal"),
        divider: getValue("divider"),
        picture: document.getElementById("picture").files[0] ? document.getElementById("picture").files[0].name : "images/your-photo.jpg",
        caption: getValue("caption"),
        statement: getValue("statement"),
        personalBackground: getValue("personal"),
        professionalBackground: getValue("professional"),
        academicBackground: getValue("academic"),
        primaryComputer: getValue("computer"),
        primaryLocation: getValue("location"),
        alternateComputer: getValue("alternate"),
        courses: courseData,
        quote: getValue("quote"),
        quoteAuthor: getValue("quoteAuthor"),
        funny: getValue("funny"),
        share: getValue("share"),
        links: linkData
    };
}

function showGeneratedCode(code) {
    let output = document.getElementById("generated-code");

    if (!output) {
        output = document.createElement("textarea");
        output.id = "generated-code";
        output.readOnly = true;
        output.rows = 20;
        output.style.width = "100%";
        output.style.boxSizing = "border-box";
        output.style.marginTop = "20px";

        form.appendChild(output);
    }

    output.value = code;
    output.scrollIntoView({ behavior: "smooth", block: "start" });
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (character) => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];
    });
}

function generateHTML(data) {
    const name = [
        data.firstName,
        data.middleName,
        data.nickname,
        data.lastName
    ].filter(Boolean).join(" ");

    const courseHTML = data.courses.map((course) =>
        `            <li><strong>${escapeHTML(course.department)}${escapeHTML(course.number)} - ${escapeHTML(course.title)}:</strong> ${escapeHTML(course.reason)}</li>`
    ).join("\n");

    const linkHTML = data.links.map((link) =>
        `        <li><a href="${escapeHTML(link.url)}">${escapeHTML(link.name)}</a></li>`
    ).join("\n");

    const bullets = [
        ["Personal Background", data.personalBackground],
        ["Professional Background", data.professionalBackground],
        ["Academic Background", data.academicBackground],
        ["Primary Work Computer", data.primaryComputer],
        ["Primary Work Location", data.primaryLocation],
        ["Alternate Computer & Location", data.alternateComputer]
    ].map(([heading, value]) =>
        `        <li><strong>${escapeHTML(heading)}:</strong> ${escapeHTML(value)}</li>`
    ).join("\n");

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Introduction</title>
    <link rel="stylesheet" href="styles/default.css">
</head>
<body>
    <main>
        <h2>Introduction</h2>
        <h6>${escapeHTML(name)} ${escapeHTML(data.divider)} ${escapeHTML(data.adjective)} ${escapeHTML(data.animal)}</h6>
        <figure>
            <img src="${escapeHTML(data.picture)}" alt="${escapeHTML(name)}" width="400" height="500">
            <figcaption>${escapeHTML(data.caption)}</figcaption>
        </figure>
        <p>${escapeHTML(data.statement)}</p>
        <ul>
${bullets}
        <li><strong>Courses I'm Taking, &amp; Why:</strong>
            <ol>
${courseHTML}
            </ol>
        </li>
        </ul>
        <blockquote>${escapeHTML(data.quote)}<br><em>- ${escapeHTML(data.quoteAuthor)}</em></blockquote>
${data.funny ? `        <p>Funny Thing: ${escapeHTML(data.funny)}</p>\n` : ""}${data.share ? `        <p>Something to Share: ${escapeHTML(data.share)}</p>\n` : ""}        <h3>Links</h3>
        <ul>
${linkHTML}
        </ul>
        <p>${escapeHTML(data.acknowledgment)} ${escapeHTML(data.acknowledgmentDate)}</p>
    </main>
</body>
</html>`;
}

function generateXML(data) {
    function toXML(key, value, indent = "") {
        if (Array.isArray(value)) {
            const itemName = key === "courses" ? "course" : "link";

            return `${indent}<${key}>\n` +
                value.map((item) => toXML(itemName, item, indent + "    ")).join("\n") +
                `\n${indent}</${key}>`;
        }

        if (typeof value === "object" && value !== null) {
            return `${indent}<${key}>\n` +
                Object.entries(value).map(([name, item]) =>
                    toXML(name, item, indent + "    ")
                ).join("\n") +
                `\n${indent}</${key}>`;
        }

        return `${indent}<${key}>${escapeHTML(value)}</${key}>`;
    }

    return '<?xml version="1.0" encoding="UTF-8"?>\n' +
        toXML("introduction", data);
}

document.getElementById("generate-html").addEventListener("click", () => {
    showGeneratedCode(generateHTML(getFormData()));
});

document.getElementById("generate-json").addEventListener("click", () => {
    showGeneratedCode(JSON.stringify(getFormData(), null, 4));
});

document.getElementById("generate-xml").addEventListener("click", () => {
    showGeneratedCode(generateXML(getFormData()));
});
