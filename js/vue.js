/*
 * @Author: Jackie
 * @Date: 2022-09-25 10:36:58
 * @LastEditTime: 2022-09-25 10:54:19
 * @LastEditors: Jackie
 * @Description: vue源码 - 刨析
 * @FilePath: /Vue-源码解析/vue.js
 * @version: 
 */
class Vue {
    constructor(options) {
        console.log(options);
        this.$el = document.querySelector(options.el);
        this.$data = options.data || {};
        this.compile(this.$el);
    };
    // 解析
    compile(node) {
        console.log('node:', node);
        node.childNodes.forEach((item, index) => {
            // 元素节点
            if (item.nodeType == 1) {
                this.compile(item);
            }

            // 文本节点 如果有{{}}就替换数据
            if (item.nodeType == 3) {
                // 正则匹配 {{}}
                let reg = /\{\{(.*?)\}\}/g;
                let text = item.textContent;
                // 给节点赋值
                item.textContent = text.replace(reg, (match, vmKey) => {
                    vmKey = vmKey.trim();
                    return this.$data[vmKey];
                });
            }
        });
    }
}