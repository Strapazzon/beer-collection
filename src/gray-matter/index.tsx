import path from "path";
import fs from "fs";
import matter from "gray-matter";

const MDS_PATH = "src/gray-matter";

export type GrayMatterAvailableMds = "home-seo" | "home" | "detail";

export const getGrayMatter = <T,>(
  uid: GrayMatterAvailableMds,
  locale = "en-US"
): T => {
  const fullPath = path.join(
    path.join(process.cwd(), MDS_PATH),
    `${locale}/${uid}.md`
  );
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);
  return matterResult.data as T;
};
