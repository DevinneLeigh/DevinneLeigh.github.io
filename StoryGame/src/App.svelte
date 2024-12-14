<script>
  import Counter from './lib/Counter.svelte'
  import bg from "./assets/forest_ground_angle.jpeg";
  import crystalStream from "./assets/crystal_stream.jpeg";
  import t from "./i18n/en.js";


  class StoryChoice {
    constructor(text, nextStoryEvent) {
      this.text = text;
      this.nextStoryEvent = nextStoryEvent; // StoryEvent class instance
    }
  }

  class StoryEvent {
    constructor(text, choices, bg = null) {
      this.text = text
      this.choices = choices // array of StoryChoice class instances
      this.bg = bg;
    }
  }

  // create all story events with empty choice arrays.
  let storyEvents = {}; // initialize story events here

  Object.entries(t).forEach(entry => {
    const [storyEventKey, e] = entry;

    storyEvents[storyEventKey] = new StoryEvent(
      e.text,
      [],
      e.bg
    );
  })

  console.log(storyEvents);

  // Now that all events exist, update them all with choices.
  Object.entries(storyEvents).forEach(entry => {
    const [key, e] = entry;

    t[key].choices.forEach(choice => {
      storyEvents[key].choices.push(
        new StoryChoice(choice.text, storyEvents[choice.next])
      );
    });
    
  })

  let currentEvent = $state(storyEvents.startStoryEvent);

</script>

<main>

  <div class="ui-layout">

    <section class="ui-bg" style="background: url({currentEvent.bg}) center / cover;">
    </section>

    <section class="ui-story">
      <div class="scrollable">
        <p>{currentEvent.text}</p>
      </div>
      <!-- <button onclick={console.log(currentEvent)}>Log</button> -->
    </section>

    <section class="ui-choices">
    
      {#each currentEvent.choices as choice}
        <button class="btn" onclick={currentEvent = choice.nextStoryEvent}>
        <!-- {console.log(choice)} -->
          {choice.text}<br>
          <!-- goes to: {choice.nextStoryEvent} -->
        </button>
      {/each}
    </section>
  
  </div>
  
</main>

<style>

</style>
