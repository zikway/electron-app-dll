<script setup lang="ts">
import { computed, readonly } from "vue";
import { useAppStore } from "@/store/modules/app";
import { useThemeStore } from "@/store/modules/theme";
import { useRouteStore } from "@/store/modules/route";
import HorizontalMenu from "../global-menu/base-menu.vue";
import GlobalLogo from "../global-logo/index.vue";
import GlobalBreadcrumb from "../global-breadcrumb/index.vue";
import { useMixMenuContext } from "../../context";
import ThemeButton from "./components/theme-button.vue";
import UserAvatar from "./components/user-avatar.vue";
import WindowControl from "./components/window-control.vue";

defineOptions({
  name: "GlobalHeader"
});

interface Props {
  /** Whether to show the logo */
  showLogo?: App.Global.HeaderProps["showLogo"];
  /** Whether to show the menu toggler */
  showMenuToggler?: App.Global.HeaderProps["showMenuToggler"];
  /** Whether to show the menu */
  showMenu?: App.Global.HeaderProps["showMenu"];
}

defineProps<Props>();

const appStore = useAppStore();
const themeStore = useThemeStore();
const routeStore = useRouteStore();
const { menus } = useMixMenuContext();

const headerMenus = computed(() => {
  if (themeStore.layout.mode === "horizontal") {
    return routeStore.menus;
  }

  if (themeStore.layout.mode === "horizontal-mix") {
    return menus.value;
  }

  return [];
});
const winControlList = readonly([
  {
    icon: "ic:round-minus",
    type: "window:min"
  },
  {
    icon: "ic:round-fullscreen",
    secIcon: "ic:round-fullscreen-exit",
    type: "window:max"
  },
  {
    icon: "ic:round-close",
    type: "window:close"
  }
]);
</script>

<template>
  <DarkModeContainer class="h-full flex-y-center shadow-header">
    <GlobalLogo v-if="showLogo" class="h-full" :style="{ width: themeStore.sider.width + 'px' }" />
    <HorizontalMenu v-if="showMenu" mode="horizontal" :menus="headerMenus" class="px-12px win-drag" />
    <div v-else class="h-full flex-y-center flex-1-hidden win-drag">
      <MenuToggler v-if="showMenuToggler" :collapsed="appStore.siderCollapse" class="win-no-drag" @click="appStore.toggleSiderCollapse" />
      <GlobalBreadcrumb v-if="!appStore.isMobile" class="ml-12px win-no-drag" />
      <UserAvatar class="win-no-drag" />
    </div>
    <div class="mr-12px h-full flex-y-center justify-end win-drag">
      <!--
 <GlobalSearch />
      <FullScreen v-if="!appStore.isMobile" :full="isFullscreen" @click="toggle" /> 
-->
      <!-- <LangSwitch :lang="appStore.locale" :lang-options="appStore.localeOptions" @change-lang="appStore.changeLocale" /> -->
      <!--
 <ThemeSchemaSwitch
        :theme-schema="themeStore.themeScheme"
        :is-dark="themeStore.darkMode"
        @switch="themeStore.toggleThemeScheme"
      /> 
-->
      <WindowControl
        v-for="ctrInfo in winControlList"
        :key="ctrInfo.type"
        :type="ctrInfo.type as any"
        :icon="ctrInfo.icon"
        :sec-icon="ctrInfo.secIcon"
        class="win-no-drag"
      />
      <ThemeButton v-if="themeStore.themeVisible" class="win-no-drag" />
    </div>
  </DarkModeContainer>
</template>

<style scoped></style>
