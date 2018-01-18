<template>
    <div>
        <text-box
         :endpoint_name="endpointName"
         @selectItem="item => handleSelectedItem(item)"
         >
        </text-box>
        <div>
            <player-item
                v-for="item in item_list"
                v-if="endpoint_name == 'players'"
                :key="item._id"
                :player_obj="item"
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
        }
    },
    data: function(){
        return {
            listId: this.list_id,
            endpointName: this.endpoint_name,
            item_list: [{_id: "234234", fullname: "pav", name: "pav"},
                        {_id: "873632", fullname: "sasha", name: "sasha"},
                        {_id: "9292929", fullname: "hd", name: "hd"},
                        ]
        }
    },
    methods: {
        handleSelectedItem: function(selected_item){
            console.log('hey guess what, I got the selected item!!', selected_item);
            selected_item = selected_item.selected_item
            let notDuplicateItem = true;
            let length = this.item_list.length
            for(var index = 0; index < length; ++index){
                let item = this.item_list[index]
                if(item._id === selected_item._id){
                    notDuplicateItem = false;
                    break;
                }
            }
            if(notDuplicateItem){
                this.item_list.push(selected_item)
                this.updateItemList()
            }
        },
        deleteItem: function(selected_item){
            console.log("something got delted", selected_item);
            let new_array = this.item_list.filter(item => item !== selected_item);
            this.item_list = new_array
            this.updateItemList()
        },
        updateItem: function(selected_item){
            console.log("something got updated", selected_item);
        },
        updateItemList: function(){
            //generating formatted array
            let formatted_array = [];
            if(this.endpointName === "players"){
                for(var index = 0; index < this.item_list.length; ++index)
                    formatted_array.push({_id: this.item_list[index]._id});
                }
            else{
                for(var index = 0; index < this.item_list.length; ++index){
                    let item = this.item_list[index]
                    formatted_array.push({_id: item._id, edit_rights: item.edit_rights});
                }
            }
            let endpoint_name = this.endpointName + "_list/" + this.listId
            console.log(endpoint_name);
            console.log(formatted_array)
            this.$http.put(endpoint_name, formatted_array)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        }
    },
    mounted: function(){
        let endpoint_name = this.endpointName + '_list/' + this.listId;
        this.$http.get(endpoint_name)
        .then(response => {
            console.log(response.body)
            let list = response.body.players_list || response.body.users_list;
            this.item_list = list;
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
