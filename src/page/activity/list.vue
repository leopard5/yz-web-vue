<template>
  <div id="app">
    <el-table empty-text="数据加载中..." v-loading.table="loading" border :data="activityList" style="width: 100%">
      <el-table-column prop="date" label="序号" width="180">
        <template scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column prop="activityName" label="活动名称" width="180"></el-table-column>
      <el-table-column prop="createUserName" label="创建人"></el-table-column>
      <el-table-column prop="id" label="活动id"></el-table-column>
      <el-table-column prop="createTime" :formatter="dateFormat"  label="活动创建时间"></el-table-column>
      <el-table-column prop="cstatus" label="活动状态"></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button v-show="scope.row.cstatus==1 " size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button v-show="scope.row.cstatus == 1 || scope.row.cstatus == 2 || scope.row.cstatus == 3 || scope.row.cstatus == 6" size="small" @click="handleEdit(scope.$index, scope.row)">链接</el-button>
          <el-button v-show="scope.row.cstatus == 3" size="small" @click="addActivityStock(scope.row.id)">+库存</el-button>
          <el-button v-show="scope.row.cstatus == 1&& scope.row.auditStatus == 0" size="small" @click="deleteActivity(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br/>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNo"
      :page-sizes="[10, 15, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <AddActivityStock ref="stock"></AddActivityStock>
  </div>
</template>

<script>
  import { Loading } from 'element-ui';
  import action from '../../store/action'
  import AddActivityStock from '../../components/addActivityStock.vue'
  export default {
    components:{ AddActivityStock },
    data() {
      return {
          activityList: [],
          total:0,
          pageNo:1,
          pageSize:10,
          loading: true,
      }
    },
    created () {
      let t = this;
      window.setTimeout(function () {
        // 获取活动列表
        t.getActivityList(this.pageNo, this.pageSize);
      },1000)
    },
    methods: {
      // 加库存
      addActivityStock(id) {
          this.$refs.stock.getPrizeList(id);
        // this.$root.eventHub.$emit('eventName', id);
        //广播到子组件
        /*this.$emit( 'addChildDataEvent', id );*/
        // Hub.$emit('change','hehe');
      },
      // 格式化时间
      dateFormat(row) {
          return action.transformTime(row.createTime);
      },
      /**
       * 删除活动
       * @param id
       */
      deleteActivity(id) {
          let t = this;
        this.$confirm('确定要删除此活动吗？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          action.deleteActivity(id).then(response => {
            if (response.code == 200) {
              this.$notify({
                title: '成功',
                message: '删除活动成功',
                type: 'success',
                duration: 2000
              });
              t.getActivityList(t.pageNo, t.pageSize);
            }else{
              this.$notify.error({
                title: '失败',
                message: response.message,
                duration: 2000
              });
            }
          });
        }).catch(() => {

        });

      },
      getActivityList(pageNo, pageSize) {
        let t = this, data = {
          "pageNo": pageNo,
          "pageSize": pageSize,
          "ownerType": 2
        };
        action.getActivityList(data).then(response => {
          console.log(response);
          t.activityList = response.dataMap.records;
          t.total = response.dataMap.totalRecords;
          t.pageNo = response.dataMap.pageNo;
          t.pageSize = response.dataMap.pageSize;
          t.loading = false;
        });
      },
      handleSizeChange(val) {
          console.log(val);
        this.getActivityList(this.pageNo, val);
      },
      handleCurrentChange(val) {
        this.getActivityList(val, this.pageSize);
      }
    }
  }
</script>

<style>
</style>
