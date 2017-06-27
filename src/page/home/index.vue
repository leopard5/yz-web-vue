<template>
    <div>
        home
      <router-link v-bind:to="'item'">item</router-link>
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
      <el-select v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <div class="block">
        <span class="demonstration">选择时间</span>
        <el-date-picker
          v-model="value7"
          type="daterange"
          align="right"
          placeholder="选择日期范围"
          :picker-options="pickerOptions2">
        </el-date-picker>
      </div>
      <div class="block">
        <span class="demonstration">完整功能</span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[50, 200, 300, 400]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <div class="block">
        <el-button plain @click="open">成功</el-button>
        <el-button plain @click="open1">警告</el-button>
        <el-button plain @click="open2">消息</el-button>
        <el-button plain @click="open3">错误</el-button>
        <el-button type="text" @click="open4">点击打开 Message Box</el-button>
      </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎222sdddssds1',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎sdfsafs',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
          options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
          value: '',
          pickerOptions2: {
            shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
          },
          value6: '',
          value7: '',
          currentPage: 3,
          total: 520
        }
      },
      methods: {
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        },
        open() {
          this.$notify({
            title: '成功',
            message: '这是一条成功的提示消息',
            type: 'success',
            duration: 2000
          });
        },
        open1() {
          this.$notify({
            title: '警告',
            message: '这是一条警告的提示消息',
            type: 'warning',
            duration: 2000
          });
        },
        open2() {
          this.$notify.info({
            title: '消息',
            message: '这是一条消息的提示消息',
            duration: 2000
          });
        },
        open3() {
          this.$notify.error({
            title: '错误',
            message: '这是一条错误的提示消息',
            duration: 2000
          });
        },
        open4() {
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      }
    }
</script>

<style>
</style>
