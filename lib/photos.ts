import type { StaticImageData } from "next/image";
import withPaddle from "./images/1.png";
import inNavy from "./images/2.png";
import withBasket from "./images/3.png";

export interface Photo {
  src: StaticImageData;
  alt: string;
}

export const MARIZ_PHOTOS = {
  paddle: { src: withPaddle, alt: "Mariz smiling in a sage tee and white skort, holding her pickleball paddle" },
  navy: { src: inNavy, alt: "Mariz in a pink polo, white cap and sunglasses, hand on hip" },
  basket: { src: withBasket, alt: "Mariz in a sage tee, leaning on a ball-retriever basket full of pickleballs" },
} satisfies Record<string, Photo>;
