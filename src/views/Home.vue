<script setup lang="ts">
import router from "../router";

const routesInfo = router.options.routes
</script>
<template>
	<el-container>
		<el-header>Header</el-header>
		<el-container>
			<el-aside width="200px" style="background-color: rgb(238, 241, 246)">
				<el-menu router>
					<template v-for="(item,index) in routesInfo" :key="index">
						<el-sub-menu index="1" v-if="item.hidden">
							<template #title>
								<i class="el-icon-location"></i>
								<span>{{ item.name }}</span>
							</template>
							<el-menu-item-group>
								<el-menu-item :index="children.path" v-for="(children,index) in item.children"
											  :key="index">
									{{ children.name }}
								</el-menu-item>
							</el-menu-item-group>
						</el-sub-menu>
					</template>
				</el-menu>
			</el-aside>
			<el-container>
				<el-main>
					<router-view/>
				</el-main>
				<el-footer>Footer</el-footer>
			</el-container>
		</el-container>
	</el-container>
</template>
<style>
.el-header,
.el-footer {
	background-color: #b3c0d1;
	color: var(--el-text-color-primary);
	text-align: center;
	line-height: 60px;
}

.el-aside {
	background-color: #d3dce6;
	color: var(--el-text-color-primary);
	text-align: center;
	line-height: 200px;
}

.el-main {
	background-color: #e9eef3;
	color: var(--el-text-color-primary);
	text-align: center;
	line-height: 160px;
}

body > .el-container {
	margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
	line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
	line-height: 320px;
}
</style>