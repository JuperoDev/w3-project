<template>
  <div class="section__muster-army">
    <h3 id="section1" class="menu-holder__header">Muster your army</h3>
    <h5>
      In order to play a game of Warhammer 40,000, you will need to muster an
      army. To do so, follow the sequence below.
    </h5>
    <h4>SELECT BATTLE SIZE</h4>
    <p>
      With your opponent, select one of the battle sizes below. This will
      determine the total number of points each player can spend to build their
      army and, as a result, how long the battle will last. Points are a measure
      of a unit’s power on the battlefield; the higher a unit’s points value,
      the more powerful that unit is. The points values for units are presented
      in other publications, such as Codexes and the Munitorum Field Manual. You
      will need to refer to these when building your army.
    </p>
    <div class="muster__battle-size max-w-xs">
      <div class="muster__battle-size--header p-3 flex items-center justify-center bg-red-700 font-semibold text-slate-100	uppercase">
        <h6>Incursion</h6>
      </div>
      <div
        class="muster__battle-size--grid grid grid-cols-2 border-dotted border-b-2 border-b-black"
      >
        <div class="muster__battle-size--grid-left">
          <p>Points per Army</p>
          <p>Duration</p>
        </div>
        <div class="muster__battle-size--grid-right">
          <p>1000</p>
          <p>Up to 2 hours</p>
        </div>
      </div>
      <div class="muster__battle-size--header"><h6>Strike Force</h6></div>
      <div class="muster__battle-size--header"><h6>Onslaught</h6></div>
    </div>
    <h4>START YOUR ARMY ROSTER</h4>
    <p>
      The details of your army must be recorded on an Army Roster. This can be
      written on a piece of paper or recorded using the Warhammer 40,000 app.
      Players must show their finished Army Roster to their opponent before
      battle commences.
    </p>
    <p>You can use our army builder HERE</p>

    <h4>SELECT ARMY FACTION</h4>
    <p>Note on your Army Roster one Faction keyword to be your army faction.</p>
    <h4>SELECT DETACHMENT RULES</h4>
    <p>
      Note on your Army Roster one set of Detachment rules for your army. Some
      Detachment rules list units that you either must include or cannot include
      in your army; you must follow all such rules when building your army.
    </p>

    <h4>SELECT UNITS</h4>
    <p>
      Select all the units you want to include in your army. Your army must
      include at least one CHARACTER unit. Each time you include a unit in your
      army, it can take any upgrade, Enhancement or options it has access to.
      Note on your Army Roster the number of models in the unit, any weapons,
      wargear, upgrades and any Enhancement it has, and its points value.
      Subtract this points value from the total permitted for your battle size.
    </p>

    <p>You can only include a unit in your army if:</p>

    <ul>
      <li>
        That unit has the Faction keyword you chose for your army in step 3.
      </li>
      <li>You have enough points remaining.</li>
      <li>
        Your army does not already contain three units with the same datasheet
        name as that unit – or six units with the same datasheet name as that
        unit if it is a BATTLELINE or DEDICATED TRANSPORT* unit.
      </li>
    </ul>

    <h4>SELECT WARLORD</h4>
    <p>
      Select one CHARACTER model from your army to be your Warlord – this will
      be the leader of your army – and make a note of this on your Army Roster.
      Your Warlord gains the WARLORD keyword.
    </p>
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

.high-light-area {
  background-color: rgba(255, 246, 230, 0.523);
}

.menu__img-place-holder {
  margin: 0 auto;
}

.menu-holder__subtitles--red-square {
  height: 30px;
  width: 40px;
  background-color: rgb(189, 9, 9);

  margin-right: 20px;
}
.menu-holder__subtitles--red-square p {
  margin-left: 8px;
  margin-top: 2px;
  font-weight: 700;
}

.menu-holder__subtitles--xl {
  background-color: rgb(45, 45, 45);
  padding: 20px;
  color: rgb(246, 248, 250);
  margin: 0 auto;
  max-width: 822px;
}

.menu-holder__header {
  font-size: 30px;
  font-weight: 700;
  margin: 10px;
}
</style>
