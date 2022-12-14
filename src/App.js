import React from "react";
import { pathToRegexp, parse, compile, match } from "path-to-regexp";

const GITHUB_REPO_URL = "https://api.github.com/repos/:owner/:repo";

export default function App() {
  const url = toUrl(GITHUB_REPO_URL, {
    owner: "CSho27",
    repo: "PowerUp",
    branch: "v0.0.1",
    file: "package.json"
  });
  return <div>Path: {url}</div>;
}

function toUrl(urlFormat, params) {
  const url = new URL(urlFormat);
  const mainPath = url.hostname + url.pathname;
  const tokens = parse(mainPath);
  const toPath = compile(mainPath, { encode: encodeURIComponent });
  const pathWithoutSearchParams = toPath(params);
  const paramsKeys = Object.entries(params).filter(
    (p) => !tokens.some((t) => t.name === p[0])
  );
  const searchParams = new URLSearchParams();
  paramsKeys.forEach((e) => searchParams.append(e[0], e[1]));
  return (
    url.protocol +
    "//" +
    pathWithoutSearchParams +
    "?" +
    searchParams.toString()
  );
}
