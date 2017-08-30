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

## Example Data

To get a form wrapper setup and working quickly, copy the following code into a Vue component:

```
  import VueDynamicForm from 'vue-dynamic-form'
  export default {
    name: 'edit-form-tester',
    methods: {
      submitForm(data) {
        var kvpairs = [];
        var form = data.target
        var elements = form.elements
        var arr = document.getElementsByClassName('t*');
        var re = new RegExp('(^|\\s)trumbowyg(\\s|$)');
        var result = [];
        var string = "foo",
            substring = "trumbowyg";
        for (var i=0, iLen=elements.length; i<iLen; i++) {
          if (elements[i].className.includes('trumbowyg') && elements[i].className.includes('form-control') && !elements[i].className.includes('btn')) {
            kvpairs[elements[i].name] = elements[i].value
          } else if (!elements[i].className.includes('trumbowyg') && !elements[i].className.includes('btn')) {
            kvpairs[elements[i].name] = elements[i].value
          }
        }

        console.log(result)

        // Array.from(elements).forEach(v=>{
        //   console.log(v)
        // })
        // for ( var i = 0; i < form.elements.length; i++ ) {
        //    var e = form.elements[i];
        //    kvpairs.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value));
        // }
        // var queryString = kvpairs.join("&");
        // // console.log(data)
        console.log(kvpairs)
        // console.log(form.elements)
        // elements.forEach(compileFormData)
        // function compileFormData(item, index, arr) {
        // console.log(item)
        // console.log(index)
        // console.log(arr)
        // }
        // for (element, value, index in form.elements) {
        //   if (element.indexOf('.trumbowyg') !== -1) {
        //     console.log('True')
        //   }
        // }
        // console.log(arr)
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
```
