import { extendTheme } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";
import { Dict } from "@chakra-ui/utils";
const dark = "rgb(17,17,17)";
const light = "#F9FAFB";



export const theme = extendTheme({
  
  styles: {
    global: (props: Dict<any> | StyleFunctionProps) => ({
      body: {
        bg: mode(light, dark)(props),
      },
    }),
  },
});

