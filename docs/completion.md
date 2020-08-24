Pronouns.js provides automatic suggestions for partial inputs using the `pronouns.complete` function.

A [demo](https://katacarbix.github.io/pronouns.js/demo/index.html) is available which shows how this feature could be used.


**example input:** `she/her or th`  
**example results:**
```
she/her or they/.../themself
she/her or they/.../themselves
she/her or thon
```

**example input:** `fae ` (with trailing space)  
**example results:**
```
fae or
fae she
fae he
fae they/.../themself
fae ze/hir
...
```

**example input:** `ze`  
**example results:**
```
ze/hir
ze/zir
ze/zem
ze/mer
zee
```

**example input:** `ze/`  
**example results:**
```
ze/hir
ze/zir
ze/zem
ze/mer
```

**example input:** `ze/z`  
**example results:**
```
ze/zir
ze/zem
```
