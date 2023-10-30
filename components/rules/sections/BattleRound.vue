<template>
  <div class="section__battle-round">
    <h3 id="section2" class="menu-holder__header">The Battle Round</h3>
    <h5>
      Warhammer 40,000 is played in a series of battle rounds. In each battle
      round, both players have a turn. The same player always takes the first
      turn in each battle round – the mission you are playing will tell you
      which player this is. Each turn consists of a series of phases, which must
      be resolved in the following order.
    </h5>

    <h4>Command</h4>
    <p>
      At the start of your Command phase, before doing anything else, both
      players gain 1CP. Command points are a strategic resource that you can
      spend during the battle to use Stratagems.
    </p>

    <p>
      Then, if you have any other rules that need to be resolved in the Command
      phase, you do so now before progressing to the Battle-shock step.
    </p>

    <div class="menu-holder_highlight">
      <ul>
        <li>Both players gain 1CP.</li>
        <li>Resolve any other rules that occur in the Command phase.</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
h4 {
  text-transform: uppercase;
  font-weight: 700;
}

.menu-holder_highlight {
  background-color: rgb(237, 237, 237);
  padding: 20px;
  /* min-width: 500px; */
  margin: 20px;
}

 ul {
  /* min-width: 700px; */
  list-style: none;
}

li::before {
  content: "■";
  list-style-type: square;
  color: rgb(218, 0, 0);
  display: inline-block;
  width: 1em;
  margin-right: 1em;

  font-size: 15px;
}

.high-light-area{
background-color: rgba(255, 246, 230, 0.523);
}

.menu__img-place-holder{
margin: 0 auto;
}

.menu-holder__subtitles--red-square{
  height: 30px;
  width: 40px;
  background-color: rgb(189, 9, 9);
  
  margin-right: 20px;
}
.menu-holder__subtitles--red-square p{
 margin-left: 8px;
 margin-top: 2px; 
 font-weight: 700;
}

.menu-holder__subtitles--xl{
  background-color: rgb(45, 45, 45);
  padding: 20px;
  color: rgb(246, 248, 250);
  margin: 0 auto;
  max-width: 822px;
}

.menu-holder__header{
  font-size: 30px;
  font-weight: 700;
  margin: 10px;
}
</style>