/*The purpose of the component is to test TextBox component with the
custom search capability*/

<template>
<div>
    <text-box
    v-bind:endpoint_name="endpoint_name"
    @selectItem="item => handleSelectedItem(item)"
    ></text-box>
    <h3>In the array list</h3>
    <p>
        {{item_list}}
    </p>
</div>
</template>

<script>
/* eslint-disable */
import TextBox from '@/components/TextBox'

export default {
  name: 'TestTextBox',
  data () {
    return {
      item_list: [],
      endpoint_name: "players"
    }
  },
  methods: {
    sendRequest: function () {
      this.$http.get('test').then(response => {
        this.msg = response.body['message']
      }, response => {
        this.msg = 'Oh oh something gone wrong'
      })
  },
    handleSelectedItem: function(selected_item){
        console.log('hey guess what, I got the selected item!!', selected_item);
    }
},
  components: {
      textBox: TextBox
  }
}
</script>

<style scoped>
div {
    background-color: green;
}
</style>
