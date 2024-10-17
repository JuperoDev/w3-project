<template>
  <div class="">
    <NavbarComponentsPrincipalNav />
    <!-- <div class="bg-stone-100 p-2 md:px-2 lg:px-16 h-full relative pb-20">  -->
      <div class="bg-stone-100 p-2 md:px-10 lg:px-16 h-full relative pb-20"> 

      <!-- <GeneralPurposeFireSparks /> -->

      <div class="bg-white border border-black-500 pb-16">
        <!-- Main Content -->
        <div class="principal__hero--img flex items-center justify-center">
          <img class="img-logo " src="https://cdn.icon-icons.com/icons2/2622/PNG/512/brand_warhammer_icon_158628.png" alt="logo" />
        </div>

        <div class="font-bebas flex items-center justify-center">
          <h2>Deep Strike</h2>
        </div>

        <div class="flex items-center justify-center">
          <FactionFetch />
        </div>
        
      </div>
      <LandingPageInfoboard />
      <LandingPageLandingFooter />
    </div>
    <GeneralPurposeFloatingFooter />
  </div>
</template>

<style scoped>


h2 {
  font-size: 30px;
  font-weight: 500;
  color: #191919;
  text-transform: uppercase;
}

.img-logo {
  max-width: 200px;
  opacity: 0.8;
}

@media only screen and (min-width: 1200px) {
  .img-logo {
    max-width: 300px;
  }
}

@media only screen and (min-width: 992px) and (max-width: 1199px) {
  .img-logo {
    max-width: 250px;
  }
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
  .img-logo {
    max-width: 220px;
  }
}

@media only screen and (min-width: 600px) and (max-width: 767px) {
  .img-logo {
    max-width: 180px;
  }
}

@media only screen and (max-width: 599px) {
  .img-logo {
    max-width: 150px;
  }
}
</style>
