const url = window.location.origin + "/live-information.json";

function buildSnackbar() {
  function buildHtml() {
    return `
<span>Several announcements are available.</span>
<button class="snackbar_link">More info</button>
<button class="snackbar_dismiss" title="Close this announcement">X</button>
`;
  }

  const snackbar = document.querySelector(".snackbar")

  snackbar.style.display = "flex";
  snackbar.innerHTML = buildHtml();

  document
    .querySelector(".snackbar_dismiss")
    .addEventListener("click", () => {
      snackbar.style.display = "none";
    });

  document
    .querySelector(".snackbar_link")
    .addEventListener("click", () => {
      snackbar.style.display = "none";
    });
}

class Announcement {
  constructor(text, url, active, test) {
    this.text = text
    this.url = url
    this.active = active
    this.test = test
  }
}

async function fetchAnnouncements(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      // noinspection ExceptionCaughtLocallyJS
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      return await response.json();
    }
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return [];
  }
}

function getAnnouncements(data) {
  function createAnnouncements(jsonData) {
    // Check if the input data contains announcements
    if (!jsonData.announcements) {
      throw new Error("Invalid JSON data: 'announcements' key missing.");
    }

    // Map the JSON data to Announcement instances
    return jsonData.announcements.map(ann => {
      // Destructure properties with default values for missing fields
      const { text, url = null, active, test } = ann;
      return new Announcement(text, url, active, test);
    });
  }

  function buildAnnouncement(announcement, test) {
    const testMode = announcement.test || test ? "test" : ""
    const active = announcement.active ? "active" : ""

    return announcement.url != null ? `
    <a class="announcement ${testMode} ${active}" href="${announcement.url}">
      <div class="title">${announcement.text}</div>
    </a>
    ` : `
    <div class="announcement ${testMode} ${active}">
      <div class="title">${announcement.text}</div>
    </div>`
  }

  function buildDialog(announcementList, test) {
    let items = ""

    announcementList.forEach((ann, _) => {
      items += buildAnnouncement(ann, test)
    })

    return `<div class="announcements-title">Announcements</div>
    <div class="announcements-description">${items}</div>
    <div class="announcements-buttons"><button class="dismiss">Dismiss</button></div>`
  }

  const ann = createAnnouncements(data)

  return buildDialog(ann, false)
}

function buildPopup(html) {
  const dialog = document.querySelector(".alert-dialog")
  const dialogWrap = document.querySelector(".alert-dialog-wrapper")
  const scrim = document.querySelector(".scrim")

  dialog.innerHTML = html;

  document.querySelector(".snackbar_link")
    .addEventListener("click", () => {
      dialogWrap.classList = "alert-dialog-wrapper show"
      dialogWrap.removeAttribute("inert")
      dialogWrap.focus()
      scrim.classList = "scrim";
    });

  document
    .querySelector(".announcements-buttons .dismiss")
    .addEventListener("click", () => {
      dialogWrap.classList = "alert-dialog-wrapper"
      dialogWrap.setAttribute("aria-label", "hidden")
      dialogWrap.setAttribute("inert", "")
      scrim.classList = "scrim hide";
    });
}

const urlParams = new URLSearchParams(window.location.search);

if (window.location.search.includes("testMode")) {
  document.querySelector("html").classList = "show-tests"
}

buildSnackbar(urlParams)
fetchAnnouncements(url)
  .then(list => {
    buildPopup(getAnnouncements(list))
  })
