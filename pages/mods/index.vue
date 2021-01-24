<template>
  <div>
    <ModTable>
      <ModTableEntry v-for="mod in mods" :key="mod.name" :mod="mod" />
    </ModTable>
  </div>
</template>

<script>
export default {
  layout: 'panel',
  components: ['ModTable', 'ModTableEntry'],
  head: {
    title: 'Mods | Braze',
  },
  created() {
    this.$store.commit('panel/setTitle', 'Mods')
  },
  data() {
    return {
      mods: [
        {
          name: "GPS Block",
          author: "thatsimplekid",
          website: "https://git.ghxx.dev/thatsimplekid/GPSBlock",
          image: '/logo.png',
          latestversion: "1.0.2",
          versions: "3",
          status: "1",
          statustext: "Active",
          modpacks: "2"
        },
        {
          name: "Minecraft Forge",
          author: "The Forge Team",
          website: "http://files.minecraftforge.net/",
          image: 'https://avatars.githubusercontent.com/u/1390178?s=400&v=4',
          latestversion: "14.23.5.2854",
          versions: "1",
          status: "1",
          statustext: "Active",
          modpacks: "2"
        },
        {
          name: "OpenComputers",
          author: "Sangar_",
          website: "https://www.curseforge.com/minecraft/mc-mods/opencomputers",
          image: 'https://media.forgecdn.net/avatars/thumbnails/10/395/64/64/635455427535754713.png',
          latestversion: "1.12.2-1.7.5.192",
          versions: "1",
          status: "1",
          statustext: "Active",
          modpacks: "2"
        },
        {
          name: "ICBM Classic",
          author: "DarkGuardsman",
          website: "https://www.curseforge.com/minecraft/mc-mods/icbm-classic",
          image: 'https://media.forgecdn.net/avatars/thumbnails/158/79/64/64/636650198388393473.png',
          latestversion: "1.12.2-4.0.1b75",
          versions: "1",
          status: "1",
          statustext: "Active",
          modpacks: "1"
        },
        {
          name: "JEI",
          author: "mezz",
          website: "https://www.curseforge.com/minecraft/mc-mods/jei",
          image: 'https://media.forgecdn.net/avatars/thumbnails/29/69/64/64/635838945588716414.jpeg',
          latestversion: "4.16.1.302",
          versions: "1",
          status: "0",
          statustext: "MD5 Mismatch",
          modpacks: "1"
        }
      ]
    }
  }
}
</script>

<style>

</style>
