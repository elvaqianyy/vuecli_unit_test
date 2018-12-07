import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Counter from "@/components/Counter.vue";

describe("Counter.vue", () => {
  // 下面是测试单例
  // 1-text():主要显示浏览器上显示的文本，
  it("给初始值时---断言呈现的输出", () => {
    let value = 42;
    const wrapper = shallowMount(Counter, {
      propsData: {
        initialValue: value
      }
    });
    expect(wrapper.text()).to.include("Counter value: 42");
    // expect(WRAPPER方法调用).to.include(断言指向内容);
  });

  // 2-这里使用组件包装器的另一个方法html(),主要显示浏览器上显示的html
  it("未给初始值时", () => {
    const wrapper = shallowMount(Counter, {
      propsData: {}
    });
    expect(wrapper.html()).to.include(
      'Counter value: <span class="counter-value">0</span>'
    );
  });

  // 3-还可以通过组件包装器获取实例vm，引用来访问组件实例的数据属性，可直接访问其状态，计算块，方法等
  /**
   * 重写测试用例1---直接访问vm的data值
   *    *直接断言组件状态（数据属性），而不是呈现的输出，可根据需求做出选择
   *     只需断言包装器.vm.属性 的值符合预期即可。
   */
  it("给初始值时--断言组件状态", () => {
    let value = 42;
    const wrapper = shallowMount(Counter, {
      propsData: {
        initialValue: value
      }
    });
    const componentInstance = wrapper.vm;
    expect(componentInstance.value).to.be.equal(42);
    // expect(WRAPPER方法调用).to.be.equal(断言指向内容);
  });

  /**
   * 4-访问组件内部属性
   * 重写测试用例2---直接访问vm计算属性
   * 只需断言包装器.vm. computedname的值 符合预期即可。
   * 使用组件包装器的setProps和setData函数来更新其状态，并验证已按照预期重新计算 计算属性。
   */
});

describe("测试计算属性", () => {
  let wrapper;
  let componentInstance;
  // 测试钩子：在每个测试单例前生成一个组件包装器，然后形成vm实例
  beforeEach(() => {
    let value = 42;
    wrapper = shallowMount(Counter, {
      propsData: {
        initialValue: value
      }
    });
    componentInstance = wrapper.vm;
  });

  it("初始值经过计算后", () => {
    // 通过包装器的setData函数来更新状态，并验证计算属性是否等于预期值
    // expect(componentInstance.stringValue).to.be.eql("42");
    wrapper.setData({ value: 99 });
    expect(componentInstance.stringValue).to.be.equal("99");
  });
});


/**
 * 5-触发组件事件——通过包装器触发器
 */
describe("测试点击事件", () => {
  let wrapper;
  let componentInstance;
  let increaseButton;
  // 测试钩子：在每个测试单例前生成一个组件包装器，然后形成vm实例
  beforeEach(() => {
    wrapper = shallowMount(Counter, {
      propsData: { initialValue: 42 }
    });
    componentInstance = wrapper.vm;
    // 通过包装器的find()，拿到html中的button标签
    increaseButton = wrapper.find("button");
  });

  it("点击加1", () => {
    // 触发器，触发click事件
    increaseButton.trigger("click");
    expect(componentInstance.value).to.be.equal(43);
  });
});


/**
 * 6-触发组件事件——通过包装器实例直接调用组件内部方法
 */
// 如何不通过拿到button标签，触发点击事件，使value+1，而是直接通过对组件实例的引用直接调用某个方法使value+1
// 就像wrapper.vm.methodName(methodArgs)，进入组件内部，实际通过包装器来触发事件
describe("直接调用实例的方法测试", () => {
  let wrapper;
  let componentInstance;
  let increaseButton;

  beforeEach(() => {
    wrapper = shallowMount(Counter, {
      propsData: {
        initialValue: 42
      }
    });
    componentInstance = wrapper.vm;
    increaseButton = wrapper.find("button");
  });

  it("value值加1", () => {
    // 直接调用wrapper.vm的方法onIncrease();
    componentInstance.onIncrease();
    // 判断componentInstance.value是否等于期待值
    expect(componentInstance.value).to.be.equal(43);
  });

  /**
   * 7-测试组件发出的事件——比如组件本身发出事件，其他组件可以监听与响应这些事件（父子组件通信）
   */
  it("用一个新的value来触发父级事件", () => {
    increaseButton.trigger("click");
    expect(wrapper.emitted().increased.length).to.be.equal(1);
    // wrapper.emitted().increased是一个数组[]，可以用长度测试，也可以用某一项的值来测试
    expect(wrapper.emitted().increased[0]).to.be.eql([43]);
    /**
     *  tips：你可能想知道to.be.equal()和to.be.eql()之间的区别
     *  equal执行严格的相等比较，它要求两个值的类型相同，并且对象/数组指向相同的实例，如果它们是不同实例，就算属性相同，也会失败
     *  eql,你对简单值，也有效，但对于对象/数组，虽然它们是不同实例，但具有完全相同的属性，则会成功
     */
  });
});


/**
 * 8-测试路由属性
*/
describe("测试路由属性", () => {
  let wrapper;
  let componentInstance;
  beforeEach(() => {
    const mockRoute = { name: "foo"};
    wrapper = shallowMount(Counter, {
      mocks: {
        $route: mockRoute
      }
    });
    componentInstance = wrapper.vm;
  });
  it("返回路由参数name", () => {
    expect(componentInstance.currentRoute).to.be.eql("foo");
  });
});

// 剩下的之后如果碰到在扩增