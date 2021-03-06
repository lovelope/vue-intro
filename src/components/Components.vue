<template>
  <div class="components">
    <div>!important 组件的data字段必须是函数</div>
    <div class="global-component-demo">
      <global-component-demo />
    </div>
    <div class="local-component-demo">
      <local-component-demo />
    </div>
    <div class="restricted-element">
      <table>
        <tr is="my-row" />
      </table>
    </div>
    <div class="props">
      <div class="static">
        <local-component-demo message="hello" />
      </div>
      <div class="dynamic-props">
        <input v-model="parentMsg" />
        <br />
        <child :my-message="parentMsg" />
      </div>
      <div class="props-type">
        <p some-prop="1">This is a string type 1</p>
        <p :some-prop="1">This is a number type 1(v-bind表达式)</p>
      </div>
      <div class="unidirectional-data-stream">
        <div class="no-change-prop-in-child-comp">
          <child-counter :initial-counter="initialCounterFromParent" />
        </div>
        <div class="computed-props">
          <computed-prop :size="sizeFromParent" />
        </div>
      </div>
      <div class="props-validator">
        <div class="active">
          注意 props 会在组件实例创建之前进行校验，所以在 default 或 validator 函数里，
          诸如 data、computed 或 methods 等实例属性还无法使用。
        </div>
        <props-validator
          :prop-a="propAA"
          :prop-b="propBB"
          :prop-c="propCC"
          :prop-d="propDD"
          :prop-e="propEE"
          :prop-f="propFF"
        />
      </div>
      <div class="replace-prop">
        <p>
          例如，第三方组件 bs-date-input，当它要和一个 Bootstrap 插件互操作时，
          需要在这个第三方组件的 input 上添加 data-3d-date-picker 属性，
          这时可以把属性直接添加到组件上 (不需要事先定义 prop)：
          <br />&lt;bs-date-input data-3d-date-picker="true"&gt;&lt;/bs-date-input&gt;
          <br />添加属性 data-3d-date-picker="true" 之后，它会被自动添加到 bs-date-input 的根元素上
        </p>
        <p>class和style属性将会合并</p>
      </div>
    </div>
    <div class="v-on-bind-custom-events">
      <div class="counter-event-example">
        <p>合计：{{ total }}</p>
        <button-counter @increment="incrementTotal" />
        <button-counter @increment="incrementTotal" />
      </div>
    </div>
    <div class="custom-input-component">
      <my-checkbox v-model="foo" value="some value" />
      <p>foo: {{ foo }}</p>
    </div>
    <div class="non-parent-child-communication">
      <component-a />
      <component-b />
    </div>
    <div class="content-distribution-with-slots">
      <div class="single-slot">
        <div>
          <h1>我是父组件的标题</h1>
          <my-component-for-slot>
            <p>这是一些初始内容</p>
            <p>这是更多的初始内容</p>
          </my-component-for-slot>
        </div>
      </div>
      <div class="named-slots">
        <app-layout>
          <h1 slot="header">这里可能是一个页面标题</h1>
          <p>主要内容的一个段落</p>
          <p>主要内容的另一个段落</p>
          <p slot="footer">这里有一些联系信息</p>
        </app-layout>
      </div>
      <div class="scoped-slots">
        <div class="parent">
          <child-scoped>
            <template slot-scope="props">
              <span>hello from parent</span>
              <span>{{ props.text }}</span>
            </template>
          </child-scoped>
        </div>
        <div class="named-slots-list">
          <my-awesome-list :items="items">
            <template slot="item" slot-scope="props">
              <li class="my-fancy-item">{{ props.text }}</li>
            </template>
          </my-awesome-list>
        </div>
      </div>
    </div>
    <div class="dynamic-components">
      <dynamic-component :is="currentView" />
    </div>
    <div class="dynamic-components">
      <h1>非活动组件将被缓存</h1>
      <keep-alive>
        <dynamic-component :is="currentView" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

Vue.component('global-component-demo', {
  template: '<div>A global component demo</div>',
});

const Child = {
  template: '<div>A local component demo {{ message }}</div>',
  props: ['message'],
};

const childComponent = {
  template: '<span>{{ myMessage }}</span>',
  props: ['myMessage'],
};
const myRow = {
  template: '<tr>A local component demo -- my row</tr>',
};

const childCounter = {
  template: '<div>counter: {{ counter }}</div>',
  props: ['initialCounter'],
  data() {
    return {
      counter: this.initialCounter,
    };
  },
};

const computedProp = {
  template: '<div>normalizedSize: {{ normalizedSize }}</div>',
  props: ['size'],
  computed: {
    normalizedSize() {
      return this.size.trim().toLowerCase();
    },
  },
};

const propsValidator = {
  template:
    ''
    + '<table>\n'
    + '  <tr v-for="item in 6">\n'
    + '    <th>prop{{ String.fromCharCode(65 - 1 + item) }}</th>\n'
    + '    <td>{{ getProp(item) }}</td>\n'
    + '  </tr>\n'
    + '</table>'
    + '',
  data() {
    return {};
  },
  methods: {
    getProp(item) {
      return this[`prop${String.fromCharCode(65 - 1 + item)}`];
    },
  },
  props: {
    // 基础类型检测（‘null’意思是任何类型都可以）
    propA: Number,
    // 多种类型
    propB: [String, Number],
    // 必传并且是字符串
    propC: {
      type: String,
      required: true,
    },
    // 数字且有默认值
    propD: {
      type: Number,
      default: 100,
    },
    // 数组或对象的默认值应当由一个工厂函数返回
    propE: {
      type: Object,
      default() {
        return {
          message: 'Hello',
        };
      },
    },
    // 自定义验证函数
    propF: {
      validator(value) {
        return value > 10;
      },
    },
  },
};

const buttonCounter = {
  template: '<button @click="increment">total: {{ counter }}</button>',
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    increment() {
      const me = this;
      me.counter += 1;
      me.$emit('increment');
    },
  },
};

// TODO: Customizing-Component-v-model
const myCheckbox = {
  template: '<input type="checkbox" :value="value">',
  data() {
    return {};
  },
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: Boolean,
    value: String,
  },
};

const bus = new Vue();

const componentA = {
  template: '<button @click="selected">1</button>',
  data() {
    return {};
  },
  methods: {
    selected() {
      bus.$emit('id-selected', 1);
    },
  },
};

const componentB = {
  template: '<button>{{ index }}</button>',
  data() {
    return {
      index: 0,
    };
  },
  created() {
    const me = this;
    bus.$on('id-selected', (id) => {
      me.index = id;
    });
  },
};

const myComponentForSlot = {
  template:
    ''
    + '<div>\n'
    + '  <h2>我是子组件的标题</h2>\n'
    + '  <slot>只有在没有要分发的内容时才会显示</slot>\n'
    + '</div>'
    + '',
};

const appLayout = {
  template:
    ''
    + '<div class="container">\n'
    + '  <header>\n'
    + '    <slot name="header"></slot>\n'
    + '  </header>\n'
    + '  <main>\n'
    + '    <slot></slot>\n'
    + '  </main>\n'
    + '  <footer>\n'
    + '    <slot name="footer"></slot>\n'
    + '  </footer>\n'
    + '</div>'
    + '',
};

const childScoped = {
  template: `
    <div class="child">
      <slot text="hello from child"></slot>
    </div>`,
};

const myAwesomeList = {
  template: `
    <ul>
      <slot
        name="item"
        v-for="item in items"
        :text="item.text"
      >
        列表为空
      </slot>
    </ul>
  `,
  data() {
    return {};
  },
  props: ['items'],
};

export default {
  name: 'Components',
  components: {
    'local-component-demo': Child,
    'my-row': myRow,
    child: childComponent,
    'child-counter': childCounter,
    'computed-prop': computedProp,
    'props-validator': propsValidator,
    'button-counter': buttonCounter,
    'my-checkbox': myCheckbox,
    'component-a': componentA,
    'component-b': componentB,
    'my-component-for-slot': myComponentForSlot,
    'app-layout': appLayout,
    'child-scoped': childScoped,
    'my-awesome-list': myAwesomeList,

    home: {
      template: '<div>This is home page.</div>',
    },
    posts: {
      template: '<div>This is posts page.</div>',
    },
    archive: {
      template: '<div>This is archive page.</div>',
    },
  },
  data() {
    return {
      parentMsg: '',
      initialCounterFromParent: 66,
      sizeFromParent: '32EM',
      propAA: 33,
      propBB: '566',
      propCC: 'This is a string.',
      propDD: 666,
      propEE: {
        message: 'World',
      },
      propFF: 45,
      total: 0,
      foo: true,
      items: [
        {
          text: 'Hello1',
        },
        {
          text: 'Hello2',
        },
        {
          text: 'Hello3',
        },
      ],

      currentView: 'posts',
    };
  },
  methods: {
    incrementTotal() {
      this.total += 1;
    },
  },
};
</script>
