// ctrl + space en los corchetes y te salen todos los tipos de letras que hay en google fonts
import { Montserrat, Lusitana,  } from "next/font/google";

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const lusitana = Lusitana({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const helvetica = { }
