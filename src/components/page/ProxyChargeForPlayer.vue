<template>
    <div class="table" >
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 充值记录</el-breadcrumb-item>
                <el-breadcrumb-item>玩家充值</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
            <!-- <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                <el-option key="1" label="广东省" value="广东省"></el-option>
                <el-option key="2" label="湖南省" value="湖南省"></el-option>
            </el-select> -->
            <el-input v-model="select_word" placeholder="玩家ID搜索" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search(select_word)">搜索</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="proxyname" label="代理手机号"  width="200">
            </el-table-column>
            <el-table-column prop="userid" label="玩家ID" sortable >
            </el-table-column>
            <el-table-column prop="time" label="时间" sortable >
            </el-table-column>
            <el-table-column prop="roomcard" label="充值房卡数" >
            </el-table-column>
            <!-- <el-table-column prop="address" label="地址" :formatter="formatter">
            </el-table-column> -->
            <!-- <el-table-column label="操作" width="180"> -->
            <!-- <el-table-column label="操作" width="300">
                <template scope="scope"> -->
                    <!-- <el-button size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                    <!-- <el-button size="small" type="danger" -->
                            <!-- @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
                <!-- </template> -->
            <!-- </el-table-column> -->
        </el-table>
        <div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                url: './static/vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                tableData: [],
                allData:[],
                searchData:[],
                total:0
            }
        },
        created(){
            this.getData();
        },
        computed: {
            data(){
                const self = this;
                return self.tableData.filter(function(d){
                    let is_del = false;
                    for (let i = 0; i < self.del_list.length; i++) {
                        if(d.name === self.del_list[i].name){
                            is_del = true;
                            break;
                        }
                    }
                    if(!is_del){
                        if(d.address.indexOf(self.select_cate) > -1 &&
                            (d.name.indexOf(self.select_word) > -1 ||
                            d.address.indexOf(self.select_word) > -1)
                        ){
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.tableData = this.allData.slice((val-1)*10,(val)*10)

            },
            getData(){
                var params = new URLSearchParams()
                // params.append('username',this.ruleForm.username)
                // params.append('password',md5(this.ruleForm.password))
                this.$http.post('superadmin/getallproxychargeforplayer', params).then((res) => {
                  // console.log(res);
                    this.allData = res.data;
                    this.total = this.allData.length;
                    this.tableData = res.data.slice(0,10);
                    // console.log(res.data);
                })
            },

            search(txt){
              if (txt == "") {
                this.getData();
                return
              }
                // var txt =1;
                // var searchbykey = function (txt) {
                  var x = this.allData;
                  console.log(x);
                  var result = [];
                  for(var i = 0; i < x.length; i++){
                      var obj = x[i];
                          if(obj['userid'].toString().indexOf(txt) != -1) {
                              result.push(obj);
                          }
                  }
                  this.allData = result
                  this.tableData = this.allData.slice(0,10)

            },
            // formatter(row, column) {
            //     return row.address;
            // },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.$message('编辑第'+(index+1)+'行');
            },
            handleDelete(index, row) {
                //this.$message.error('删除第'+(index+1)+'行'+row.username);
                //删除用户
                var that = this
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  //在这里做删除操作
                  var params = new URLSearchParams()
                  params.append('username',row.username)
                  // console.log(row.username);
                  that.$http.post('superadmin/deleteproxy',params)
                  .then(ret=>{
                    console.log(ret);
                    if (ret.data.ok == 1) {
                      this.$message({
                        type: 'success',
                        message: '删除成功!'
                      });
                      that.getData()
                    }else {
                       this.$message.error('删除失败');
                    }

                  })
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });
                });
            },
            delAll(){
                const self = this,
                    length = self.multipleSelection.length;
                let str = '';
                self.del_list = self.del_list.concat(self.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += self.multipleSelection[i].name + ' ';
                }
                self.$message.error('删除了'+str);
                self.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>

<style scoped>
.handle-box{
    margin-bottom: 20px;
}
.handle-select{
    width: 120px;
}
.handle-input{
    width: 300px;
    display: inline-block;
}
</style>
