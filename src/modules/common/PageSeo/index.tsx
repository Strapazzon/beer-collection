import { NextSeo } from "next-seo";
import React from "react";

export type PageSeoProps = {
  uid?: string;
  title: string;
  description: string;
  imagePath?: string;
  imageUrl?: string | null;
  keywords?: string;
};

const SITE_URL = process.env.SITE_URL || "";

export const getCanonicalUrl = (uid?: string): string => {
  if (!uid) {
    return SITE_URL;
  }

  if (uid) {
    return `${SITE_URL}${uid}`;
  }

  return SITE_URL;
};

export const PageSeo: React.FC<PageSeoProps> = ({
  uid,
  title,
  description,
  imagePath = "/assets/open-graph.png",
  keywords = "",
  imageUrl,
}) => {
  const ogImage = imageUrl ?? `${SITE_URL}${imagePath}`;
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={getCanonicalUrl(uid)}
      openGraph={{
        title: title,
        description: description,
        images: [
          {
            url: ogImage,
            width: 800,
            height: 600,
            alt: title,
          },
        ],
      }}
      twitter={{
        cardType: "summary_large_image",
      }}
      additionalMetaTags={[
        {
          property: "og:type",
          content: "website",
        },
        {
          name: "keywords",
          content: keywords,
        },
      ]}
    />
  );
};
