<template>
    <el-row>
        <el-col :span="15"><p>{{name}}</p></el-col>
        <el-col :span="9"><el-button @click="deletePlayer" type="danger" :disabled="!editable">Remove</el-button></el-col>
    </el-row>
</template>

<script>
/* eslint-disable */
export default {
  name: 'PlayerItem',
  props: {
    player_obj: {
      type: Object
  },
  editable: {
      type: Boolean,
      default: true
  }
  },
  data: function () {
    return {
      playerObj: this.player_obj,
      name: this.player_obj.name
    }
  },
  methods: {
    deletePlayer: function () {
      this.$emit('deleteItem', this.playerObj)
    }
  }
}
</script>

<style>

</style>
