<template>
  <div>
    <div class="condition-select">
      <button class="add-mune" @click="addMainMenu">新增菜单</button>
    </div>
    <!-- 数据表格 -->
    <el-main>
      <el-table
        :data="menuList"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column prop="id" label="ID" width="250"  align="center"></el-table-column>
        <el-table-column prop="name" label="菜单名" width="250" align="center"></el-table-column>
        <el-table-column prop="url" label="路径" align="center"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
                <el-button v-if='scope.row.isMain' @click="addChildMenu(scope.row)" type="text" size="small">新增</el-button>
                <el-button @click="editMenu(scope.row)" type="text" size="small">修改</el-button>
            </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <el-row>
        <el-col :span="6"><span>菜单名:</span></el-col>
        <el-col :span="12"><el-input v-model="menuName"></el-input></el-col>
      </el-row>
      <el-row>
        <el-col :span="6"><span>路径:</span></el-col>
        <el-col :span="12"><el-input v-model="menuUrl"></el-input></el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleOK">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import SystemApi from '@/api/systemApi/systemApi';
@Component({
    components: {
    },
})
export default class MenuList extends Vue {
  private systemApi: SystemApi = new SystemApi();
  private menuList: any = [];
  private dialogTitle: string;
  private dialogVisible: boolean = false;
  private menuName: string = '';
  private menuUrl: string = '';
  private parentId: string = '';
  private id: string = '';
  public constructor() {
    super();
  }
  public mounted() {
    // let menuList = this.storage.getStorageMenuList();
    // for(let i = 0; i < menuList.length; i++){
    //   let menu = {
    //     id:'',name:'',url:'',isMain:true,children:[]
    //   };
    //   menu.id = menuList[i].id
    //   menu.name = menuList[i].name
    //   menu.url = menuList[i].url
    //   menu.children = menuList[i].childMenuList // element表格树形控件子树命名必须为children
    //   this.menuList.push(menu)
    // }
  }
  // 新增主菜单
  private addMainMenu() {
    this.menuName = '';
    this.menuUrl = '';
    this.parentId = '';
    this.dialogVisible = true;
  }
  // 新增子菜单
  private addChildMenu(row: any) {
    this.menuName = '';
    this.menuUrl = '';
    this.parentId = row.parentId;
    this.dialogVisible = true;
  }
  // 编辑菜单
  private editMenu(row: any) {
    this.dialogVisible = true;
    this.menuName = row.name;
    this.menuUrl = row.url;
    this.id = row.id;
  }
  // 确定
  private handleOK() {
    let param = {
      name: this.menuName,
      url: this.menuUrl,
      parentId: this.parentId,
      id: this.id
    }
    // this.loginApi.addMenu(param).then(res =>{

    // })
  }
}
</script>
<style lang="scss" scoped>
.condition-select{
  width: 100%;
  height: 50px;
  display: flex;
  .add-mune{
    border: solid #f1f1f1f1 1px;
    border-radius: 3px;
  }
}
.el-row {
    .el-col{
      span{
        font-size: 16px;
        float: right;
        margin: 10px 10px 0 0;
      }
    }
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
