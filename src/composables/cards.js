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

export const data = [
  {
    id: 1,
    poster: img1,
    alt: "video-1",
    ariaLabel: "Play video 1",
    title: "Soukromý dům v Rakousku · 800 m²",
    description: "Kompletní rekonstrukce",
    video: video1,
  },

  {
    id: 2,
    poster: img2,
    alt: "video-2",
    ariaLabel: "Play video 2",
    title: "LOŽNICE 19 M² A OBÝVACÍ POKOJ 28 M²",
    description: "Individuální návrh interiéru",
    video: video2,
  },

  {
    id: 3,
    poster: img3,
    alt: "video-3",
    ariaLabel: "Play video 3",
    title: "BYT 1,5+KK · 48 M²",
    description: "Rekonstrukce",
    video: video3,
  },

  {
    id: 4,
    poster: img4,
    alt: "project-1",
    ariaLabel: "Open project 1",
    title: "TŘÍPOKOJOVÝ BYT · 70 m²",
    description: "Kompletní rekonstrukce",
    link: "https://www.youtube.com/shorts/4HZyKUMSFOU",
    linkText: "Zobrazit realizaci",
    target: "_blank",
  },

  {
    id: 5,
    poster: img5,
    alt: "project-2",
    ariaLabel: "Open project 2",
    title: "Třípokojový byt · 70 m²",
    description: "Kompletní rekonstrukce",
    link: "https://www.instagram.com/p/DKKYm8OK4vv/",
    linkText: "Zobrazit realizaci",
    target: "_blank",
  },

  {
    id: 6,
    poster: img6,
    alt: "project-3",
    ariaLabel: "Open project 3",
    title: "BYT 1+KK · 58 M²",
    description: "Návrh a finální realizace",
    link: videoExt,
    linkText: "Zobrazit realizaci",
    target: "_blank",
  },
];
