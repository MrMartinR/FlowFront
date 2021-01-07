import { toAbsoluteUrl } from "../../../_metronic/_helpers"

function getInitLayoutConfig() {
  return {
    demo: "demo1",
    js: {
      breakpoints: {
        sm: "576",
        md: "768",
        lg: "992",
        xl: "1200",
        xxl: "1200",
      },
      colors: {
        theme: {
          base: {
            white: "#ffffff",
            primary: "#6993FF",
            secondary: "#E5EAEE",
            success: "#1BC5BD",
            info: "#8950FC",
            warning: "#FFA800",
            danger: "#F64E60",
            light: "#F3F6F9",
            dark: "#212121",
          },
          light: {
            white: "#ffffff",
            primary: "#E1E9FF",
            secondary: "#ECF0F3",
            success: "#C9F7F5",
            info: "#EEE5FF",
            warning: "#FFF4DE",
            danger: "#FFE2E5",
            light: "#F3F6F9",
            dark: "#D6D6E0",
          },
          inverse: {
            white: "#ffffff",
            primary: "#ffffff",
            secondary: "#212121",
            success: "#ffffff",
            info: "#ffffff",
            warning: "#ffffff",
            danger: "#ffffff",
            light: "#464E5F",
            dark: "#ffffff",
          },
        },
        gray: {
          gray100: "#F3F6F9",
          gray200: "#ECF0F3",
          gray300: "#E5EAEE",
          gray400: "#D6D6E0",
          gray500: "#B5B5C3",
          gray600: "#80808F",
          gray700: "#464E5F",
          gray800: "#1B283F",
          gray900: "#212121",
        },
      },
      fontFamily: "Poppins",
    },
    // == Page Splash Screen loading
    loader: {
      enabled: true,
      type: "", // default|spinner-message|spinner-logo
      logo: toAbsoluteUrl("/media/logos/flow-logo.svg"),
      message: "Please wait...",
    },
    // page toolbar
    toolbar: {
      display: true,
    },
    header: {
      self: {
        width: "fluid", // fixed|fluid
        theme: "light", // light|dark
        fixed: {
          desktop: true,
        },
      },
      menu: {
        self: {
          display: true,
          layout: "default", // tab/default
          "root-arrow": false,
          "icon-style": "line", // duotone, line, bold, solid
        },
        desktop: {
          arrow: true,
          toggle: "click",
          submenu: {
            theme: "light", // light|dark
            arrow: true,
          },
        },
      },
    },
    subheader: {
      display: true,
      displayDesc: false,
      displayDaterangepicker: true,
      layout: "subheader-v1",
      fixed: true,
      width: "fluid", // fixed/fluid,
      clear: false,
      style: "solid", // solid/transparent
      breadcrumb: {
        display: true,
      },
    },
    content: {
      width: "fluid", // fluid|fixed
    },
  }
}

export default getInitLayoutConfig