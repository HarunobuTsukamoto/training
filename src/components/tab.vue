<template>
    <div id="tabBox">
        <div id="tabs">
            <input type="radio" value="1" id="tab1" v-model="isActive">
            <label for="tab1">世界のニュース</label>
    
            <input type="radio" value="2" id="tab2" v-model="isActive">
            <label for="tab2">国内ニュース</label>
    
            <input type="radio" value="3" id="tab3" v-model="isActive">
            <label for="tab3">タブ3</label>
        </div>
        <ul id="contents">
            
            <div class="newsArea" v-if="isActive == '1'">
                <li v-for="item in displayItems" :key="item.title">
                    <div style="margin: 10px;">
                        {{ item.pubDate }}<br />
                        <a v-bind:href="item.link">{{ item.title }}</a>
                    </div>
                </li>
            </div>
    
            <div class="newsArea" v-else-if="isActive == '2'">
                <li v-for="item in displayItems" :key="item.title">
                    <div style="margin: 10px;">
                        {{ item.pubDate }}<br />
                        <a v-bind:href="item.link">{{ item.title }}</a>
                    </div>
                </li>
            </div>
    
            <li v-else-if="isActive == '3'">
                <p class="title">テスト3</p>
                <p>テスト本文3テスト本文3テスト本文3テスト本文3テスト本文3<br>
                テスト本文3テスト本文3テスト本文3テスト本文3テスト本文3テスト本文3</p>
            </li>
        </ul>

    </div>
</template>

<script>

export default{
    data() {
        return{
            isActive: "1",
            items: [],
            range: 20
        }
    },
    computed: {
        displayItems: function(){
            return this.items.slice(0, this.range);
        }
    },
    watch: {
        isActive: function(newValue){
            if (newValue === "1"){
                const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ topic: "WORLD", lang: "jpn" }),
                };
                fetch("http://localhost:4000/list/topic", requestOptions)
                .then((response) => response.json())
                .then((items) => (this.items = items));
            }else if (newValue === "2"){
                const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ topic: "NATION", lang: "jpn" }),
                };
                fetch("http://localhost:4000/list/topic", requestOptions)
                .then((response) => response.json())
                .then((items) => (this.items = items));
            }
        }
    },
    created() {
        const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: "WORLD", lang: "jpn" }),
        };
        fetch("http://localhost:4000/list/topic", requestOptions)
        .then((response) => response.json())
        .then((items) => (this.items = items));
        //.then((items)=>(items.isoDate = items.isoDate.replace('-','/')));
    }
}
</script>

<style>
#tabs {
    overflow: hidden;
}
 
#tabs input {
  display: none;
}
 
#tabs label {
    display: inline-block;
    line-height: 40px;
    width: 120px;
    text-align: center;
    cursor: pointer;
    background: #eee;
    transition: 0.3s;
    border-radius: 10px 10px 0 0;
}
 
#tabs input:checked + label,
#tabs label:hover {
    background: #56B4BE;
    color: #fff;
}
 
/* #contents {
    width: 500px;
    height: 90px;
    padding: 5px 10px;
    box-shadow: 1px 1px 1px 0 rgba(0,0,0,0.2);
    border: 1px solid #eee;
    border-top: 2px solid #56B4BE;
} */
 
#contents p {
  font-size: 15px;
  margin: 0;
}
 
#contents p.title {
  font-size: 16px;
  font-weight: bold;
}

.newsArea{
    position: absolute;
    height: 80vh;
    width: 80vw;
    overflow: scroll;
}
</style>