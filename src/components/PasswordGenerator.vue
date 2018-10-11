<template>
    <div class="backgroud">
        <div class="passLayout">
            <span class="passText">
                {{ pass }}
            </span>
            <el-button class="el-icon-refresh refreshBtn"
                type="primary" circle
                @click="genPass">
            </el-button>
        </div>
        <div class="copyPassLayout">
            <el-button id="copyPassBtn"
                type="primary"
                :data-clipboard-text="pass"
                @click="copyPass">
                {{ copyPassTips }}
            </el-button>
        </div>
        <div class="passLengthLayout">
            <span>
                长度：{{ passLength }}
            </span>
            <el-slider
                v-model="passLength"
                :show-tooltip="false"
                :min="4"
                :max="40">
            </el-slider>
        </div>
        <el-checkbox-group
            :min="1"
            v-model="use"
            @change="genPass">
            <el-checkbox
                v-for="option in useOptions"
                :label="option"
                :key="option">{{ option }}
            </el-checkbox>
        </el-checkbox-group>
    </div>
</template>

<script>
import Clipboard from 'clipboard'

const letter = {
    name: '字母',
    value: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'p', 'Q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
}
const number = {
    name: '数字',
    value: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
}
const symbol = {
    name: '符号',
    value: ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '-', '=', '{', '[', '}', ']', ':', ';', ', ', '<', '.', '>', '/', '?', '"',"'", '|', '\\']
}
const useOptions = [letter.name, number.name, symbol.name]

export default {
    name: 'PasswordGenerator',
    data() {
        return {
            pass: '',
            passLength: 16,
            use: [letter.name, number.name],
            useOptions: useOptions,
            copyPassTips: '复制密码'
        }
    },
    watch: {
        passLength() {
            this.genPass()
        }
    },
    methods: {
        genPass() {
            let seed = this.getSeed()
            let seedlength = seed.length
            let pass = ''
            for (let i = 0; i < this.passLength; i++) {
                pass += seed[Math.floor(Math.random() * seedlength)]
            }
            this.pass = pass
        },
        getSeed() {
            let seed = []
            if (this.use.includes(letter.name)) {
                seed = seed.concat(letter.value)
            }
            if (this.use.includes(number.name)) {
                seed = seed.concat(number.value)
            }
            if (this.use.includes(symbol.name)) {
                seed = seed.concat(symbol.value)
            }
            return seed
        },
        copyPass() {
            let clipboard = new Clipboard('#copyPassBtn')
            clipboard.on('success', () => {
                this.copyPassTips = '已复制'
                setTimeout(() => {
                    this.copyPassTips = '复制密码'
                }, 1000)
                clipboard.destroy()
            })
            clipboard.on('error', () => {
                this.$message({
                    showClose: true,
                    message: '复制失败',
                    type: 'error'
                })
                clipboard.destroy()
            })
        }
    },
    created() {
        this.genPass()
    }
}
</script>

<style lang="stylus" scoped>
.backgroud
    padding 20px
    word-break break-all
.passLayout
    min-height 60px
    text-align left
    display flex
    align-items center
    border-bottom 2px solid #ffffff
.passText
    font-size 30px
    flex 1
.refreshBtn
    width 40px
    height 40px
.copyPassLayout
    margin-top 20px
    text-align right
.passLengthLayout
    margin-top 20px
    text-align left
</style>

