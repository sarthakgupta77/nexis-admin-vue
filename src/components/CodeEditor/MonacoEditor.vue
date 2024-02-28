<script setup>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { ref, onMounted } from 'vue'
// @ts-ignore
import customLangMonarch from './custom-lang-monarch'

monaco.languages.register({ id: 'custom' })
monaco.languages.setMonarchTokensProvider('custom', customLangMonarch)

const editor = ref()

onMounted(() => {
    monaco.editor.create(editor.value, {
        value: `// Type source code in your language here...
class MyClass {
  @attribute
  void main() {
    Console.writeln( "Hello Monarch world\n");
  }
}`,
        language: 'custom',
    })
})
</script>

<template>
    <div class="q-pa-md q-gutter-sm">
        <div id="editor" ref="editor"></div>
    </div>
</template>

<style scoped>
#editor {
    width: 80vw;
    height: 100vh;
}
</style>
