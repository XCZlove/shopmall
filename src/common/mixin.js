import { debounce } from '@/common/utils'
import BackTop from '@/components/content/backTop/BackTop'

export const itemListenerMixIn = {
    data() {
        return {
            itemListenr: null

        }
    },
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh, 200)
        this.itemListenr = () => {
            refresh()
        }
        this.$bus.$on('itemImageLoad', this.itemListenr)
            // console.log('我试试');
    }
}
export const backTopMixIn = {
    data() {
        return {
            isShowBackTop: false,
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0)
        },
    },
    components: {
        BackTop
    }
}