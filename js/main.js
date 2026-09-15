// Live release data — this repo is public, so the GitHub API works unauthenticated.
// This is the only script on the page: no inline handlers, no inline <script>,
// which is what lets css/../index.html ship a strict script-src 'self' policy.
(async function loadLatestRelease() {
  const chip = document.getElementById("release-chip");
  const metaEl = document.getElementById("release-meta");
  const btnEl = document.getElementById("download-btn");
  const labelEl = document.getElementById("download-label");
  if (!metaEl || !btnEl || !labelEl) return;

  try {
    const res = await fetch("https://api.github.com/repos/Maximus23451/vela-chat/releases/latest", {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) throw new Error("release lookup failed: " + res.status);
    const release = await res.json();

    const apkAsset = (release.assets || []).find(
      (a) => typeof a.name === "string" && a.name.endsWith(".apk")
    );
    const version = release.tag_name || release.name || "latest";
    const published = release.published_at
      ? new Date(release.published_at).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
      : null;

    if (apkAsset) {
      btnEl.href = apkAsset.browser_download_url;
      labelEl.textContent = `Download ${version}`;
    } else {
      btnEl.href = release.html_url || btnEl.href;
      labelEl.textContent = `View ${version} on GitHub`;
    }

    metaEl.textContent = published
      ? `${version} · released ${published}${apkAsset ? " · " + formatBytes(apkAsset.size) : ""}`
      : version;

    if (chip) chip.dataset.state = "ok";
  } catch (err) {
    metaEl.textContent = "Latest release info unavailable right now — see the GitHub repo.";
    btnEl.href = "https://github.com/Maximus23451/vela-chat/releases";
    if (chip) chip.dataset.state = "error";
  }
})();

function formatBytes(bytes) {
  const mb = Number(bytes) / (1024 * 1024);
  if (!Number.isFinite(mb)) return "";
  return mb.toFixed(1) + " MB";
}
