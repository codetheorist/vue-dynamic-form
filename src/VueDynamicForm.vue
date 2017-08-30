<template>
  <div id="vue-dynamic-form">
  <form @submit.prevent="submitForm($event)">
    <div class="checkbox" v-for="field in this.$props.fields" v-if="field.type === 'checkboxes'">
      <label for="" v-if="field.options" v-for="(option, index) in field.options">
        <input v-model="fieldData[field.name]" type="checkbox" :name="field.name" :label="option.name" :checked="optionSelected(index, field.name, option.value)" :value="option.value"> {{ option.name }}
      </label>
    </div>
    <div class="form-group" v-else>
      <label :for="field.name" class="control-label" v-text="field.label"></label>
      <textarea v-model="fieldData[field.name]" :value="defaultValue(field.name)" :id="field.name" :name="field.name" class="form-control" v-if="field.type === 'textarea' && field.html === false" :rows="field.rows ? field.rows : 10" :cols="field.cols ? field.cols : 30"></textarea>
      <trumbowyg v-model="fieldData[field.name]" :value="defaultValue(field.name)" :id="field.name" :name="field.name" class="form-control" v-else-if="field.type === 'textarea'"></trumbowyg>
      <select v-model="fieldData[field.name]" :name="field.name" class="form-control" :id="field.name" v-else-if="field.type === 'select'" :required="field.required ? field.required : false">
        <option v-if="field.options" :value="option.value" :selected="optionSelected(index, field.name, field.value)" v-for="(option, index) in field.options" v-text="option.name"></option>
      </select>
      <input v-model="fieldData[field.name]" :value="defaultValue(field.name)" type="text" class="form-control" :name="field.name" :id="field.name" v-else-if="field.type === 'text'" :required="field.required ? field.required : false">
      <input v-model="fieldData[field.name]" :value="defaultValue(field.name)" type="password" class="form-control" :name="field.name" :id="field.name" v-else-if="field.type === 'password'" :required="field.required ? field.required : false">
      <input v-model="fieldData[field.name]" :value="defaultValue(field.name)" type="email" class="form-control" :name="field.name" :id="field.name" v-else-if="field.type === 'email'" :required="field.required ? field.required : false">
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-primary">Update Menu Item</button>
    </div>
  </form>
  </div>
</template>
<script>
  import Trumbowyg from 'vue-trumbowyg';
  export default {
    name: 'vue-dynamic-form',
    components: {
      Trumbowyg
    },
    data (){
      return {
        newBody: '',
        fieldData: [],
        checkboxData: []
      }
    },
    props: {
      fields: {
        type: Array,
        default: () => null
      },
      entity: {
        type: Object,
        default: () => null
      }
    },
    mounted () {
      this.checkedBoxes();
    },
    methods: {
      checkedBoxes() {
        var fieldData = []
        if (this.$props.fields) {
          for (var i=0, iLen=this.$props.fields.length; i<iLen; i++) {
            if (this.$props.fields[i].type === 'text') {
              fieldData[this.$props.fields[i].name] = ''
            } else if (this.$props.fields[i].type === 'select') {
              fieldData[this.$props.fields[i].name] = ''
            } else if (this.$props.fields[i].type === 'checkboxes') {
              fieldData[this.$props.fields[i].name] = []
            } else if (this.$props.fields[i].type === 'textarea') {
              fieldData[this.$props.fields[i].name] = ''
            }
          }
          if (this.$props.entity) {
            var that = this

            Object.keys(this.$props.entity).forEach(function(key,index) {
              fieldData[key] = that.$props.entity[key]
            });
          }
        }
        this.fieldData = fieldData
      },
      submitForm(data) {
        this.$emit('submit-form', this.fieldData)
      },
      optionSelected(index, name, value) {
        if (Array.isArray(this.$props.entity[name]) && this.$props.entity[name].indexOf(value)) {
          return true
        }
        if (this.$props.entity && this.$props.entity[name] && this.$props.entity[name] === value) {
          return true
        } else if (!this.$props.entity && index === 0) {
          return true
        }
        return false
      },
      defaultValue(name) {
        if (this.$props.entity && this.$props.entity[name]) {
          return this.$props.entity[name]
        } else {
          return;
        }
      }
    }
  }
</script>
<style>
  .trumbowyg-box {
    margin-top: 0;
  }
</style>
