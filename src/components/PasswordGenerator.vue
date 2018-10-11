<template>
    <div>
        <span id="pass">{{ pass }}</span>
        <div>
            <el-button id="refreshBtn" type="primary" class="el-icon-refresh" circle @click="genpass"></el-button>
            <el-button id="copyPassBtn" type="primary" :data-clipboard-text="pass" @click="copyPass">{{ copyPassTips }}</el-button>
        </div>
        <div class="block">
            <span>长度：{{ passlength }}</span>
            <el-slider v-model="passlength" :show-tooltip="false" :min="4" :max="40"></el-slider>
        </div>
        <el-checkbox-group :min="1" v-model="use" @change="genpass">
            <el-checkbox v-for="option in useOptions" :label="option" :key="option">{{ option }}</el-checkbox>
        </el-checkbox-group>
    </div>
</template>

<script>
import Clipboard from 'clipboard'

const letter = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','m','n','p','Q','r','s','t','u','v','w','x','y','z']
const number = ['0','1','2','3','4','5','6','7','8','9']
const symbol = ['!','@','#','$','%','^','&','*','(',')','_','+','-','=','{','[','}',']',':',';',',','<','.','>','/','?','"',"'",'|','\\']
const letterName = '字母'
const numberName = '数字'
const symbolName = '符号'
const useOptions = [letterName,numberName,symbolName]
export default {
    name: 'PasswordGenerator',
    data() {
        return {
            pass: '',
            passlength: 16,
            use: [letterName,numberName],
            useOptions: useOptions,
            copyPassTips: '复制密码'
        }
    },
    methods: {
        genpass() {
            let seed = this.getseed()
            let seedlength = seed.length
            let pass = ''
            for (let i = 0; i < this.passlength; i++) {
                pass += seed[Math.floor(Math.random() * seedlength)]
            }
            this.pass = pass
        },
        getseed() {
            let seed = []
            if (this.use.includes(letterName)) {
                seed = seed.concat(letter)
            }
            if (this.use.includes(numberName)) {
                seed = seed.concat(number)
            }
            if (this.use.includes(symbolName)) {
                seed = seed.concat(symbol)
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
                clipboard.destroy()
            })
        }
    },
    created() {
        this.genpass()
    }
}
</script>

<style lang="stylus" scoped>
#pass
    font-size 30px
    font-family "Helvetica Neue"
</style>

