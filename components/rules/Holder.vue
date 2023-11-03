<template>
  <div>
    <!-- Core concepts -->
   <!-- <RulesSectionsCoreConcepts/> -->
    
<!-- BATTLE ROUND  -->
   
<!-- <RulesSectionsBattleRound/> -->

    <!-- DATASHEET AND ABILITIES  -->
    <RulesSectionsDatasheets/>

    <!-- FURTHER RULES  -->

    <!-- MUSTER YOUR ARMY  -->

    <!-- <RulesSectionsMuster/> -->

    <!-- MISSIONS  -->

    <!-- RULES COMMENTARY  -->

    <!-- END -->
   
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
<!-- 
<script setup>
import { onMounted } from "vue";

onMounted(() => {
  const section16 = document.getElementById("section16");

  const options = {
    root: null, // Use the viewport as the root
    rootMargin: "0px", // No margin
    threshold: 0, // Trigger when completely in the viewport
  };

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      // The element is now in the viewport
      alert("You are in Section 16");
      observer.disconnect(); // Stop observing once triggered
    }
  }, options);

  observer.observe(section16);
});
</script> -->
