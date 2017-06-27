<template>
  <div>
    <el-dialog title="+库存" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="form">

        <div>距离活动还有xx天</div>

        <el-form-item class="demo-form-inline">
          <el-select v-model="form.id" placeholder="请选择">
            <el-option v-for="item in options" :key="item.id" :label="item.prizeName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item class="demo-form-inline">
          <el-input v-model="form.count" auto-complete="off" placeholder="输入需增加数量"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import action from '../store/action'
  export default {
    data() {
      return {
        options: [],
        dialogFormVisible: false,
        form: {
          id: '',
          count: '',
          activityId: ''
        }
      }
    },
    methods: {
      // 提交
      onSubmit() {
        let t = this;
        if(t.form.id && t.form.count) {
          action.addRemainStock(this.form).then(response => {
            if (response.code == 200) {
              this.$notify({
                title: '成功',
                message: '添加库存成功',
                type: 'success',
                duration: 2000
              });
            }else{
              this.$notify.error({
                title: '失败',
                message: response.message,
                duration: 2000
              });
            }
          });
        }
      },
      getPrizeList(id) {
        let t = this;
        t.dialogFormVisible = true;
        t.form.count = null;
        t.form.id = null;
        let data = {
          "pageNo": 1,
          "pageSize": 10000000,
          "prizeActivityId": id
        };
        // 获取奖品列表
        action.getPrizeList(data).then(response => {
          t.options = response.dataMap.records;
          t.value = response.dataMap.records[0].prizeName;
        });
      }
    }
  }
</script>

<style>
  .demo-form-inline {
    width: auto;
    display: inline-block;
  }
  .el-input {
    width: 150px;
  }
  .el-form-item__content {
    display: inline-block;
    vertical-align: top;
  }
</style>
