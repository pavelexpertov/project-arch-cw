<template>
    <div>
        <text-box
         :endpoint_name="endpointName"
         :editable_box="this.editable_list"
         @selectItem="item => handleSelectedItem(item)"
         >
        </text-box>
        <div>
            <player-item
                v-for="item in item_list"
                v-if="endpoint_name == 'players'"
                :key="item._id"
                :player_obj="item"
                :editable="editable_list"
                @deleteItem="item => deleteItem(item)"
            >
            </player-item>
            <user-item
                v-for="item in item_list"
                v-if="endpoint_name == 'users'"
                :key="item._id"
                :user_obj="item"
                @deleteItem="item => deleteItem(item)"
                @updateItem="item => updateItem(item)"
            >
            </user-item>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import TextBox from '@/components/TextBox'
import PlayerItem from '@/components/PlayerItem'
import UserItem from '@/components/UserItem'

export default {
  name: 'ItemList',
  props: {
    endpoint_name: {
      type: String,
      required: true
    },
    list_id: {
      type: String,
      required: true
      },
      editable_list: {
          type: Boolean,
          default: true
      }
  },
  data: function () {
    return {
      listId: this.list_id,
      endpointName: this.endpoint_name,
      item_list: []
    }
  },
  methods: {
    handleSelectedItem: function (selectedItem) {
      console.log('hey guess what, I got the selected item!!', selectedItem)
      selectedItem = selectedItem.selected_item
      let notDuplicateItem = true
      let length = this.item_list.length
      for (var index = 0; index < length; ++index) {
        let item = this.item_list[index]
        if (item._id === selectedItem._id) {
          notDuplicateItem = false
          break
        }
      }
      if (notDuplicateItem) {
        this.item_list.push(selectedItem)
        this.updateItemList()
      }
    },
    deleteItem: function (selectedItem) {
      console.log('something got delted', selectedItem)
      let newArray = this.item_list.filter(item => item !== selectedItem)
      this.item_list = newArray
      this.updateItemList()
    },
    updateItem: function (selectedItem) {
      console.log('something got updated', selectedItem)
      this.updateItemList()
    },
    updateItemList: function () {
      // generating formatted array
      let formattedArray = []
      var index = 0
      if (this.endpointName === 'players') {
        for (; index < this.item_list.length; ++index) { formattedArray.push({_id: this.item_list[index]._id}) }
      } else {
        for (; index < this.item_list.length; ++index) {
          let item = this.item_list[index]
          formattedArray.push({_id: item._id, edit_rights: item.edit_rights})
        }
      }
      let endpointName = this.endpointName + '_list/' + this.listId
      console.log(endpointName)
      console.log(formattedArray)
      this.$http.put(endpointName, formattedArray)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
  },
  mounted: function () {
    let endpointName = this.endpointName + '_list/' + this.listId
    this.$http.get(endpointName)
        .then(response => {
          console.log(response.body)
          let list = response.body.players_list || response.body.users_list
          this.item_list = list
        })
        .catch(err => console.log(err))
  },
  components: {
    TextBox: TextBox,
    userItem: UserItem,
    playerItem: PlayerItem
  }
}
</script>

<style scoped>
div {
    margin: auto;
    width: 600px;
    background-color: yellow;
}
</style>
