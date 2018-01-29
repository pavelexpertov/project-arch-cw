<template>
    <div class="item">
    <el-row>
        <el-col :span="15"><p>{{name}}</p></el-col>
        <el-col :span="9"><el-button @click="deletePlayer" type="danger" :disabled="!editable" class="button">Remove</el-button></el-col>
    </el-row>
    </div>
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

<style scoped>
.item {
    border: 2px solid grey;
    margin-bottom: 2px;
}
.button {
    margin-top: 6px;
}
</style>
