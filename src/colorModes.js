import { blue, green, grey, purple, red} from '@mui/material/colors';

const firstMode = {
  name: "Light",
  primary: {
    main: blue[600]
  },
  secondary: {
    main: green[500]
  },
  customBG: {
    main: grey[200],
  },
  text: {
    primary: grey[900],
    secondary: grey[900]
  },
}

const thirdMode =
{
  name: "Dark",
  primary: {
    main: purple[600]
  },
  secondary: {
    main: red[400]
  },
  customBG: {
    main: grey[900],
  },
  text: {
    primary: grey[300],
    secondary: grey[400]
  },
  background: {
    default: '#000000'
  },
}

export const modes = [firstMode, thirdMode]
