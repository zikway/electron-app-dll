<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "WindowControl"
});
const props = defineProps<{
  type: "window:max" | "window:close" | "window:min";
  icon: string;
  secIcon?: string;
}>();
const flag = ref(false);
const targetIcon = ref(props.icon);
let handleClick = () => {
  if (!props.secIcon) {
    handleClick = () => {
      window?.ipc.invoke(props.type);
      flag.value = !flag.value;
    };
  } else {
    handleClick = () => {
      window?.ipc.invoke(props.type);
      flag.value = !flag.value;
      flag.value ? (targetIcon.value = props.secIcon!) : (targetIcon.value = props.icon);
    };
  }
  handleClick();
};
</script>

<template>
  <ButtonIcon class="text-2xl" :icon="targetIcon" @click="handleClick" />
</template>

<style scoped></style>
