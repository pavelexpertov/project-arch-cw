<template>
<div>
    <el-autocomplete v-model="textBoxInput"
    :fetch-suggestions="performSearchQuery"
    :trigger-on-focus="false"
    placeholder="Search"
    :disabled="!editable_box"
    @select="handleSelect">
        <el-button slot="append" icon="el-icon-search"></el-button>
    </el-autocomplete>
</div>
</template>

<script>
export default {
  name: 'TextBox',
  props: {
    endpoint_name: {
      type: String,
      required: true
    },
    editable_box: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      textBoxInput: '',
      endpointName: this.endpoint_name
      // editable: this.editable_box
    }
  },
  /* computed: {
   editable: function(){
       return this.editable_box
   }
  }, */
  methods: {
    performSearchQuery: function (queryString, callbackFunction) {
      console.log('search query is', queryString)
      this.$http.get(this.endpointName + '/' + queryString).then(response => {
        let returnedList = response.body.list || response.body
        var generatedArray = []
        for (var index = 0; index < returnedList.length; ++index) {
          let doc = returnedList[index]
          generatedArray.push({value: doc.name || doc.fullname, selected_item: doc})
        }
        callbackFunction(generatedArray)
      })
      .catch(err => {
        console.log(err)
        callbackFunction([])
      })
    },
    handleSelect: function (selectedItem) {
            // If it's users endpoint, insert default edit rights data
      if (this.endpointName === 'users') {
        selectedItem.selected_item.edit_rights = {
          'players_list': false,
          'todo_list': false
        }
      }
      console.log(selectedItem)
      this.$emit('selectItem', selectedItem)
      this.textBoxInput = ''
    }
  }
}
</script>

<style scoped>
    /* background-color: ; */
</style>
