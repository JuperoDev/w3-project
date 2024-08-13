<template>
  <div class="bg-stone-100 p-2 lg:px-64 h-screen relative">
    <GeneralPurposePasswordProtection>
      <div class="bg-white border border-black-500 pb-16">
        <!-- Main Content -->
        <div class="font-bebas flex items-center justify-center">
          <h2>Avaliable Armies</h2>
        </div>
        <div class="flex items-center justify-center">
          <GeneralPurposeSearchBar/>
        </div>
        <div class="flex items-center justify-center">
          <FactionFetch/>
        </div>
        <div class="flex justify-center items-center my-5">
        
        </div>
      </div>
      <GeneralPurposeFloatingFooter/>
    </GeneralPurposePasswordProtection>

  </div>
</template>

<style scoped>
h2 {
  font-size: 40px;
  font-weight: 500;
  color: #191919;
  text-transform: uppercase;
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