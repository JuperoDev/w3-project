<template>
  <div class="bg-gray-100 h-screen">
    <!-- <FactionFetch /> -->
    <!-- <v-btn><nuxt-link to="/simulator">Simulator</nuxt-link></v-btn>
      <v-btn><nuxt-link to="/builder">Army Builder</nuxt-link></v-btn>
      <v-btn><nuxt-link to="/rules">Rules</nuxt-link></v-btn> -->

    <!-- temporary build  -->

    <div class="font-bebas flex items-center justify-center"><h2>Xenos Armies</h2></div>
    <div class="grid grid-cols-2 lg:grid-cols-4">

      <div class="button__container my-5 ">
        <div class="army__card font-bebas">
          <nuxt-link to="/xenos/aeldari">
            <div class="army__card_image">
              <img
                src="/icons/aeldari-symbol.png"
              />
            </div>
            <div class="army__card_title title-white uppercase">
              <p>Aeldari</p>
            </div>
          </nuxt-link>
        </div>
      </div>

      <div class="button__container  my-5">
        <div class="army__card font-bebas">
          <nuxt-link to="/xenos/drukhari">
            <div class="army__card_image">
              <img
                src="/icons/drukhari-symbol.png"
              />
            </div>
            <div class="army__card_title title-white uppercase">
              <p>Drukhari</p>
            </div>
          </nuxt-link>
        </div>
      </div>

      <div class="button__container my-5 ">
        <div class="army__card font-bebas">
          <nuxt-link to="/xenos/genestealer-cults">
            <div class="army__card_image">
              <img
                src="/icons/gsc-symbol.png"
              />
            </div>
            <div class="army__card_title title-white uppercase">
              <p>Genestealer Cults</p>
            </div>
          </nuxt-link>
        </div>
      </div>

      <div class="button__container my-5 ">
        <div class="army__card font-bebas">
          <nuxt-link to="/xenos/leagues-of-votann">
            <div class="army__card_image">
              <img
                src="/icons/votann-symbol.png"
              />
            </div>
            <div class="army__card_title title-white uppercase">
              <p>Leagues of Votann</p>
            </div>
          </nuxt-link>
        </div>
      </div>

      <div class="button__container my-5 ">
        <div class="army__card font-bebas">
          <nuxt-link to="/xenos/necrons">
            <div class="army__card_image">
              <img
                src="/icons/necrons-symbol.png"
              />
            </div>
            <div class="army__card_title title-white uppercase">
              <p>Necrons</p>
            </div>
          </nuxt-link>
        </div>
      </div>

      <div class="button__container my-5 ">
        <div class="army__card font-bebas">
          <nuxt-link to="/xenos/orks">
            <div class="army__card_image">
              <img
                src="/icons/orks-symbol.png"
              />
            </div>
            <div class="army__card_title title-white uppercase">
              <p>Orks</p>
            </div>
          </nuxt-link>
        </div>
      </div>

      <div class="button__container my-5">
        <div class="army__card font-bebas">
          <nuxt-link to="/xenos/tau-empire">
            <div class="army__card_image">
              <img
                src="/icons/tau-symbol.png"
              />
            </div>
            <div class="army__card_title title-white uppercase">
              <p>Tau Empire</p>
            </div>
          </nuxt-link>
        </div>
      </div>

      <div class="button__container my-5">
        <div class="army__card font-bebas">
          <nuxt-link to="/xenos/tyranids">
            <div class="army__card_image">
              <img
                src="/icons/tyranid-symbol.png"
              />
            </div>
            <div class="army__card_title title-white uppercase">
              <p>Tyranids</p>
            </div>
          </nuxt-link>
        </div>
      </div>


    </div>
  </div>
</template>

<script setup></script>

<style scoped>
h2 {
  font-size: 50px;
  font-weight: 700;
  color: #191919;
  text-transform: uppercase;
  
}

.army__card {
  background-color: rgb(255, 255, 255);
  margin: 0 auto;
  width: 150px;
  height: 150px;
  border-radius: 6px;
  box-shadow: 5px 5px 30px 7px rgba(0, 0, 0, 0.15),
    -5px -5px 30px 7px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  transition: 0.4s;
  /* background-color: #fff; */
}

.army__card .army__card_image {
  width: 130px;
  height: 130px;
  border-radius: 40px;
  margin: 0 auto;
}

.army__card .army__card_image img {
  width: inherit;
  height: inherit;
  border-radius: 40px;
  object-fit: cover;
}

.army__card .army__card_title {
  text-align: center;
  border-radius: 0px 0px 40px 40px;

  margin-top: -15px;
  height: 40px;
}

.army__card:hover {
  transform: scale(1.1, 1.1);
  box-shadow: 5px 5px 30px 15px rgba(0, 0, 0, 0.25),
    -5px -5px 30px 15px rgba(0, 0, 0, 0.22);
  background-color: rgb(255, 255, 255);
}

.title-white {
  font-size: 20px;

  color: rgb(25, 25, 25);
}

.title-black {
  color: black;
}


</style>
