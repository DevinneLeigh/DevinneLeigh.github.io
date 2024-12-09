<script setup>
import { ref } from 'vue'

const props = defineProps({
  state: Object,
})

function nextVillager() {

  let villagerLength = props.state.villagers.length;
  let newIndex = props.state.villagerIndex + 1;

  if (props.state.villagerIndex == villagerLength-1) {
    newIndex = 0;
  }
  props.state.selectedVillager = props.state.villagers[newIndex];
  props.state.villagerIndex = newIndex;
  props.state.houseView = false;
}

function prevVillager() {
  let villagerLength = props.state.villagers.length;
  let newIndex = props.state.villagerIndex - 1;

  if (props.state.villagerIndex == 0) {
    newIndex = villagerLength-1;
  }
  
  props.state.selectedVillager = props.state.villagers[newIndex];
  props.state.villagerIndex = newIndex;
  props.state.houseView = false;
}

</script>




<template>

  <div class="villager-card">

    <div class="name-section">
      <h2>{{ state.selectedVillager.name }}</h2>
    </div>

    <div class="profile-section">
      <button @click="prevVillager" class="left-arrow">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
      </button>
      <div class="profile-wrapper">
        <img v-if="!state.houseView" class="profile" :src="state.selectedVillager.photoImage" alt="Villager">
        <img v-else class="profile" :src="state.selectedVillager.houseImage" alt="Villager">
      </div>
      <button @click="nextVillager" class="right-arrow">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
      </button>
    </div>

    <div class="details-section">
      <table>
        <tbody>
          <tr>
            <td>Birthday: {{ state.selectedVillager.birthday }}</td>
            <td>Gender: {{ state.selectedVillager.gender }}</td>
          </tr>
          <tr>
            <td>Species: {{ state.selectedVillager.species }}</td>
            <td>Personality: {{ state.selectedVillager.personality }}</td>
          </tr>
          <tr>
            <td colspan="2">CatchPhrase: {{ state.selectedVillager.catchphrase }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>

</template>
