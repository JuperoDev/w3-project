<template>
    <div class="section__muster-army">
        <h3 id="section1" class="menu-holder__header">Muster your army</h3>
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