import { createTheme, type LinkProps } from "@mui/material";
import { LinkBehavior } from "./LinkBehaviour";

export const theme = createTheme({
    cssVariables: true,
    palette: {
      mode: 'dark',
      primary: {
        main: '#CB9EFF',
        light: '#FFCFFF',
        dark: '#996FCB',
        contrastText: '#FFFFFF',
      },
    },
    components: {
      MuiLink: {
        defaultProps: {
          component: LinkBehavior,
        } as LinkProps,
      },
      MuiButtonBase: {
        defaultProps: {
          LinkComponent: LinkBehavior,
        },
      },
    },
  });
