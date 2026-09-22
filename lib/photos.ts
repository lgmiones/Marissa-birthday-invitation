import type { StaticImageData } from "next/image";
import withPaddle from "./images/Gemini_Generated_Image_4cllzt4cllzt4cll.jpg";
import inNavy from "./images/Gemini_Generated_Image_cbex4tcbex4tcbex.jpg";
import withBasket from "./images/Gemini_Generated_Image_cz66shcz66shcz66.jpg";

export interface Photo {
  src: StaticImageData;
  alt: string;
}

export const MARIZ_PHOTOS = {
  paddle: { src: withPaddle, alt: "Mariz smiling in a lime tee and white skort, holding her pickleball paddle" },
  navy: { src: inNavy, alt: "Mariz in a navy polo, white cap and sunglasses, hand on hip" },
  basket: { src: withBasket, alt: "Mariz leaning on a ball-retriever basket full of pickleballs" },
} satisfies Record<string, Photo>;
