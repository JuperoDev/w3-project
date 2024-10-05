<template>
    <div class="bg-zinc-800 text-white py-8">
      <div class="container mx-auto px-4">
        <!-- Grid Layout for Footer Links -->
        <div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 text-center md:text-left">
          <!-- Feedback & Errors Column -->
          <div>
            <h2 class="font-bold text-lg mb-2">Feedback & Errors</h2>
            <ul class="list-none">
              <li>
                <a href="https://discord.gg/" target="_blank" class="text-zinc-400 hover:text-white">
                  Discord Deep Strike <span class="inline-block">&#x1F517;</span>
                </a>
              </li>
            </ul>
          </div>
  
          <!-- Friendly Resources Column -->
          <!-- <div>
            <h2 class="font-bold text-lg mb-2">Friendly Resources</h2>
            <ul class="list-none">
              <li>
                <a href="https://wahapedia.ru" target="_blank" class="text-gray-400 hover:text-white">
                  Wahapedia <span class="inline-block">&#x1F517;</span>
                </a>
              </li>
            </ul>
          </div> -->
        </div>
  
        <!-- Footer Disclaimer Text -->
        <div class="mt-8 text-center text-xs text-zinc-300">
          Deep Strike is a community project not associated with Games Workshop. All original content is Copyright © {{ currentYear }} Games Workshop.
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      currentYear() {
        return new Date().getFullYear();
      },
    },
  };
  </script>