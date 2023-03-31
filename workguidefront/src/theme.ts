import { createMakeAndWithStyles } from "tss-react";

function useTheme() {
    return {};
}

export const { 
  makeStyles,
  withStyles,
  useStyles
} = createMakeAndWithStyles({ useTheme });