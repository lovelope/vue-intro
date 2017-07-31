<template>
  <div class="components">
    <div>!important 组件的data字段必须是函数</div>
    <div class="global-component-demo">
      <global-component-demo></global-component-demo>
    </div>
    <div class="local-component-demo">
      <local-component-demo></local-component-demo>
    </div>
    <div class="restricted-element">
      <table>
        <tr is="my-row"></tr>
      </table>
    </div>
    <div class="props">
      <div class="static">
        <local-component-demo message="hello"></local-component-demo>
      </div>
      <div class="dynamic-props">
        <input v-model="parentMsg">
        <br>
        <child :my-message="parentMsg"></child>
      </div>
      <div class="props-type">
        <p some-prop="1">This is a string type 1</p>
        <p :some-prop="1">This is a number type 1(v-bind表达式)</p>
      </div>
      <div class="unidirectional-data-stream">
        <div class="no-change-prop-in-child-comp">
          <child-counter :initialCounter="initialCounterFromParent"></child-counter>
        </div>
        <div class="computed-props">
          <computed-prop :size="sizeFromParent"></computed-prop>
        </div>
      </div>
      <div class="props-validator">
        <div class="active">注意 props 会在组件实例创建之前进行校验，所以在 default 或 validator 函数里，诸如 data、computed 或 methods 等实例属性还无法使用。</div>
        <props-validator
          :propA="propAA"
          :propB="propBB"
          :propC="propCC"
          :propD="propDD"
          :propE="propEE"
          :propF="propFF"
          ></props-validator>
      </div>
      <div class="replace-prop">
        <p>例如，第三方组件 bs-date-input，当它要和一个 Bootstrap 插件互操作时，需要在这个第三方组件的 input 上添加 data-3d-date-picker 属性，这时可以把属性直接添加到组件上 (不需要事先定义 prop)：
          <br>
          &lt;bs-date-input data-3d-date-picker="true"&gt;&lt;/bs-date-input&gt;
          <br>
          添加属性 data-3d-date-picker="true" 之后，它会被自动添加到 bs-date-input 的根元素上</p>
        <p>class和style属性将会合并</p>
      </div>
    </div>
    <div class="v-on-bind-custom-events">
      <div class="counter-event-example">
        <p>合计：{{ total }}</p>
        <button-counter @increment="incrementTotal"></button-counter>
        <button-counter @increment="incrementTotal"></button-counter>
      </div>
    </div>
    <div class="custom-input-component">
      <my-checkbox
        v-model="foo"
        value="some value"
      ></my-checkbox>
      <p>foo: {{ foo }}</p>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'

Vue.component('global-component-demo', {
  template: '<div>A global component demo</div>'
})

let Child = {
  template: '<div>A local component demo {{ message }}</div>',
  props: [
    'message'
  ]
}

let childComponent = {
  template: '<span>{{ myMessage }}</span>',
  props: [
    'myMessage'
  ]
}
let myRow = {
  template: '<tr>A local component demo -- my row</tr>'
}

let childCounter = {
  template: '<div>counter: {{ counter }}</div>',
  props: [
    'initialCounter'
  ],
  data: function () {
    return {
      counter: this.initialCounter
    }
  }
}

let computedProp = {
  template: '<div>normalizedSize: {{ normalizedSize }}</div>',
  props: [
    'size'
  ],
  computed: {
    normalizedSize: function () {
      return this.size.trim().toLowerCase()
    }
  }
}

let propsValidator = {
  template: '' +
    '<table>\n' +
    '  <tr v-for="item in 6">\n' +
    '    <th>prop{{ String.fromCharCode(65 - 1 + item) }}</th>\n' +
    '    <td>{{ getProp(item) }}</td>\n' +
    '  </tr>\n' +
    '</table>' +
    '',
  data () {
    return {
    }
  },
  methods: {
    getProp: function (item) {
      return this['prop' + String.fromCharCode(65 - 1 + item)]
    }
  },
  props: {
    // 基础类型检测（‘null’意思是任何类型都可以）
    propA: Number,
    // 多种类型
    propB: [String, Number],
    // 必传并且是字符串
    propC: {
      type: String,
      required: true
    },
    // 数字且有默认值
    propD: {
      type: Number,
      default: 100
    },
    // 数组或对象的默认值应当由一个工厂函数返回
    propE: {
      type: Object,
      default: function () {
        return {
          message: 'Hello'
        }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        return value > 10
      }
    }
  }
}

let buttonCounter = {
  template: '<button @click="increment">total: {{ counter }}</button>',
  data () {
    return {
      counter: 0
    }
  },
  methods: {
    increment: function () {
      let me = this
      me.counter += 1
      me.$emit('increment')
    }
  }
}

let myCheckbox = {
  template: '<input type="checkbox" :value="value" @change="$emit(change)">',
  data () {
    return {
    }
  },
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean,
    value: String
  }
}

export default {
  name: 'components',
  data () {
    return {
      parentMsg: '',
      initialCounterFromParent: 66,
      sizeFromParent: '32EM',
      propAA: 33,
      propBB: '566',
      propCC: 'This is a string.',
      propDD: 666,
      propEE: {
        message: 'World'
      },
      propFF: 45,
      total: 0,
      foo: true
    }
  },
  components: {
    'local-component-demo': Child,
    'my-row': myRow,
    'child': childComponent,
    'child-counter': childCounter,
    'computed-prop': computedProp,
    'props-validator': propsValidator,
    'button-counter': buttonCounter,
    'my-checkbox': myCheckbox
  },
  methods: {
    incrementTotal: function () {
      this.total += 1
    }
  }
}
</script>
