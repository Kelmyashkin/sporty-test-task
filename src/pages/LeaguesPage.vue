<script lang="ts" setup>
import { onMounted, reactive, ref, computed } from "vue";
import LeaguesFilter from "@/components/LeaguesFilter.vue";
import LeaguesList from "@/components/LeaguesList.vue";
import { League, LeagueFilter } from "@/types/League";
import { getLeagues } from "@/api/api";

const leagues = ref<League[]>([]);
const filter = reactive<LeagueFilter>({
  sport: null,
  search: "",
});
const isLoading = ref(false);
const isError = ref(false);

const showLeaguesList = computed(() => {
  return !isLoading.value && !isError.value;
});

const sports = computed(() => {
  return Array.from(new Set(leagues.value.map((league) => league.strSport)));
});

const filteredLeagues = computed(() => {
  return leagues.value.filter((league) => {
    return (
      (!filter.sport || league.strSport === filter.sport) &&
      league.strLeague.toLowerCase().includes(filter.search.toLowerCase())
    );
  });
});

function handleFilterChange(changedFilter: LeagueFilter) {
  Object.assign(filter, changedFilter);
}

onMounted(() => {
  isLoading.value = true;
  getLeagues()
    .then((fetchedLeagues) => {
      leagues.value = fetchedLeagues;
      isError.value = false;
    })
    .catch((error) => {
      console.error("Error fetching leagues:", error);
      isError.value = true;
    })
    .finally(() => {
      isLoading.value = false;
    });
});
</script>

<template>
  <div class="page-container">
    <h1 class="page-title">Welcome to the Leagues Page</h1>
    <LeaguesFilter :sports="sports" @filter-changed="handleFilterChange" />

    <div v-if="isLoading" class="loading-message">Loading leagues...</div>
    <div v-if="isError" class="error-message">Error loading leagues</div>
    <LeaguesList v-if="showLeaguesList" :leagues="filteredLeagues" />
  </div>
</template>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
}

.page-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 32px;
  padding: 20px 0;
}

.loading-message {
  text-align: center;
  padding: 40px 20px;
  font-size: 1.1rem;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  margin: 20px 0;
}

.error-message {
  text-align: center;
  padding: 40px 20px;
  font-size: 1.1rem;
  border-radius: 12px;
  border: 2px solid #ef4444;
  margin: 20px 0;
}

@media (prefers-color-scheme: dark) {
  .loading-message {
    border-color: #374151;
  }

  .error-message {
    border-color: #dc2626;
  }
}

@media (max-width: 768px) {
  .page-container {
    padding: 16px;
  }

  .page-title {
    font-size: 1.5rem;
    margin-bottom: 24px;
  }
}
</style>
