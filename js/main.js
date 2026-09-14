// Live release data — this repo is public, so the GitHub API works unauthenticated.
(async function loadLatestRelease() {
  const metaEl = document.getElementById("release-meta");
  const btnEl = document.getElementById("download-btn");
  const labelEl = document.getElementById("download-label");

  try {
    const res = await fetch("https://api.github.com/repos/Maximus23451/vela-chat/releases/latest", {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) throw new Error("release lookup failed: " + res.status);
    const release = await res.json();

    const apkAsset = (release.assets || []).find((a) => a.name.endsWith(".apk"));
    const version = release.tag_name || release.name || "latest";
    const published = release.published_at
      ? new Date(release.published_at).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
      : null;

    if (apkAsset) {
      btnEl.href = apkAsset.browser_download_url;
      labelEl.textContent = `Download ${version}`;
    } else {
      btnEl.href = release.html_url;
      labelEl.textContent = `View ${version} on GitHub`;
    }

    metaEl.textContent = published
      ? `${version} · released ${published}${apkAsset ? " · " + formatBytes(apkAsset.size) : ""}`
      : version;
  } catch (err) {
    metaEl.textContent = "Latest release info unavailable right now — see the GitHub repo.";
    btnEl.href = "https://github.com/Maximus23451/vela-chat/releases";
  }
})();

function formatBytes(bytes) {
  const mb = bytes / (1024 * 1024);
  return mb.toFixed(1) + " MB";
}
