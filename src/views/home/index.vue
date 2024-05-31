<script setup lang="ts">
import { NButton, NCard } from "naive-ui";

async function handlexx() {
  const res = await window.ipc.invoke("dll:open-msg-box");
  console.log("handlexx res", res);
}
async function handleAdd() {
  const res = await window.ipc.invoke("dll:transport-data", 12, '33');
  console.log("handlexx res", res);
}
async function handleSendObject() {
  const res = await window.ipc.invoke("dll:transport-object",{a: 12, b: 'a word'});
  console.log("handlexx res", res);
}
</script>

<template>
  <NSpace vertical :size="16">
    <NCard title="Gourp 1">
      <div class="flex flex-row flex-wrap gap-4">
        <!-- fill content -->
        <NButton @click="handlexx">msgbox</NButton>
        <NButton @click="handleAdd">send primitive data</NButton>
        <NButton @click="handleSendObject">send object data</NButton>
      </div>
    </NCard>
  </NSpace>
</template>

<style scoped></style>
