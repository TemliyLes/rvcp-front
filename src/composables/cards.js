import img1 from "@/assets/img/1.png";
import img2 from "@/assets/img/2.png";
import img3 from "@/assets/img/3.png";
import img4 from "@/assets/img/4.png";
import img5 from "@/assets/img/5.png";
import img6 from "@/assets/img/6.png";

import video1 from "@/assets/video/1new.mp4";
import video2 from "@/assets/video/2new.mp4";
import video3 from "@/assets/video/3new.mp4";
import videoExt from "@/assets/video/ext.mp4";

export const getCards = (t) => [
  {
    id: 1,
    poster: img1,
    alt: t("projects.cards.0.alt"),
    title: t("projects.cards.0.title"),
    description: t("projects.cards.0.description"),
    video: video1,
  },

  {
    id: 2,
    poster: img2,
    alt: t("projects.cards.1.alt"),
    title: t("projects.cards.1.title"),
    description: t("projects.cards.1.description"),
    video: video2,
  },

  {
    id: 3,
    poster: img3,
    alt: t("projects.cards.2.alt"),
    title: t("projects.cards.2.title"),
    description: t("projects.cards.2.description"),
    video: video3,
  },

  {
    id: 4,
    poster: img4,
    alt: t("projects.cards.3.alt"),
    title: t("projects.cards.3.title"),
    description: t("projects.cards.3.description"),
    link: "https://www.youtube.com/shorts/4HZyKUMSFOU",
    linkText: t("projects.viewProject"),
    target: "_blank",
  },

  {
    id: 5,
    poster: img5,
    alt: t("projects.cards.4.alt"),
    title: t("projects.cards.4.title"),
    description: t("projects.cards.4.description"),
    link: "https://www.instagram.com/p/DKKYm8OK4vv/",
    linkText: t("projects.viewProject"),
    target: "_blank",
  },

  {
    id: 6,
    poster: img6,
    alt: t("projects.cards.5.alt"),
    title: t("projects.cards.5.title"),
    description: t("projects.cards.5.description"),
    link: videoExt,
    linkText: t("projects.viewProject"),
    target: "_blank",
  },
];
