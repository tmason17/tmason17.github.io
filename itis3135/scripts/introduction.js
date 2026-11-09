
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
