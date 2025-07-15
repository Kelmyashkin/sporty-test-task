<script lang="ts" setup>
import { reactive } from "vue";
import { LeagueFilter } from "@/types/League";

const { sports } = defineProps<{
  sports?: string[];
}>();

const emit = defineEmits<{
  (e: "filter-changed", filter: LeagueFilter): void;
}>();

const filter = reactive<LeagueFilter>({
  sport: null as string | null,
  search: "",
});

function updateFilter() {
  emit("filter-changed", { ...filter });
}
</script>

<template>
  <div class="filter-container">
    <div class="filter-header">
      <h2>Leagues Filter</h2>
    </div>
    <div class="filter-controls">
      <div class="form-group">
        <label for="league-select">Select Sport:</label>
        <select
          id="league-select"
          v-model="filter.sport"
          @change="updateFilter"
          class="form-control"
        >
          <option value="">All Sports</option>
          <option v-for="sport in sports" :key="sport" :value="sport">
            {{ sport }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="search-input">Search:</label>
        <input
          id="search-input"
          type="text"
          placeholder="Enter search term..."
          v-model="filter.search"
          @input="updateFilter"
          class="form-control"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-container {
  max-width: 800px;
  margin: 0 auto 32px auto;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.filter-header {
  padding: 20px 24px;
  text-align: center;
}

.filter-header h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.filter-controls {
  padding: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .filter-controls {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.025em;
}

.form-control {
  padding: 12px 16px;
  border: 2px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background-color: field;
  color: fieldtext;
}

.form-control:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.2);
}

@media (prefers-color-scheme: dark) {
  .form-control {
    background-color: #2d2d2d;
    color: #ffffff;
    border-color: #555;
  }

  .form-control:focus {
    border-color: #4da6ff;
    box-shadow: 0 0 0 3px rgba(77, 166, 255, 0.2);
  }
}

select.form-control {
  cursor: pointer;
}
</style>
