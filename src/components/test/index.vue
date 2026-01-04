<template>
  <div
    ref="resizableDiv"
    class="resizable"
    @mousedown="onMouseDown"
    :style="divStyle"
  >
    <div class="resizer" @mousedown="onResizeMouseDown"></div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';

const resizableDiv = ref(null);
const startPos = reactive({ x: 0, y: 0 });
const divSize = reactive({ width: 200, height: 200 });
const divPos = reactive({ left: 100, top: 100 });

const divStyle = computed(() => ({
  width: `${divSize.width}px`,
  height: `${divSize.height}px`,
  left: `${divPos.left}px`,
  top: `${divPos.top}px`,
  position: 'absolute',
}));

const onMouseDown = (e) => {
  startPos.x = e.clientX;
  startPos.y = e.clientY;
  
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

const onMouseMove = (e) => {
  // const dx = e.clientX - startPos.x;
  // const dy = e.clientY - startPos.y;
  
  // let newLeft = divPos.left + dx;
  // let newTop = divPos.top + dy;
  
  // // Get screen dimensions
  // const screenWidth = window.innerWidth;
  // const screenHeight = window.innerHeight;
  
  // // Get div dimensions
  // const divWidth = divSize.width;
  // const divHeight = divSize.height;
  
  // // Adjust position to prevent exceeding screen bounds
  // if (newLeft < 0) newLeft = 0;
  // if (newTop < 0) newTop = 0;
  // if (newLeft + divWidth > screenWidth) newLeft = screenWidth - divWidth;
  // if (newTop + divHeight > screenHeight) newTop = screenHeight - divHeight;
  
  // divPos.left = newLeft;
  // divPos.top = newTop;
  
  // startPos.x = e.clientX;
  // startPos.y = e.clientY;
};

const onMouseUp = () => {
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
};

const onResizeMouseDown = (e) => {
  e.stopPropagation();
  
  startPos.x = e.clientX;
  startPos.y = e.clientY;
  
  document.addEventListener('mousemove', onResizeMouseMove);
  document.addEventListener('mouseup', onResizeMouseUp);
};

const onResizeMouseMove = (e) => {
  const dx = e.clientX - startPos.x;
  const dy = e.clientY - startPos.y;
  
  let newWidth = divSize.width + dx;
  let newHeight = divSize.height + dy;
  
  // Set minimum size
  if (newWidth < 50) newWidth = 50;
  if (newHeight < 50) newHeight = 50;
  
  divSize.width = newWidth;
  divSize.height = newHeight;
  
  startPos.x = e.clientX;
  startPos.y = e.clientY;
};

const onResizeMouseUp = () => {
  document.removeEventListener('mousemove', onResizeMouseMove);
  document.removeEventListener('mouseup', onResizeMouseUp);
};


onMounted(() => {
  const div = resizableDiv.value;
  if (div) {
    // Initialize any setup if needed
  }
});
</script>

<style>
.resizable {
  border: 1px solid #000;
  background: #eee;
  cursor: move;
  position: absolute;
}

.resizer {
  width: 10px;
  height: 10px;
  background: #333;
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: se-resize;
}
</style>
