<template>
    <!-- Skeleton -->
    <div class="skeleton">
        <a-skeleton 
            :loading="loading" 
            active class="skeleton" 
            v-for="index in skeleton_time" 
            :key="index">  
        </a-skeleton>
    </div>
</template>

<script setup> 
import { defineProps, ref, computed } from 'vue';

defineProps({
    loading: Boolean,
    required: true,
});

// Sekeleton
const skeleton_time = 4;
</script>