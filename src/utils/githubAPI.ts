import axios from "axios";

// API TOKEN IS PUBLIC, PLEASE DON'T ABUSE. IT'S PERMISSIONS ARE READ ONLY. NO ACCESS TO PRIVATE REPOS
const authToken = process.env.REACT_APP_GITHUB_TOKEN;

interface githubRes {
  data: Array<rawRepo>;
}

interface rawRepo {
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
  vue: "#10B981",
  javascript: "#FCD34D",
  "jupyter notebook": "#F59E0B",
  python: "#7C3AED",
  typescript: "#4F46E5",
  undef: "black",
};

export async function getRepoData(): Promise<Array<repo> | undefined> {
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

export interface contributions {
  yearList?: any;
  months?: any;
}

interface contributionsRes {
  data: {
    years: any[];
  }
}

export async function getContributionData(): Promise<contributions | undefined> {
  let response: contributionsRes | undefined = await axios.get(
    "https://contributions-api.herokuapp.com/api/years/months/andantillon"
  );

  let yearList = response?.data.years.map((o) => o.year);

  let months = response?.data.years.map((o) =>
    o.months.map((m: { count: number }) => m.count)
  );

  return { yearList, months };
}
