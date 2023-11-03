<template>
    <div class="section__datasheet-abilities">
        <h3 id="section1" class="menu-holder__header">Datasheets and Abilities</h3>
        <h5>
            Each unit has a datasheet that lists the characteristics, wargear, abilities and keywords of its models. This section presents a summary of these elements and how they relate to playing the game.
    </h5>

    <img
        src="https://wahapedia.ru/wh40k10ed/img/ExampleDatasheet1.png"
        alt="example datasheet"
        class="menu__img-place-holder"
      />
      <img
        src="https://wahapedia.ru/wh40k10ed/img/ExampleDatasheet2.png"
        alt="example datasheet"
        class="menu__img-place-holder"
      />
      <br/>
<div class="grid grid-cols-3">

<div class="p-5">
    <h5>DATASHEET NAME</h5>
    <p>Here you will find the name of the unit.</p>
    <br>

    <h5>PROFILES</h5>
    <p>These contain the following characteristics that tell you how mighty the models in the unit are:</p>
    <br>
    <p><b>Move (M):</b> This is the speed at which a model moves across the battlefield. If a model has a Move of ‘-’ it is unable to move at all.</p>
    <br/>
    <p><b>Toughness (T): </b>This is the speed at which a model moves across the battlefield. If a model has a Move of ‘-’ it is unable to move at all.</p>
    <br/>
    <p><b>Save (Sv): </b>This indicates the protection a model’s armour gives them.</p>
    <br/>
    <p><b>Wounds (W): </b>Wounds represent how much damage a model can sustain before it succumbs to its injuries. If a model’s Wounds characteristic is reduced to 0, that model is destroyed.</p>
    <br/>
    <p><b>Leadership (Ld): </b>This reveals how courageous, determined or self-controlled a model is. The lower this number, the better a model’s Leadership is.</p>
    <br/>
    <p><b>Objective Control (OC):</b>This shows how effectively a model can exert control over an objective on the battlefield.
</p>
    <br/>
    <h5>ABILITIES</h5>
    <p>Many units have special abilities and rules that may apply during the game, from Core Rules shared by many units to bespoke Psychic abilities and invulnerable saves. These will be described here, along with any rules that apply when larger models such as vehicles have suffered sufficient damage.</p>
    <br/>
    <p>Some abilities are bestowed by items of wargear that models in a unit can be equipped with, and are known as Wargear abilities. These only apply while a model in the unit is equipped with the relevant item of wargear.</p>
    <br>
</div>

<div class="p-5">
    <h5>WEAPONS</h5>
    <p>Weapons are described with the following characteristics:</p>
    <br>
    <p><b>Range: </b> How far the weapon can shoot. Weapons with a range of ‘Melee’ are melee weapons and can only be used in close combat. All other weapons are ranged weapons.
</p>
    <br/>
    <p><b>Attacks (A): </b>This tells you how many attacks are made each time that weapon is used.</p>
    <br/>
    <p><b>Weapon Skill (WS): </b>This reflects the bearer’s skill in wielding the relevant melee weapon.</p>
    <br/>
    <p><b>Ballistic Skill (BS): </b>How likely the weapon is to wound a foe.</p>
    <br/>
    <p><b>Armour Penetration (AP): </b>This represents the weapon’s ability to cut through the target’s defences.</p>
    <br/>
    <p><b>Damage (D): </b>The amount of damage inflicted by a successful wound.
</p>

<h5>KEYWORDS</h5>
    <p>Datasheets have a list of keywords, separated into Faction keywords and other keywords. The former are used when deciding which models to include in your army, but otherwise both sets of keywords are functionally the same.</p>
    <br>
    <h5>UNIT COMPOSITION AND OTHER RULES</h5>
    <p>This section details the number and types of models in the unit, and the default weapons and wargear those models are equipped with. It may also describe other interactions, such as how units with the Leader ability can attach to other units, and passenger restrictions that may apply to TRANSPORT models.
</p>

</div>

<div class="p-5">

    <h5>WARGEAR OPTIONS</h5>
    <p>Some datasheets have a bullet-pointed list of wargear options. When you include such a unit in your army, you can use these options to change the weapons and other wargear of models in the unit. The order you use these options in does not matter, but each can only be used once.</p>

<br/>

<div class="menu-holder_highlight">
    <h5>LEADERSHIP TESTS</h5>
    <p>If a rule requires you to take a Leadership test for a unit, roll 2D6: if the total is greater than or equal to the best Leadership characteristic in that unit, that test is passed. Otherwise, it is failed.</p>
<br/>
<h5>RANDOM CHARACTERISTICS</h5>
    <p>Some characteristics are a random value instead of a number. For example, a model’s Move characteristic might be 2D6", or a weapon’s Attacks characteristic might be D6. When a unit with a random Move characteristic is selected to move, determine the entire unit’s move distance by rolling the indicated number of dice. For all other characteristics, roll to determine the value on an individual, per-model or per-weapon basis each time that characteristic is required.</p>
    <br/>

    <h5>AURA ABILITIES</h5>
    <p>Some abilities affect multiple models or units in a given range. These are known as Aura abilities and are tagged with the word ‘Aura’. A model with an Aura ability is always within range of its own Aura ability. A unit can be affected by more than one Aura ability at a time, but if a unit is within range of the same Aura ability more than once, that Aura ability only applies to that unit once.</p>
    <br/>
    <h5>PSYCHIC WEAPONS AND ABILITIES</h5>
    <p>Some weapons and abilities can only be used by PSYKERS. Such weapons and abilities are tagged with the word ‘Psychic’. If a Psychic weapon or ability causes any unit to suffer one or more wounds, each of those wounds is considered to have been inflicted by a Psychic Attack.</p>
    <br/>
</div>



</div>


</div>
    </div>
</template>

<style scoped>
h4 {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 30px;
}

h5 {
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 10px;
}

.menu-holder_highlight {
  background-color: rgb(237, 237, 237);
  padding: 20px;
  /* min-width: 500px; */
  
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
  /* margin: 10px; */
}
</style>
