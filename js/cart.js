new Vue({
    el: '#app',
    data: {
        totalMoney: 0,
        productList: [],
        checkAllFlag: false
    },
    // 局部过滤器
    filters: {
        formatMoney: function(value) {
            return '￥ '+value.toFixed(2)
        }
    },
    mounted: function() {
        this.$nextTick(function() {
            this.cartView();
        })
    },
    methods: {
        cartView: function() {
            this.$http.get('data/cartData.json').then((res) => {
                this.productList = res.data.result.list;
                this.totalMoney = res.data.result.totalMoney;
            })
        },
        changeMoney: function(product, way) {
            if (way > 0) {
                product.productQuentity++;
            } else {
                product.productQuentity--;
                if (product.productQuentity < 1) {
                    product.productQuentity = 1
                }
            }
        },
        selectedProduct: function(item) {
            if (typeof item.checked == 'undefined') {
                // Vue.set(item, 'checked', true)
                this.$set(item, 'checked', true)
            } else {
                item.checked = !item.checked;
            }
        },
        checkAll: function() {
            this.checkAllFlag = !this.checkAllFlag;
            this.productList.forEach((item, index) => {
                if (typeof item.checked == 'undefined') {
                    this.$set(item, 'checked', this.checkAllFlag);
                } else {
                    item.checked = this.checkAllFlag;
                }
            })
        }
    }
})

// 全局过滤器
Vue.filter('money', function(value, type) {
    return '￥ '+value.toFixed(2) + type;
})