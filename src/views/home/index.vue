<script setup lang="ts">
import { NButton, NCard } from "naive-ui";

async function handlexx() {
  const res = await window.ipc.invoke("dll:open-msg-box");
  console.log("handlexx res", res);
}
</script>

<template>
  <NSpace vertical :size="16">
    <NCard title="Gourp 1">
      <div class="flex flex-row flex-wrap gap-4">
        <!-- fill content -->
        <NButton @click="handlexx">msgbox</NButton>
      </div>
    </NCard>
  </NSpace>
</template>

<style scoped></style>
