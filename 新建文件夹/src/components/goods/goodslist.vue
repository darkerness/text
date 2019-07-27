<template>
    <div class="goods-list">
        <!--<router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/'+item.id"-->
        <!--tag="div">-->
        <div class="goods-item"v-for="item in goodslist" :key="item.id"
        @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">{{item.sell_price}}</span>
                    <span class="old">{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}} 件</span>
                </p>
            </div>
        <!--</router-link>-->
        </div>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    import router from "../../router";

    export default {
        name: "goodslist",
        data(){
            return{
                pageindex:1,
                goodslist:[],
            }
        },
        created(){
          this.getGoodlist() ;
        },
        methods:{
            getGoodlist(){
                this.$http.get("api/getgoods?pageindex="+this.pageindex).then(result=>{
                    if(result.body.status===0){
                        // this.goodslist=result.body.message;
                        this.goodslist=this.goodslist.concat(result.body.message);

                    }
                })
            },
            getMore(){
                this.pageindex++;
                this.getGoodlist();
            },
            goDetail(id){
                //区分route(参数)跟router（导航）
                this.$router.push({name:"goodsinfo",params:{id}});
            },
        },
    }
</script>

<style lang="scss" scoped>
.goods-list{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 7px;

    .goods-item{
        width: 48%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
        margin: 3px 0;
        img{
            width: 100%;
        }
        .title{
            font-size: 14px;
        }
        .info{
            background-color: #dddddd;
            p{
                margin: 0;
                padding: 5px;
            }
            .price{
                padding-left: 2px;
                .now{
                    color: red;
                    font-size: 16px;
                    font-weight: bold;
                }
                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 12px;
            }
        }
    }
}
</style>