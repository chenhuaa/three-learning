<template>
  <div>

    <button @click="insert">Insert at random index</button>
    <button @click="reset">Reset</button>
  
    <TransitionGroup tag="ul" name="fade" class="container">
      <li v-for="item in items" class="item" :key="item">
        {{ item }}
        <button @click="remove(item)">x</button>
      </li>
    </TransitionGroup>
  </div>
</template>

<script setup>
  export default {
    name: 'cus-list',
    data() {
      return {
        getInitialItems: [1, 2, 3, 4, 5],
        items: [1, 2, 3, 4, 5],
        id: 6
      }
    },
    methods: {
      insert() {
        const i = Math.round(Math.random() * this.items.length)
        this.items.splice(i, 0, this.id++)
      },
      reset() {
        this.items = this.getInitialItems
        this.id = this.items.length + 1
      },
      remove(item) {
        const i = this.items.indexOf(item)
        if (i > -1) {
          this.items.splice(i, 1) 
        }
      }
    }
  }  
</script>

<style>
  .container {
    position: relative;
    padding: 0;
    list-style-type: none;
  }
  
  .item {
    width: 100%;
    height: 30px;
    background-color: #f3f3f3;
    border: 1px solid #666;
    box-sizing: border-box;
  }
  
  /* 1. 声明过渡效果 */
  .fade-move,
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  }
  
  /* 2. 声明进入和离开的状态 */
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: scaleY(0.01) translate(30px, 0);
  }
  
  /* 3. 确保离开的项目被移除出了布局流
        以便正确地计算移动时的动画效果。 */
  .fade-leave-active {
    position: absolute;
  }
</style>
