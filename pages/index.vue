<template>
  <div class="">
    <NavbarComponentsPrincipalNav/>
    <div class="bg-stone-100 p-2 md:px-2 lg:px-16 h-screen relative">
    <!-- <GeneralPurposeFireSparks/> -->

      <div class="bg-white border border-black-500 pb-16">
        <!-- Main Content -->
        <div class="principal__hero--img flex items-center justify-center"> <img class="img-logo " src="https://cdn.icon-icons.com/icons2/2622/PNG/512/brand_warhammer_icon_158628.png" alt="logo"></div>

        <div class="font-bebas flex items-center justify-center">
          <h2>Wargaming Assistant</h2>
        </div>
        <!-- <div class="flex items-center justify-center">
          <GeneralPurposeSearchBar/>
        </div> -->
        <div class="flex items-center justify-center">
          <FactionFetch/>
        </div>
        <div class="flex justify-center items-center my-5">
          


        </div>
      </div>
      <GeneralPurposeFloatingFooter/>
    </div>

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
  /* border: red 1px solid;  */
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

<script setup>

onMounted(() => {
  // Set the document title
  document.title = 'Deep Strike';

  // Create or update the meta description tag
  let metaDescription = document.querySelector('meta[name="description"]');

  if (!metaDescription) {
    // If the meta description tag doesn't exist, create it
    metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    document.head.appendChild(metaDescription);
  }

  // Set the content of the meta description
  metaDescription.content = 'Warhammer rules and army builder';
});


</script>