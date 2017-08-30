<template>
  <div id="vue-dynamic-form">
  <form @submit.prevent="submitForm($event)">
    <div class="form-group" v-for="field in this.$props.fields">
      <label :for="field.name" class="control-label" v-text="field.label"></label>
      <textarea :value="defaultValue(field.name)" :id="field.name" :name="field.name" class="form-control" v-if="field.type === 'textarea' && field.html === false" :rows="field.rows ? field.rows : 10" :cols="field.cols ? field.cols : 30"></textarea>
      <trumbowyg :value="defaultValue(field.name)" :id="field.name" :name="field.name" class="form-control" v-else-if="field.type === 'textarea'"></trumbowyg>
      <select :name="field.name" class="form-control" :id="field.name" v-else-if="field.type === 'select'" :required="field.required ? field.required : false">
        <option v-if="field.options" :value="value" :selected="optionSelected(index, field.name, value)" v-for="(key, value, index) in field.options" v-text="key"></option>
      </select>
      <input :value="defaultValue(field.name)" :type="field.type" class="form-control" :name="field.name" :id="field.name" v-else :required="field.required ? field.required : false">
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
        fieldsData: {}
      }
    },
    props: {
      fields: {
        type: Array,
        default: () => null
      },
      entity: {
        type: Object,
        default: () => {}
      }
    },
    methods: {
      submitForm(data) {
        this.$emit('submit-form', data)
      },
      optionSelected(index, name, value) {
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
