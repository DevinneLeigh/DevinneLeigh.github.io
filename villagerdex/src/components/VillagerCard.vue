<script setup>
import { ref } from 'vue'


              /* defineProps will make the object that you put here <VillagerCard :state="aStateObject"> available within this file's <template> tags.  */
      /* But what if we want to use them in the <script> tags? 
      In that case, we want to save it as a variable. 
      This variable is often 'props'. But can be anything */
const props = defineProps({
  state: Object,
})

/* Now because we saved the result of the 'defineProps' method.
   We can access it via the 'props' variable */

/* But props.state.villagers is really verbose and gross */
/* You're right! */

/* We could try to make it easier to work with, */
/* by making some new variables and setting them like this */

// let villagers = props.state.villagers;
// let villagerIndex = props.state.villagerIndex;
// let selectedVillager = props.state.selectedVillager;
// let listView = props.state.listView;

/* But this doesn't copy a reference to the original object. It creates a new one. So when we update it. The information won't travel back to our parent App component. */

/* This is why we have to get and set data for our app's state through our 'props' variable.  */





function nextVillager() {
  // get the villagers length from the props.state
  let villagerLength = props.state.villagers.length;
  let newIndex = props.state.villagerIndex + 1;
  // // check if you current selected index (find in props.state) is the last villager.
  if (props.state.villagerIndex == villagerLength-1) {
    newIndex = 0;
      // If it is. then set
      //     - villagerIndex back to 0.
      //     - selectedVillager to that index in villagers.
      // (Make sure you set this data through the 'prop' variable, so that it travels back up to our parent App.)
  }
  props.state.selectedVillager = props.state.villagers[newIndex];
  props.state.villagerIndex = newIndex;
  props.state.houseView = false;
}

function prevVillager() {
  // get the villagers length from the props.state
  let villagerLength = props.state.villagers.length;
  let newIndex = props.state.villagerIndex - 1;

  // check if you current selected index (find in props.state) is the first villager.
  if (props.state.villagerIndex == 0) {
    newIndex = villagerLength-1;
      // If it is. then set
      //     - villagerIndex back to the last index (the length-1).
      //     - selectedVillager to that index in villagers.
      // (Make sure you set this data through the 'prop' variable, so that it travels back up to our parent App.)
  }
  
  props.state.selectedVillager = props.state.villagers[newIndex];
  props.state.villagerIndex = newIndex;
  props.state.houseView = false;
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
