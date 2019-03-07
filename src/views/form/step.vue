<!--
 * 分步表单
 * 
 * @author  Yang,junlong at 2019-03-07 17:39:10 build.
 * @version $Id$
-->

<template>
  <div>
  	<layout-view-header>将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。</layout-view-header>

  	<el-card shadow="never" style="border: none;">
  	  <el-steps  :active="2" process-status="finish" finish-status="success" align-center>
		  <el-step title="添加账户信息"></el-step>
		  <el-step title="确认信息"></el-step>
		  <el-step title="完成"></el-step>
	  </el-steps>
  	</el-card>
  </div>
</template>