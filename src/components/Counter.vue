<template>
  <div>        
    Counter value: <span class="counter-value">{{ value }}</span>
    <br/>
    <button @click="onIncrease">Increase</button>
  </div>
</template>
<script>
export default {
  props: {
    initialValue: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      value: this.initialValue
    };
  },
  methods: {
    onIncrease() {
      this.value += 1;
      this.$emit("increased", this.value);
    },
    onNavigate(){
      this.$router.push({name: 'home'});
    },
  },
  computed: {
    currentRoute() {
      return this.$route.name;
    },
    stringValue() {
      return this.value.toString();
    }
  }
};
</script>
