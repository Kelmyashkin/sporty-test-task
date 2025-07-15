<script lang="ts" setup>
import { ref } from "vue";
import { getSeasonBadgeImage, tryGetBadgeImageFromCache } from "@/api/api";
import { League } from "@/types/League";

const props = defineProps<{
  league: League;
}>();

const badgeImage = ref<string | null>(
  // todisable cache check, uncomment next line
  // null
  // to use cache check, uncomment next line
  tryGetBadgeImageFromCache(props.league.idLeague)
);
const isLoading = ref(false);
const isError = ref(false);

function loadBadge() {
  isLoading.value = true;
  getSeasonBadgeImage(props.league.idLeague)
    .then((image) => {
      badgeImage.value = image;
      isError.value = false;
    })
    .catch((error) => {
      console.error("Error loading badge image:", error);
      badgeImage.value = null;
      isError.value = true;
    })
    .finally(() => {
      isLoading.value = false;
    });
}
</script>

<template>
  <div class="league-item" @click.stop="loadBadge">
    <div class="league-content">
      <h3>{{ league.strLeague }}</h3>
      <p>Sport: {{ league.strSport }}</p>
    </div>
    <div class="league-badge">
      <div v-if="isLoading">Loading badge...</div>
      <img v-if="badgeImage" :src="badgeImage" alt="League Badge" />
      <div v-if="isError">Error loading badge</div>
    </div>
  </div>
</template>

<style scoped>
.league-item {
  cursor: pointer;
  padding: 20px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.league-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.league-content {
  flex: 1;
}

.league-content h3 {
  margin: 0 0 8px 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.league-content p {
  margin: 0;
  font-size: 0.9rem;
}

.league-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  min-height: 64px;
  font-size: 0.875rem;
  text-align: center;
}

.league-badge img {
  max-width: 64px;
  max-height: 64px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
