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
