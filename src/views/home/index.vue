<script setup lang="ts">
import { NButton, NCard, useNotification } from "naive-ui";
import { DllEvtEnum } from "@sa/enums";
const notification = useNotification();
async function handlexx() {
  try {
    await window.ipc.invoke(DllEvtEnum.DLL_MSG_BOX);
  } catch (error: any) {
    notification.error({
      content: "异常",
      meta: error?.message || error,
      duration: 2500,
      keepAliveOnHover: true
    });
  }
}
async function handleReturn() {
  try {
    const res = await window.ipc.invoke(DllEvtEnum.DLL_DEMO);
    notification.success({
      content: "收到信息",
      meta: JSON.stringify(res.data || {}),
      duration: 2500,
      keepAliveOnHover: true
    });
  } catch (error: any) {
    notification.error({
      content: "异常",
      meta: error?.message || error,
      duration: 2500,
      keepAliveOnHover: true
    });
  }
}
async function handleAdd() {
  const res = await window.ipc.invoke(DllEvtEnum.DLL_TRANSPORT_DATA, 12, "33");
  console.log("handlexx res", res);
}
async function handleSendObject() {
  const res = await window.ipc.invoke(DllEvtEnum.DLL_TRANSPORT_DATA_OBJECT, { a: 12, b: "a word" });
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
        <NButton @click="handleReturn">return</NButton>
      </div>
    </NCard>
  </NSpace>
</template>

<style scoped></style>
