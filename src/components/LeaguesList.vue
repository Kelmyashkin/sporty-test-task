<script lang="ts" setup>
import { League } from "@/types/League";
import LeagueItem from "./LeagueItem.vue";

defineProps<{
  leagues: League[];
}>();
</script>

<template>
  <div class="leagues-container">
    <h2>Leagues List</h2>
    <div v-if="!leagues.length" class="no-leagues">No leagues found</div>
    <div v-else class="leagues-list">
      <LeagueItem
        v-for="league in leagues"
        :key="league.idLeague"
        :league="league"
      />
    </div>
  </div>
</template>

<style scoped>
.leagues-container {
  max-width: 800px;
  margin: 0 auto;
}

.leagues-container h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 24px;
  text-align: center;
}

.no-leagues {
  text-align: center;
  padding: 40px 20px;
  font-size: 1.1rem;
  border-radius: 12px;
  border: 2px dashed #cbd5e1;
}

.leagues-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.leagues-list li {
  list-style: none;
}
</style>
