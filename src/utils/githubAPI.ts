import axios from "axios";

// API TOKEN IS PUBLIC, PLEASE DON'T ABUSE. IT'S PERMISSIONS ARE READ ONLY. NO ACCESS TO PRIVATE REPOS
const authToken = process.env.REACT_APP_GITHUB_TOKEN;

interface githubRes {
  data: Array<rawRepo>;
}

export interface rawRepo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  size: number;
  fork?: boolean;
}

export interface repo {
  repo?: string;
  desc?: string;
  url?: string;
  stars?: number;
  lang?: string;
  langColor?: string;
}


const langColors: { [id: string]: string } = {
  vue: "green-500",
  javascript: "yellow-300",
  "jupyter notebook": "yellow-500",
  python: "purple-600",
  typescript: "blue-600",
  undef: "black",
};

export async function getGithubData(): Promise<Array<repo> | undefined> {
  let response: githubRes | undefined = await axios.get(
    "https://api.github.com/users/andantillon/repos",
    {
      headers: {
        Authorization: `token ${authToken}`,
      },
    }
  );

  return response?.data
    ?.filter((repo) => repo.fork === false && repo.size > 0 && repo.stargazers_count > 0)
    .sort((a, b) => b.size - a.size)
    .map((o) => ({
      repo: o.name.toLowerCase(),
      desc: o.description,
      url: o.html_url,
      stars: o.stargazers_count,
      lang: o.language.toLowerCase(),
      langColor: langColors[o.language.toLowerCase()]
    }));
}
