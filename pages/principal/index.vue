<template>
  <div class="principal__wrap">
    <NavbarComponentsPrincipalNav/>
    <GeneralPurposeFireSparks/>

    <div class="principal__hero bg-orange-400">
      <div class="principal__hero--img flex items-center justify-center"> <img class="img-logo " src="https://cdn.icon-icons.com/icons2/2622/PNG/512/brand_warhammer_icon_158628.png" alt="logo"></div>
     
     
      <div class="principal__hero--button-grid">
        <div class="font-bebas flex items-center justify-center">
          <h2>wargaming companion</h2>
        </div>
        <div class="flex items-center justify-center">
          <FactionFetch />
        </div>
      </div>
    </div>
    
    <div class="principal__subsection bg-zinc-800 text-zinc-50"></div>
    <GeneralPurposeFloatingFooter/>
   
  </div>
</template>

<style scoped>

div{
  border: red 1px solid; 
}

h2 {
  font-size: 30px;
  font-weight: 500;
  color: #191919;
  text-transform: uppercase;
}

.img-logo {
  border: red 1px solid; 
  /* Default max-width */
  max-width: 200px; 
  opacity: 0.8;
  
}

/* Extra large devices (large desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .img-logo {
    max-width: 300px; /* Default size for large desktops */
  }
}

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199px) {
  .img-logo {
    max-width: 250px; /* Slightly smaller for desktops */
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991px) {
  .img-logo {
    max-width: 220px; /* Adjusted size for tablets */
  }
}

/* Small devices (phones, 600px and up) */
@media only screen and (min-width: 600px) and (max-width: 767px) {
  .img-logo {
    max-width: 180px; /* Smaller size for phones */
  }
}

/* Extra small devices (phones, 599px and down) */
@media only screen and (max-width: 599px) {
  .img-logo {
    max-width: 150px; /* Smallest size for extra small devices */
  }
}
</style>
