<template>
  <div :class="['stibizviscomponents-charts-columnForMultipleInfo', className]" :style="getOuterStyle()"  ref="container">
    <template  v-if="chartDatas.length">
      <ul :style="getContainStyle()" ref="ul">
        <li class="container" v-for="(item, index) in chartDatas" :key="index">
          <i class="column-number" :style="getTopIcon(index)" v-text="indexShow ? (startIndex + index) :''"></i>
          <div class="content">
            <div class="column-info">
              <div class="info-overflow"  @click="clickHandler(item)">
                <span class="column-ip" v-if="item[alias['ip']]" :style="getLabelStyle()" :title="item[alias['ip']] || ''" >{{item[alias['ip']]}}</span>
                <a class="column-name" v-if="item[alias['name']]" href="javascript:void(0);" :title="item[alias['name']] || ''" :style="getLabelStyle()">{{item[alias['name']] || ''}}</a>
              </div>
              <div class="column-value-style">
                <span class="column-value" :style="getValueStyle(item[alias['value']],index )"  @click="clickHandler(item)" :title="dealValue(item[alias['value']] || 0 )">{{dealValue(item[alias['value']] || 0 )}}</span>
                <span class="column-unit" :style="getUnitStyle()">{{unit.text}}</span>
              </div>
            </div>
            <div class="column-charts" :style="{height: (barStyle.height || 10 )+ 'px'}"  @click="clickHandler(item)" :title="dealValue(item[alias['value']] || 0 )">
              <i class="bg" :style="{background: barStyle.background || '#aaa'}"></i>
              <div class="column-charts-value " :style="getChartsStyle(item[alias['value']], index)">
                <div class="column-charts-value-1" :style="{background: colorArr[index % colorArr.length] || 'red' }" ></div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </template>
    <div v-if="!chartDatas.length && showNoData" class="no-data">{{ noData }}</div>
  </div>
</template>

<script>
import icon from './icon.svg';
import { imageFn } from './data.js'

export default {
  name: 'charts-column-bar',
  props: { 
    data: {
      type: Array,
      default: () => [
      {
        country: 'CN',
        ip: '10.23.25.66',
        name: 'name1',
        value: '560'
      },
      {
        country: 'CN',
        ip: '165.235.12.22',
        name: 'name2',
        value: '200'
      },
      {
        country: 'CN',
        ip: '132.45.25.135',
        name: 'name3',
        value: '140'
      }
      ]
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 200
    },
    columnColor:{
      type: Array,
      default: () => ['#cb5653', '#dfba70', '#63acf7']
    },
    barStyle: {
      type: Object,
      default: () =>  {
        return {
          height: 7 ,
          background: '#273858',
        }
      }
    },
    labelStyle: {
      type: Object,
      default: () => {
        return {
          color: '#000' ,
          fontSize: 14
        }
      }
    },
    valueStyle: {
      type: Object,
      default: () => {
        return {
          color: '#000' ,
          fontSize: 14
        }
      }
    },
    noData: {
      type: String,
      default: '暂无数据'
    },
    gap: {
      type: Number,
      default: () => 1
    },
    rowGap:{
      type: Number,
      default: () => 0
    },
    columnGap:{
      type: Number,
      default: () => 0
    },
    alias: {
      type: Object,
      default: () => {
        return {
          country: 'country',
          ip: 'ip',
          name: 'name',
          value: 'value'
        }
      }
    },
    isIcon:{
      type: Boolean,
      default: () => true,
    },
    indexShow:{
      type: Boolean,
      default: () => true,
    },
    indexStyle:{
      type: Object,
      default: () => {
        return{
          fontSize: '16px'
        }
      }
    },
    startIndex:{
      type: Number,
      default: () => 1
    },
    unit:{
      type: Object,
      default: () => {
        return{
          text: "",
          color: '#000' ,
          fontSize: 14
        }
      }
    },
    flagStyle:{
      type: Object,
      default:() => {
        return{
          width: 30
        }
      }
    },
    isThousandths:{
      type: Boolean,
      default: () => false
    },
    isEvenly:{
      type: Boolean,
      default: () => true
    },
    className:{
      type: String,
      default: () => ''
    },
    showNoData:{
      type: Boolean,
      default: () => true
    }
  },
  data() {
    return {
      chartDatas: [],
      colorArr: [], // 颜色
      maxValue: 1 ,
      top: [imageFn('#FEEF2B'),imageFn('#B5B4B5'),imageFn('#FD8C17'),imageFn('#63a6e9')],  // 只考虑前三
      rowsHeight: 42,
    }
  },
  watch: {
    data: {
      deep: true,
      handler(val) {
        this.chartDatas = val;
        this.maxValue = 1;
        this.computeMaxValue(this.chartDatas , this.alias['value']) ;
        // this.$nextTick(()=>{
        //   this.getAniStyle();
        // })
      }
    },
    columnColor(colors){
      this.colorArr = colors ;
    },
    isEvenly(){
      this.getContainStyle();
    },
    width(){
      this.getOuterStyle();
      this.getContainStyle();
    },
    height(){
      this.getOuterStyle();
      this.getContainStyle();
    },
    'barStyle.height':{
      deep:true,
      handler(){
        this.getLiHeight();
      }
    },
    'valueStyle.fontSize':{
      deep:true,
      handler(){
        this.getLiHeight();
      }
    },
    'labelStyle.fontSize':{
      deep:true,
      handler(){
        this.getLiHeight();
      }
    },
  },
  mounted() {
    if (this.data && this.data.length) {
      this.chartDatas = this.data;
    } else {
      this.chartDatas = [];
    }
    this.getOuterStyle();
    this.colorArr = this.columnColor && this.columnColor.length ? this.columnColor : [] ; 
    this.computeMaxValue(this.chartDatas , this.alias['value']) ;
    this.$nextTick(()=>{
      this.getLiHeight();
      // this.getAniStyle();
    });

  },
  methods: {
    // getAniStyle(){
    //   if(!this.data.length){
    //     return;
    //   }
    //   let arr = this.$refs.container.querySelectorAll(".column-charts-value");
    //   arr.forEach((v,index)=>{
    //     let background = this.colorArr[index % this.colorArr.length] || 'red' ;
    //     let  width =  parseFloat(Number(this.chartDatas[index][this.alias['value']]) / this.maxValue).toFixed(2) * 100 + '%';
        
    //     v.style.width = width;
    //     v.style.background = background;
    //   })
    // },
    clickHandler(obj){
      this.$emit("click",obj)
    },
    getLiHeight(){
      if(this.$refs.ul){
        let height = this.$refs.ul.firstChild.querySelector(".content").clientHeight;
        this.rowsHeight = height;
      }
    },
    getOuterStyle(){
      let width = this.width || 300;
      let height = this.height || 200
      return {
        width: width + 'px',
        height: height + 'px'
      }
    },
    // 容器样式
    getContainStyle(){
      this.gap  = this.gap > 3 ? 3 : this.gap;
      let columnsWidth = `${ (this.width - this.columnGap * (this.gap -1) ) / this.gap }px`;
      // this.getLiHeight();
      return {
        'grid-template-columns' : `repeat(${this.gap}, ${ columnsWidth })`,
        'grid-row-gap': `${this.rowGap }px`,
        'grid-column-gap' : `${this.columnGap}px`,
        'align-content':this.isEvenly ? 'space-evenly':'start',
        'grid-template-rows': `repeat(auto-fit, ${this.rowsHeight || 42}px)`
      }
    },
    // 柱形图样式
    getChartsStyle(value){
      // let background = this.colorArr[index % this.colorArr.length] || 'red' ;
      let width =  parseFloat(Number(value) / this.maxValue).toFixed(2) * 100 + '%';
      return {
        // background,
        width
      }
    },
    // 数据样式
    getValueStyle(){
      let color = '#ffffff', fontSize = 16

      if (this.valueStyle && this.valueStyle.color) {
        color = this.valueStyle.color
      }

      if (this.valueStyle && this.valueStyle.fontSize) {
        fontSize = this.valueStyle.fontSize
      }

      return {
        color: color,
        fontSize: fontSize + 'px'
      }
    },
    // 单位样式
    getUnitStyle(){
      let unitStyle = Object.assign({
        fontSize: 14,
        color:'#ffffff'
      },this.unit)
      return {
        color: unitStyle.color,
        fontSize: unitStyle.fontSize + 'px'
      }
    },
    // 各国旗样式
    getFlagStyle(){
      let style = Object.assign({
        width: 30, 
        height: 20,
      },this.flagStyle)
      return {
        width: style.width + "px !important"
      }
    },
    // 信息样式
    getLabelStyle(){
      let color = '#ffffff', fontSize = 14

      if (this.labelStyle && this.labelStyle.color) {
        color = this.labelStyle.color
      }

      if (this.labelStyle && this.labelStyle.fontSize) {
        fontSize = this.labelStyle.fontSize
      }

      return {
        color: color,
        fontSize: fontSize + 'px'
      }
    },
    // getTopIcon(index){
    getTopIcon(){
      if(this.isIcon){
        // let bg = index > 2 ? `url('${this.top[3]}')` : `url('${this.top[index]}')`;
        let bg = `url('${icon}')`;
        return {
          backgroundImage: bg
        }
      }
      if(this.indexStyle){
        return this.indexStyle;
      }
      return {
        backgroundImage: 'none'
      };
    },
    // 计算column的柱形图max，计算显示百分比
    computeMaxValue(arr , key){
      let flag = arr && arr.length;
      if(!flag){
        return
      }
      let max = arr.reduce((_max ,item) =>{
        return _max > Number(item[key]) ? _max : Number(item[key]);
      }, 0);
      // let p = Math.floor(Math.log(max)/Math.LN10);
      // let n = max * Math.pow(10,-p);
      // this.maxValue  = Number(Math.ceil(n)+'e'+p );

      this.maxValue = Math.max(this.maxValue, max);
    },
    dealValue(value){
      if(this.isThousandths){
       return this.formatNumSpecial(value);
      }else{
        return value
      }
    }
  },
}
</script>
<style scoped>
.stibizviscomponents-charts-columnForMultipleInfo{
  /* width: 100%; */
  /* height: 100%; */
  overflow: hidden;
  .no-data{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  ul {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    display: inline-grid;
    grid-template-rows: repeat(auto-fit, 40px);
    grid-auto-flow: column;
    /* align-items: center; */
    /* justify-content: center; */
    align-content: space-evenly;
    overflow: hidden;
  }
  li {
    width: 100%;
    box-sizing: border-box;
    list-style-type: none;
    position: relative;
    /* flex: 1; */
    display: flex;
    align-items: center;
    margin: 5px 0;

    .column-number{
      min-width: 20px;
      height: 30px;
      line-height: 100%;
      text-align: center;
      margin-right: 10px;
      margin-left: 10px;
      background-repeat: no-repeat;
      background-size: 100% 90%;
      font-style: normal;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .content{
      flex:1;
      overflow: hidden;
    }
    
    .column-info{
      margin: 0px 0 5px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .info-overflow{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .column-country{
        width: 30px !important;
        height: 20px !important;
        margin-right: 5px;
        object-fit: contain;
      }
      .column-ip{
        margin-right: 5px;
      }
      .column-name{
        /* width: 150px; */
        max-width: 150px;
        margin-right: 5px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        z-index: 1;
        text-decoration: none;
        padding: 0;
      }
      .column-value-style{
        display: flex;
        align-items: center;
      }
      .column-unit{
        margin-left: 5px;
      }
      .column-value{
        z-index: 10;
        cursor: pointer;
        &:hover{
          filter: brightness(1.2);
        }
      }
    }
    .column-charts {
      position: relative;
      cursor: pointer;
      

      &:hover{
        filter: brightness(1.2);
      }
        
      .column-charts-value{
        transition: width 1s;
        width: 0%;
        height: 100%;
        z-index: 10;
      }
      .column-charts-value-1{
        height: 100%;
        animation: run 1s forwards linear;
        height: 100%;
        
        @keyframes run {
          0%{
            width: 0%;
          }
          100%{
            width: 100%;
          }
        }
      }
      .bg {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -1;
        left: 0;
        /* background: @backgroundColor; */
      }
    }
  }
}
</style>
