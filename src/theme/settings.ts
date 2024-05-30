/** Default theme settings */
export const themeSettings: App.Theme.ThemeSetting = {
  themeScheme: "dark",
  grayscale: false,
  recommendColor: false,
  themeColor: "#646cff",
  themeVisible: false,
  otherColor: {
    info: "#2080f0",
    success: "#52c41a",
    warning: "#faad14",
    error: "#f5222d"
  },
  isInfoFollowPrimary: true,
  layout: {
    mode: "vertical",
    scrollMode: "content"
  },
  page: {
    animate: true,
    animateMode: "fade-slide"
  },
  header: {
    height: 56,
    breadcrumb: {
      visible: false,
      showIcon: true
    }
  },
  tab: {
    visible: false,
    cache: true,
    height: 44,
    mode: "chrome"
  },
  fixedHeaderAndTab: true,
  sider: {
    inverted: false,
    width: 220,
    collapsedWidth: 64,
    mixWidth: 90,
    mixCollapsedWidth: 64,
    mixChildMenuWidth: 200,
    control: {
      visible: false,
      default: "expand"
    }
  },
  footer: {
    visible: false,
    fixed: false,
    height: 48,
    right: true
  }
};

/**
 * Override theme settings
 *
 * If publish new version, use `overrideThemeSettings` to override certain theme settings
 */
export const overrideThemeSettings: Partial<App.Theme.ThemeSetting> = {};
