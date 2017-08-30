# Vue Dynamic Form

## Installation

To install Vue Dynamic Form, simply run `npm install vue-dynamic-form --save`. This will install Vue Dynamic Form as a Node module, ready for you to import into your projects.

Alternatively, you can manually download and include the JS file manually from the Github repository.

## Usage

To use Vue Dynamic Form, simply import the component using `import VueDynamicComponent from 'vue-dynamic-component'` and add the custom element to your form wrapper, like so:

```
<template>
    <div id="form-wrapper">
        <vue-dynamic-form @submit-form="submitForm" :fields="fields" :entity="entity"></vue-dynamic-form>
    </div>
</template>
```

The component takes 2 props - the fields prop which is a required prop and the entity prop, which is optional and should provide the default values for the form. 

The component also emits a `submit-form` event, as seen above. Setup a method in your form wrapper component to process the submitted data like follows:

```
<script>
    export default {
        name: 'form-wrapper',
        data () {
            return {
                ...
            }
        },
        methods: {
            submitForm(value) {
                console.log(value)
            }
        }
    }
</script>
```

The `value` variable contains an array of key/value pairs of your form data, to process however you choose. The example above will simply print the array to the console.

## Complete Single File Component Example

Below is a sample Single File Component for VueJS, that gives an example of what the fields prop and the entity prop should contain, as well as an example submit handler that simply logs the form data:

```
<template>
    <div id="form-wrapper">
        <vue-dynamic-form @submit-form="submitForm" :fields="fields" :entity="entity"></vue-dynamic-form>
    </div>
</template>
<script>
  import VueDynamicForm from 'vue-dynamic-form'
  export default {
    name: 'edit-form-tester',
    methods: {
      submitForm(data) {
        console.log(data)
      }
    },
    data () {
      return {
        fields: [
          {
            name: 'title',
            label: 'Title',
            type: 'text'
          },
          {
            name: 'yes-no',
            label: 'Yes or No?',
            type: 'select',
            options: {
              yes: 'Yes',
              no: 'No'
            }
          },
          {
            name: 'body',
            label: 'Body',
            type: 'textarea',
            rows: 8,
            cols: 30
          }
        ],
        entity: {
          'yes-no': 'yes',
          body: '<p>Welcome to paradise</p><p>Have another paragraph on me.</p>',
          title: 'Hello World'
        }
      }
    },
    components: {
      VueDynamicForm
    }
  }
</script>
```
