import { createTheme } from "@mui/material/styles";

export const buttonTheme = createTheme({
  palette: {
    primary: {
      main: "#1C804E",
    },
    secondary: {
      main: "#00c950",
      contrastText: "#fff",
    },
    success: {
      main: "#fff",
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { color: "neonGreen" as any },
          style: {
            backgroundColor: "#3BF26A",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#32D85A",
            },
          },
        },
      ],
    },
  },
});
