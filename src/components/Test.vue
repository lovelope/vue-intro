<template>
  <div class="test">
    <button :disabled="isButtonDisabled">Button</button>
    <p v-if="seen">Now you can see me.</p>
    <a :href="url">This is a link</a>
    <br>
    <a @click="doSomething">a to be a button</a>
    <p>Original url:{{ url | formatUrl(false, true) }}</p>
    <p>Reversed url:{{ reversedUrl }}</p>
    <p>now: {{ now }}</p>
    <p>full name: {{ fullName }}</p>
    <div class="watch">
      <p>
        <input v-model="question">
      </p>
      <p>{{ answer }}</p>
    </div>
    <div class="style">
      <div class="static" :class="{ active: isActive, agree: isAgree }" @click="changeStatus">{{ agreeMessage }}</div>
      <div :class="classObject">HAHAHHHHHHHHHHHHHHHHHHHHHHHHHAHAHAHHAHA</div>
      <div :class="[activeClass, errorClass]">YOHEIYOHEI</div>
      <div :class="[isActive ? activeClass : '', errorClass]">GGGGGGGGGGGGGGGG</div>
      <div :style="{ color: activeColor, fontSize: fontSize + 'px'}">bind style</div>
      <div :style="styleObject">styleObject</div>
      <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex']}">123 flex 321</div>
    </div>
    <div class="if">
      <h1 v-if="ok">Yes</h1>
      <h1 v-else>No</h1>
      <template v-if="ok">
        <h1>Title</h1>
        <p>Paragraph1</p>
        <p>Paragraph2</p>
      </template>
      <div v-if="seen">Now you can see me</div>
      <div v-else>Now you don't</div>
      <div v-if="type === 'A'">A</div>
      <div v-else-if="type === 'B'">B</div>
      <div v-else-if="type === 'C'">C</div>
      <div v-else>Not A/B/C</div>
    </div>
    <div class="for">
      <ul>
        <li v-for="(item, index) in items" :key="index">{{ item.message }}</li>
      </ul>
      <ul>
        <li v-for="(item, index) in items" :key="index">{{ index }} - {{ item.message }}</li>
      </ul>
      <ul>
        <template v-for="(item, index) in items">
          <li :key="index">{{ item.message }}</li>
          <li></li>
        </template>
      </ul>
      <ul>
        <li v-for="(value, key, index) in foreachObject" :key="index">{{ index }}. {{ key }} : {{ value }}</li>
      </ul>
      <todoItem></todoItem>
    </div>
    <div class="on">
      <div class="counter">
        <button @click="counter += 1">增加 1</button>
        <p>这个按钮被点击了{{ counter }}次</p>
      </div>
      <div class="greet">
        <button @click="greet">Greet</button>
      </div>
      <div class="inlineFunction">
        <button @click="say('hi')">Say hi</button>
        <button @click="say('what')">Say what</button>
      </div>
      <div class="callNativeDOM">
        <button @click="warn('Form cannot be submitted yet.', $event)">Submit</button>
      </div>
      <div class="eventModifier">
        <a @click.stop="doThis">阻止单击事件冒泡</a>
        <form @submit.prevent="onSubmit">提交事件不再重载页面</form>
        <a @click.stop.prevent="doThat">事件修饰符可以串联</a>
        <form @submit.prevent>只有事件修饰符</form>
        <div @click.capture="doThis">添加事件侦听器时使用事件捕获模式</div>
        <div @click.self="doThat">只当事件在该元素本身（比如不是子元素）触发时触发回调</div>
        <div @click.prevent.self>click.prevent.self阻止所有的点击</div>
        <div @click.self.prevent>click.self.prevent阻止元素上的点击</div>
        <a @click.once="doThis">click.once只会生效一次</a>
      </div>
      <div class="keyModifier">
        <!--当keyCode == 13时调用submit-->
        <input @keyup.13="submit">
        <input @keyup.enter="submit">
        <input @keyup.tab="submit">
        <input @keyup.delete="submit">
        <input @keyup.esc="submit">
        <input @keyup.space="submit">
        <input @keyup.up="submit">
        <input @keyup.down="submit">
        <input @keyup.left="submit">
        <input @keyup.right="submit">
        <!--通过Vue.config.keyCodes.f1 = 112自定义键值修饰符别名-->
        <input @keyup.f1="submit">
        <div>新键值 .ctrl .alt .shift .meta(Win,Mac,META)</div>
        <!-- Alt + C -->
        <input @keyup.alt.67="clear">
        <div @click.ctrl="doSomeThing">doSomeThing</div>
        <div>鼠标按键 .left .right .middle</div>
      </div>
    </div>
    <div class="form">
      <div class="singleLineText">
        <input v-model="singleLineText" placeholder="Edit me">
        <p>SingleLineText is: {{ singleLineText }}</p>
      </div>
      <div class="multiLineText">
        <textarea v-model="multiLineText" placeholder="Edit multi lines text"></textarea>
        <p style="white-space: pre-line">MultiLineText is: {{ multiLineText }}</p>
      </div>
      <div class="checkbox">
        <input type="checkbox" id="checkbox" v-model="checkedStatus">
        <label for="checkbox">{{ checkedStatus }}</label>
      </div>
      <div class="checkbox-array">
        <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
        <label for="jack">Jack</label>
        <input type="checkbox" id="john" value="John" v-model="checkedNames">
        <label for="john">John</label>
        <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
        <label for="mike">Mike</label>
        <br>
        <span>Checked Names: {{ checkedNames }}</span>
      </div>
      <div class="radio">
        <input type="radio" name="pickIt" id="one" value="One" v-model="picked">
        <label for="one">One</label>
        <input type="radio" name="pickIt" id="two" value="Two" v-model="picked">
        <label for="two">Two</label>
        <br>
        <span>Picked: {{ picked }}</span>
      </div>
      <div class="select">
        <select name="selectIt" id="selectIt" v-model="selected">
          <option disabled value="">请选择</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
        <span>Selected: {{ selected }}</span>
      </div>
      <div class="select-multiple">
        <select name="selectItNow" id="selectItNow" multiple v-model="selectedItems">
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
        <span>SelectedItems: {{ selectedItems }}</span>
      </div>
      <div class="select-multiple2">
        <select name="selectItNow" id="selectItNow2" multiple v-model="selectedItems2">
          <option v-for="option in options" :value="option.value" :key="option.value">{{ option.text }}</option>
        </select>
        <span>SelectedItems2: {{ selectedItems2 }}</span>
      </div>
      <div class="bind-value">
        <input type="checkbox" v-model="toggle" :true-value="a" :false-value="b">
        <span>toggle is: {{ toggle }}，当选中时toggle的值为a的值，未选中时toggle的值为b的值</span>
        <input type="radio" v-model="pick" :value="a">
        <span>pick is: {{ pick }}</span>
      </div>
      <div class="formModifier">
        <p>
          <input v-model.lazy="formModifier1">
          <span>formModifier1:{{ formModifier1 }} .lazy延时change</span>
        </p>
        <p>
          <input v-model.number="formModifier2">
          <span>formModifier2:{{ formModifier2 }} .number只接受数字</span>
        </p>
        <p>
          <input v-model.trim="formModifier3">
          <span>formModifier3:{{ formModifier3 }} .trim去除首尾空白字符</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import todoItem from '@/components/TodoItem'

export default {
  name: 'test',
  data () {
    return {
      isButtonDisabled: false,
      seen: true,
      url: 'HTTPS://WWW.BAIDU.COM/',
      firstName: 'Foo',
      lastName: 'Bar',
      question: '',
      answer: 'I cannot give you an answer until you ask a question',
      isActive: false,
      isAgree: false,
      error: null,
      agreeMessage: 'Click this button to agree',
      classObject: {
        active: false,
        'text-danger': true
      },
      activeClass: 'active',
      errorClass: 'text-danger',
      activeColor: 'red',
      fontSize: 30,
      styleObject: {
        color: 'red',
        fontSize: '24px'
      },

      ok: true,
      type: 'C',

      items: [
        {message: 'Foo'},
        {message: 'Bar'}
      ],

      foreachObject: {
        name: 'Liu Lan',
        gender: 'female',
        age: 34
      },

      counter: 0,

      singleLineText: '',
      multiLineText: '',
      checkedStatus: false,

      checkedNames: [],
      picked: '',
      selected: '',
      selectedItems: [],
      options: [
        {text: 'One', value: 'A'},
        {text: 'Two', value: 'B'},
        {text: 'Three', value: 'C'}
      ],
      selectedItems2: [],
      toggle: '',
      a: 100,
      b: 200,
      pick: '',

      formModifier1: '',
      formModifier2: '',
      formModifier3: ''
    }
  },
  components: {todoItem},
  computed: {
    reversedUrl: function () {
      let url = this.url
      if (!url) {
        url = ''
      }
      return url.toString().toLowerCase().split('').reverse().join('')
    },
    now: function () {
      return Date.now()
    },
    fullName: {
      get: function () {
        return this.firstName + ' ' + this.lastName
      },
      set: function (newValue) {
        var names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length -1]
      }
    },
    classObjectNew: function () {
      return {
        active: this.isActive && !this.error,
        'text-danger': this.error && this.error.type === 'fatal'
      }
    }
  },
  watch: {
    question: function (newQuestion) {
      let me = this
      me.answer = 'Waiting for you to stop typing...'
      me.getAnswer()
    }
  },
  methods: {
    doSomething: function (event) {
      window.alert('U clicked me!!! <' + event.target.tagName.toLowerCase() + '>')
    },
    getAnswer: function () {
      let me = this
      if (me.question.indexOf('?') === -1) {
        me.answer = 'Questions usually contain a question mark. ;-)'
        return
      }
      me.answer = 'Thinking...'
      setTimeout(function () {
        me.answer = (Math.random() > 0.5) ? 'yes' : 'no'
      }, 500)
    },
    changeStatus: function () {
      let me = this
      me.isActive = !me.isActive
      me.isAgree = !me.isAgree
      me.agreeMessage = me.isAgree ? 'You have agreed to this clause.' : 'Click this button to agree'
    },
    greet: function (event) {
      window.alert(`Hello, ${this.fullName}!`)
      if (event) {
        window.alert(event.target.tagName)
      }
    },
    say: function (message) {
      window.alert(message)
    },
    warn: function (message, event) {
      if (event) {
        event.preventDefault()
      }
      window.alert(message)
    }
  },
  filters: {
    formatUrl: function (url, isLowerCase, isUtf8) {
      if (!url) {
        url = ''
      }
      url = url.toString()
      if (!isLowerCase) {
        url = url.toLowerCase()
      }
      if (isUtf8) {
        url = encodeURI(url)
      }
      return url
    }
  },
}
</script>

<style scoped>
  button {
  padding: 0;
  width: 80%;
  height: 3em;
  line-height: 3em;
  border-radius: 100px;
}
  a {
  display: block;
  border: solid 1px #2c3e50;
  background: #42b983;
}
  .static {
  width: 100%;
  height: 3em;
  border: solid 1px #2c3e50;
}
  .active {
  background: #42b983;
  color: #f00;
}
  .agree {
  background: #42b983;
  color: #0ff;
}
  .text-danger {
  color: #f60;
  font-weight: bold;
}
</style>
