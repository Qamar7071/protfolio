/* =========================================================
   BRAND & TECH LOGOS — served locally from /public/logos
   Sources: Devicon (MIT), Simple Icons (CC0), Wikimedia Commons,
   and the organisations' own sites (STMU, DeepLearning.AI).
   Logos are used only to identify the tool / issuer named next to them.
   ========================================================= */

export type Logo = {
  src: string;
  /** wordmark-shaped logo — render a bit wider than square marks */
  wide?: boolean;
};

const l = (file: string, wide = false): Logo => ({ src: `/logos/${file}`, wide });

const LOGOS: Record<string, Logo> = {
  // ---- Languages / ML ----
  python: l("python.svg"),
  scikitlearn: l("scikit-learn.svg"),
  tensorflow: l("tensorflow.svg"),
  keras: l("keras.svg"),
  pandas: l("pandas.svg"),
  numpy: l("numpy.svg"),
  matplotlib: l("matplotlib.svg"),
  jupyter: l("jupyter.svg"),
  jupyternotebook: l("jupyter.svg"),

  // ---- Backend / deploy / tooling ----
  flask: l("flask.svg"),
  git: l("git.svg"),
  github: l("github.svg"),
  vercel: l("vercel.svg"),
  render: l("render.svg"),
  vscode: l("vscode.svg"),

  // ---- Frontend (learning) ----
  react: l("react.svg"),
  nextjs: l("nextjs.svg"),
  typescript: l("typescript.svg"),
  tailwindcss: l("tailwindcss.svg"),
  framermotion: l("framermotion.svg"),
  java: l("java.svg"),

  // ---- AI platforms ----
  openai: l("openai.svg"),
  openaiapi: l("openai.svg"),
  chatgpt: l("openai.svg"),
  langchain: l("langchain.svg"),
  claude: l("anthropic.svg"),
  gemini: l("googlegemini.svg"),

  // ---- Issuers / organisations ----
  ibm: l("ibm.svg", true),
  coursera: l("coursera.svg"),
  deeplearningai: l("deeplearning-ai.png"),
  vanderbiltuniversity: l("vanderbilt.png"),
  stmu: l("stmu.png"),
  shifatameeremillatuniversity: l("stmu.png"),
  fiverr: l("fiverr.svg", true),

  // ---- Contact channels ----
  gmail: l("gmail.svg"),
  email: l("gmail.svg"),
  whatsapp: l("whatsapp.svg"),
  linkedin: l("linkedin.svg"),
};

/** "Scikit-learn", "Java (Basic)", "VS Code", "OpenAI API" → lookup key */
export function logoKey(name: string) {
  return name
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/[^a-z0-9]/g, "");
}

export function getLogo(name: string): Logo | undefined {
  return LOGOS[logoKey(name)];
}
