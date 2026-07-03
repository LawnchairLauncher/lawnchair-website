import { Octokit } from "https://esm.sh/octokit";

const octokit = new Octokit();

const getLatestRelease = async (repo) => {
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.get("disableDownloads")) {
    console.log("Disabled downloads due to flag <code>disableDownloads</code>");
    return null;
  }

  try {
    const response = await octokit.request("GET /repos/{owner}/{repo}/releases", {
      owner: "lawnchairlauncher",
      repo: repo,
    });

    const validRelease = response.data.find(release => {
      const isNightly =
        release.tag_name?.toLowerCase().includes("nightly") ||
        release.name?.toLowerCase().includes("nightly");

      return !isNightly;
    });

    if (!validRelease) return null;

    return {
      version: validRelease.name.slice(validRelease.name.search(/\d/)),
      downloadLink: validRelease.assets[0]?.browser_download_url || `https://github.com/lawnchairlauncher/${repo}/releases`,
    };
  } catch {
    return null;
  }
};

const repoNames = ["lawnchair", "lawnfeed", "lawnicons"];

const majorVersions = {
  lawnchair: "14",
  lawnfeed: "3",
  lawnicons: "2",
};

const getFallbackDownloadLink = (repo) =>
  `https://github.com/lawnchairlauncher/${repo}/releases`;

repoNames.forEach(async (it) => {
  const latestRelease = await getLatestRelease(it);

  const versionSpan = document.querySelector(`#js-${it}-version`);
  const downloadAnchor = document.querySelector(`#js-${it}-download`);

  versionSpan.textContent = `Version ${
    latestRelease ? latestRelease.version : majorVersions[it]
  }`;
  downloadAnchor.href = latestRelease
    ? latestRelease.downloadLink
    : getFallbackDownloadLink(it);

  versionSpan.classList.remove("disabled");
  downloadAnchor.classList.remove("disabled");
});