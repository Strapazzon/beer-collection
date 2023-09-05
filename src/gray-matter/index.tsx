import path from "path";
import fs from "fs";
import matter from "gray-matter";

const MDS_PATH = "src/gray-matter";

type AvailableMds = "home-seo";

export const getGrayMatter = <T,>(uid: AvailableMds): T => {
  const fullPath = path.join(path.join(process.cwd(), MDS_PATH), `${uid}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);
  return matterResult.data as T;
};
