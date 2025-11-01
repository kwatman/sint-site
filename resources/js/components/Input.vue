<script setup lang="ts">
defineProps<{
    label?: string;
    name: string;
    placeholder?: string;
}>();

const model = defineModel<string>();

</script>


<template>
    <div class="w-full">
        <label v-if="label" class="mr-4 font-semibold text-foreground text-lg" :for="name">{{ label }}</label>
        <input
            class="
            border-2
            border-b
            w-full
            border-primary/30
            bg-white/80
            rounded-lg
            text-lg
            py-2
            px-4
            text-foreground
            placeholder:text-muted-foreground
            ring-offset-background
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-ring
            focus-visible:ring-offset-2
            focus:border-primary
            focus-visible:ring-primary
            "
            :id="name" :name="name" v-model="model" type="text" :placeholder="placeholder"/>
    </div>
</template>

<style scoped>

</style>
