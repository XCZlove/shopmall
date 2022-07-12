export default {
    addCart(context, payload) {
        return new Promise((reslove, reject) => {
            //查找是否有该商品
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
                //判断oldProduct
            if (oldProduct) {
                // oldProduct.count += 1
                context.commit('addCounter', oldProduct)
                reslove('当前商品数量+ 1')
            } else {
                payload.count = 1
                    //payload新添加的商品
                    // state.cartList.push(payload)
                context.commit('addToCart', payload)
                reslove('添加了新商品')
            }
        })
    }
}