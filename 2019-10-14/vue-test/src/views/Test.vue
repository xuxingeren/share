<template>
  <div class="box">
    <p>xxxxxxxx</p>
    <a-form :form="form">
      <a-form-item
        label="Name"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input v-decorator="[
            'name',
            options.name
          ]" />
      </a-form-item>
      <a-form-item
        label="Age"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input v-decorator="[
            'age',
            options.age
          ]" />
      </a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        @click="sub"
      >
        提交
      </a-button>
    </a-form>
    <a-button
      type="primary"
      @click="goTo"
    >go</a-button>
    <a-input-search
      placeholder="语音文字"
      v-model="voice"
      @search="onSearch"
      enterButton="Search"
      size="large"
    />
    <baidu-map
      class="map"
      @ready="handler"
      :center="{lng: 116.404, lat: 39.915}"
      :zoom="14"
    >
    </baidu-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      voice: "",
      form: this.$form.createForm(this),
      options: {
        name: {
          validateTrigger: ["blur", "change"],
          rules: [
            {
              required: true,
              validator: (rule, value, callback) => {
                console.log(value);
                if (!value) {
                  callback(new Error("请输入name"));
                }
                callback();
              }
            }
          ]
        },
        age: {
          validateTrigger: ["blur", "change"],
          rules: [
            {
              required: true,
              validator: (rule, value, callback) => {
                if (value === "") {
                  callback(new Error("请输入age"));
                }
                callback();
              }
            }
          ]
        }
      },
      formDate: {
        name: "",
        age: ""
      }
    };
  },
  methods: {
    onSearch(value) {
      this.voiceText(value);
    },
    voiceText(str) {
      this.$btts(
        {
          tex: str,
          tok:
            "24.109f913c452fefb6134164107d1f66cf.2592000.1567907029.282335-16980377",
          spd: 5,
          pit: 5,
          vol: 15,
          per: 111
        },
        {
          volume: 0.3,
          autoDestory: true,
          timeout: 10000,
          hidden: false,
          onInit: function(htmlAudioElement) {
            console.log(htmlAudioElement);
          },
          onSuccess: function(htmlAudioElement) {
            htmlAudioElement.play();
          },
          onError: function(errorText) {
            console.log(errorText);
          },
          onTimeout: function() {}
        }
      );
      // var url = "http://tts.baidu.com/text2audio?per=5&lan=zh&ie=UTF-8&text=" + encodeURI(str);
      // var audio = new Audio(url);
      // audio.src = url;
      // audio.play();
    },
    goTo() {
      this.$router.push({
        path: "/Hello"
      });
    },
    sub() {
      this.form.validateFields(err => {
        if (!err) {
          console.info("success");
        }
      });
      console.log(this.form.getFieldsValue());
    },
    handler({ BMap, map }) {
      var point = new BMap.Point(116.404, 39.915);
      map.centerAndZoom(point, 20);
      var marker = new BMap.Marker(point);
      console.log(map);
      var infoWindows = new BMap.InfoWindow("aaaaa", {
        width: 200,
        title: "title",
        offset: new BMap.Size(0, -25)
      });
      map.addOverlay(marker);
      map.openInfoWindow(infoWindows, point);
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  ul {
    list-style: none;
  }
  .map {
    height: 500px;
    width: 500px;
  }
}
</style>
