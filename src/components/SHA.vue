<template>
    <div class="backgroud">
        <div class="passLayout">
            <el-input v-model="x" placeholder="input x" @input="genPass"></el-input>
        </div>
        <div class="passLayout">
            <el-input v-model="y" placeholder="input y" @input="genPass"></el-input>
        </div>
        <div class="passLayout">
            <span class="passText">
                {{ pass }}
            </span>
        </div>
        <div class="copyPassLayout">
            <el-button id="copyPassBtn" type="primary" :data-clipboard-text="pass" @click="copyPass">
                {{ copyPassTips }}
            </el-button>
        </div>
        <div class="passLengthLayout">
            <span>
                长度：{{ passLength }}
            </span>
            <el-slider v-model="passLength" :show-tooltip="false" :min="8" :max="40">
            </el-slider>
        </div>
        <el-checkbox-group class="encryptOptionsLayout" :min="0" @change="genPass" v-model="use">
            <el-checkbox v-for="option in encryptOptions" :label="option" :key="option">{{ option }}
            </el-checkbox>
        </el-checkbox-group>
    </div>
</template>

<script>
import Clipboard from 'clipboard'
var CryptoJS = require("crypto-js")

const caps = {
    name: '大写'
}
const symbol = {
    name: '符号'
}
const encryptOptions = [caps.name, symbol.name]

export default {
    name: 'PasswordGenerator',
    data() {
        return {
            x: '',
            y: '',
            pass: '',
            passLength: 16,
            use: [caps.name, symbol.name],
            encryptOptions: encryptOptions,
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
            let pass = CryptoJS.HmacSHA1(this.x, this.y).toString()
            const firstLetter = this.findFirstLetter(pass)
            pass = firstLetter + pass // make sure first pass is letter
            // replace with caps
            if (this.use.includes(caps.name)) {
                const i = 3
                pass = pass.slice(0, i) + firstLetter.toUpperCase() + pass.slice(i)
            }
            // replace with symbol
            if (this.use.includes(symbol.name)) {
                const i = 7
                const symbol = ','
                pass = pass.slice(0, i) + symbol + pass.slice(i)
            }
            pass = pass.slice(0, this.passLength)
            this.pass = pass
        },
        findFirstLetter(str) {
            for (let i = str.length - 1; i >= 0; i--) {
                if (str[i].match(/[a-z]/i)) {
                    return str[i].toLowerCase()
                }
            }
            return 'e'
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
    font-size 25px
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
.encryptOptionsLayout
    margin-top 20px
</style>

