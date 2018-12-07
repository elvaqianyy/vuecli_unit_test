// 导入chai断言库方法expect
import { expect } from "chai";
// 导入vue自带test-utils中挂载方法shlowMount
import { shallowMount } from "@vue/test-utils";
// 导入组件HelloWorld
import HelloWorld from "@/components/HelloWorld.vue";

// 测试单页面
describe("HelloWorld.vue", () => {
  // 每个测试单页面下的测试单例
  it("renders props.msg when passed", () => {
    const msg = "new message";
    // shallowMount(组件，options)：组件挂载在一个虚拟dom上，返回一个wrapper包装器
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    // wrapper包装器的text()方法确保组件里呈现的html包含预期消息msg(包装器的文本函数)
    expect(wrapper.text()).to.include(msg);
  });

});
