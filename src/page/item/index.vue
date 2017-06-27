<template>
    <div>
        item
      <router-link v-bind:to="'home'">home</router-link>
      <el-input maxlength="15" v-model="money" @change="toUppercase" placeholder="请输入小写金额"></el-input>
      <label>{{ uppercase }}</label>
    </div>
</template>

<script>
    export default {
      data() {
          return {
              money: '',
              uppercase: '',
              parentMsg: ''
          }
      },
      methods: {
        toUppercase () {
            if(this.money) {
              this.uppercase = this.numToCny(this.money);
            }
        },
        numToCny(num){
          var strOutput = "";
          var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
          num += "00";
          var intPos = num.indexOf('.');
          if (intPos >= 0)
            num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
          strUnit = strUnit.substr(strUnit.length - num.length);
          for (var i=0; i < num.length; i++)
            strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i,1),1) + strUnit.substr(i,1);
          return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元");
        }
      }
    }
</script>

<style>
</style>
