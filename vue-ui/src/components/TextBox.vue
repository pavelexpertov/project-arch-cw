<template>
<div>
    <el-autocomplete v-model="textBoxInput"
    :fetch-suggestions="performSearchQuery"
    :trigger-on-focus="false"
    placeholder="Search"
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
    }
  },
  data: function () {
    return {
      textBoxInput: '',
      endpointName: this.endpoint_name
    }
  },
  methods: {
    performSearchQuery: function (queryString, callbackFunction) {
      console.log('search query is', queryString)
      this.$http.get(this.endpointName + '/' + queryString).then(response => {
        let returnedList = response.body.list || response.body
                // console.log(returnedList);
        var generatedArray = []
        for (var index = 0; index < returnedList.length; ++index) {
          let doc = returnedList[index]
          generatedArray.push({value: doc.name || doc.fullname, selected_item: doc})
        }
                // console.log("generated array", generatedArray);
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
