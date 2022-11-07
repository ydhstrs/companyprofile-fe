// template
<template>
    <v-btn class="filter-button" :class="{toggled: isToggled}" @click="isToggled = !isToggled">
  <slot></slot>
</v-btn>
</template>
// script
<script>
export default {
  data: function () {
    return {
      isToggled: false
    }
  }
}
</script>

