<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
                <router-link  :to="'/home/newsinfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.url">
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间：{{item.add_time | dateFormat}}</span>
                            <span>点击次数：{{item.click}}</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import {Toast}from "mint-ui"
    export default {
        name: "Newslist",
        data(){
            return{
                newslist:[]
            }
        },
        created(){
            this.getNewslist();
        },
        methods:{
            getNewslist(){
                this.$http.get('api/getnewslist').then(result=>{
                    if (result.body.status===0) {
                        this.newslist=result.body.message
                    }else {
                        Toast("获取新闻列表失败")
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
li{
    h1{
        font-size: 14px;
    }
    .mui-ellipsis{
        font-size: 12px;
        color: #242424;
        display: flex;
        justify-content: space-between;
    }


}
</style>