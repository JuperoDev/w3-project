<template>
  <div class="datasheet-desktop__container">
    <div class="datasheet-desktop__header bg-zinc-800">
      
      
    </div>
    <div class="datasheet-desktop--grid-container grid grid-cols-3">

      <div class="datasheet-desktop__grid-container--left col-span-2">
        
        <div class="datasheet-desktop__section-header bg-slate-400 m-3 grid grid-cols-2">
          <div class="datasheet-desktop__section-title">
            <p>Ranged Weapons</p>
          </div>

          <div class="datasheet-desktop__section-stats">
            <p>Range</p>
          </div>

        </div>

        <div class="datasheet-desktop__section-header bg-slate-400 m-3">
          <p>Melee weapons</p>
        </div>

        <div class="datasheet-desktop__section-header bg-slate-400 m-3">
          <p>Wargear Options</p>
        </div>
       
      </div>
      <div class="datasheet-desktop__grid-container--right">
        <div class="datasheet-desktop__section-header bg-slate-400 m-3">
          <p>Abilities</p>
        </div>
        <div class="datasheet-desktop__section-header bg-slate-400 m-3">
          <p>Unit Composition</p>
        </div>
        <div class="datasheet-desktop__section-header bg-slate-400 m-3">
          <p>Leader</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
div {
  border: 1px solid red;
}

.datasheet-desktop__container {
  width: 1200px;
}

.datasheet-desktop__header {
  height: 200px;
}
</style>
