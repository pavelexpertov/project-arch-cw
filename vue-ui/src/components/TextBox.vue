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
/* eslint-disable */
export default {
    name: "TextBox",
    props: {
        endpoint_name: {
            type: String,
            required: true
        }
    },
    data: function() {
        return {
            textBoxInput: '',
            endpointName: this.endpoint_name
        }
    },
    methods: {
        performSearchQuery: function(queryString, callback_function){
            console.log("search query is", queryString)
            this.$http.get(this.endpointName + '/' + queryString).then(response=>{
                let returned_list = response.body.list || response.body;
                //console.log(returned_list);
                var generated_array = [];
                for(var index = 0; index < returned_list.length; ++index){
                    let doc = returned_list[index];
                    generated_array.push({value: doc.name || doc.fullname, selected_item: doc});
                }
                //console.log("generated array", generated_array);
                callback_function(generated_array);
            })
            .catch(err => {
                console.log(err)
                callback_function([]);
            });
        },
        handleSelect: function(selected_item){
            //console.log("That's what I selected", selected_item);
            this.$emit('selectItem', selected_item)
            this.textBoxInput = ''
        }
    }
}
</script>

<style scoped>
    /* background-color: ; */
</style>
