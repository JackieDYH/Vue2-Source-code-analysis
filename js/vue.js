/*
 * @Author: Jackie
 * @Date: 2022-09-25 10:36:58
 * @LastEditTime: 2022-09-25 11:12:35
 * @LastEditors: Jackie
 * @Description: vue源码 - 刨析
 * @FilePath: /Vue-源码解析/js/vue.js
 * @version: 
 */
class Vue {
    constructor(options) {
        console.log(options);
        if (typeof options.beforeCreate == 'function') {
            options.beforeCreate.bind(this)();
        }
        // data挂载 数据
        this.$data = options.data || {};
        if (typeof options.created == 'function') {
            options.created.bind(this)();
        }
        if (typeof options.beforeMount == 'function') {
            options.beforeMount.bind(this)();
        }
        // el挂载 节点
        this.$el = document.querySelector(options.el);
        // 模板解析
        this.compile(this.$el);
        if (typeof options.mounted == 'function') {
            options.mounted.bind(this)();
        }
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