<script setup>
import { ref } from 'vue'

const props = defineProps({
  state: Object,
})

// const count = ref(0);

function nextVillager() {
  let newIndex = props.state.villagerIndex++;
  props.state.selectedVillager = props.state.villagers[newIndex];
}

function prevVillager() {
  let newIndex = props.state.villagerIndex--;
  props.state.selectedVillager = props.state.villagers[newIndex];
}

</script>




<template>

<!-- 1
  "name": "Ace",
  "iconImage": "https://acnhcdn.com/latest/NpcIcon/brd09.png",
  "photoImage": "https://acnhcdn.com/latest/NpcBromide/NpcNmlBrd09.png",
  "houseImage": "",
  "species": "Bird",
  "gender": "Male",
  "personality": "Jock",
  "hobby": "Nature",
  "birthday": "8/11",
  "catchphrase": "ace" 
-->

  <div class="villager-card">

    <div class="name-section">
      <h1>{{ state.selectedVillager.name }}</h1>
    </div>

    <div class="profile-section">
      <button @click="prevVillager" class="left-arrow">&lt;</button>
      <div class="profile-wrapper">
        <img class="profile" :src="state.selectedVillager.photoImage" alt="Villager">
      </div>
      <button @click="nextVillager" class="right-arrow">&gt;</button>
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
