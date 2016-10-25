var amazon_width = '';
var amazon_height = '';
var mobile_amazon_width = '';
var mobile_amazon_height = '';
var user_input = '';
var user_input_mobile = '';
var currentUser = Discourse.User.current();

function splitWidthInt(value) {
    var str = value.substring(0, 3);
    return str.trim();
}

function splitHeightInt(value) {
    var str = value.substring(0, 3);
    return str.trim();
}

var data = {
  "topic-list-top" : {},
  "topic-above-post-stream" : {},
  "topic-above-suggested" : {},
  "post-bottom" : {}  
}


if (!Discourse.Mobile.mobileView && Discourse.SiteSettings.amazon_topic_list_top_src_code) {
  data["topic-list-top"]["user_input"] = Discourse.SiteSettings.amazon_topic_list_top_src_code;
  data["topic-list-top"]["amazon_width"] = parseInt(Discourse.SiteSettings.amazon_topic_list_top_ad_width_code);
  data["topic-list-top"]["amazon_height"] = parseInt(Discourse.SiteSettings.amazon_topic_list_top_ad_height_code);
} 

if (Discourse.Mobile.mobileView && Discourse.SiteSettings.amazon_mobile_topic_list_top_src_code) {
  data["topic-list-top"]["user_input_mobile"] = Discourse.SiteSettings.amazon_mobile_topic_list_top_src_code;
  data["topic-list-top"]["mobile_amazon_width"] = parseInt(Discourse.SiteSettings.amazon_mobile_topic_list_top_ad_width_code);
  data["topic-list-top"]["mobile_amazon_height"] = parseInt(Discourse.SiteSettings.amazon_mobile_topic_list_top_ad_height_code);
}  

if (!Discourse.Mobile.mobileView && Discourse.SiteSettings.amazon_topic_above_post_stream_src_code) {
  data["topic-above-post-stream"]["user_input"] = Discourse.SiteSettings.amazon_topic_above_post_stream_src_code;
  data["topic-above-post-stream"]["amazon_width"] = parseInt(Discourse.SiteSettings.amazon_topic_above_post_stream_ad_width_code);
  data["topic-above-post-stream"]["amazon_height"] = parseInt(Discourse.SiteSettings.amazon_topic_above_post_stream_ad_height_code);
}

if (Discourse.Mobile.mobileView && Discourse.SiteSettings.amazon_mobile_topic_above_post_stream_src_code) {
  data["topic-above-post-stream"]["user_input_mobile"] = Discourse.SiteSettings.amazon_mobile_topic_above_post_stream_src_code;
  data["topic-above-post-stream"]["mobile_amazon_width"] = parseInt(Discourse.SiteSettings.amazon_mobile_topic_above_post_stream_ad_width_code);
  data["topic-above-post-stream"]["mobile_amazon_height"] = parseInt(Discourse.SiteSettings.amazon_mobile_topic_above_post_stream_ad_height_code);
}  

if (!Discourse.Mobile.mobileView && Discourse.SiteSettings.amazon_topic_above_suggested_src_code) {
  data["topic-above-suggested"]["user_input"] = Discourse.SiteSettings.amazon_topic_above_suggested_src_code;
  data["topic-above-suggested"]["amazon_width"] = parseInt(Discourse.SiteSettings.amazon_topic_above_suggested_ad_width_code);
  data["topic-above-suggested"]["amazon_height"] = parseInt(Discourse.SiteSettings.amazon_topic_above_suggested_ad_height_code);
}

if (Discourse.Mobile.mobileView && Discourse.SiteSettings.amazon_mobile_topic_above_sugggested_src_code) {
  data["topic-above-suggested"]["user_input_mobile"] = Discourse.SiteSettings.amazon_mobile_topic_above_suggested_src_code;
  data["topic-above-suggested"]["mobile_amazon_width"] = parseInt(Discourse.SiteSettings.amazon_mobile_topic_above_suggested_ad_width_code);
  data["topic-above-suggested"]["mobile_amazon_height"] = parseInt(Discourse.SiteSettings.amazon_mobile_topic_above_suggested_ad_height_code);
}  

if (!Discourse.Mobile.mobileView && Discourse.SiteSettings.amazon_post_bottom_src_code) {
  data["post-bottom"]["user_input"] = Discourse.SiteSettings.amazon_post_bottom_src_code;
  data["post-bottom"]["amazon_width"] = parseInt(Discourse.SiteSettings.amazon_post_bottom_ad_width_code);
  data["post-bottom"]["amazon_height"] = parseInt(Discourse.SiteSettings.amazon_post_bottom_ad_height_code);
}

if (Discourse.Mobile.mobileView && Discourse.SiteSettings.amazon_mobile_post_bottom_src_code) {
  data["post-bottom"]["user_input_mobile"] = Discourse.SiteSettings.amazon_mobile_post_bottom_src_code;
  data["post-bottom"]["mobile_amazon_width"] = parseInt(Discourse.SiteSettings.amazon_mobile_post_bottom_ad_width_code);
  data["post-bottom"]["mobile_amazon_height"] = parseInt(Discourse.SiteSettings.amazon_mobile_post_bottom_ad_height_code);
}


export default Ember.Component.extend({
  amazon_width: amazon_width,
  amazon_height: amazon_height,
  mobile_amazon_width: mobile_amazon_width,
  mobile_amazon_height: mobile_amazon_height,
  user_input: user_input,
  user_input_mobile: user_input_mobile,

  classNames: ['amazon-product-links'],

  init: function() {
    this.set('user_input', data[this.placement]["user_input"] );
    this.set('amazon_width', data[this.placement]["amazon_width"] );
    this.set('amazon_height', data[this.placement]["amazon_height"] );
    this.set('user_input_mobile', data[this.placement]["user_input_mobile"] );
    this.set('mobile_amazon_height', data[this.placement]["mobile_amazon_height"] );
    this.set('mobile_amazon_width', data[this.placement]["mobile_amazon_width"] );
    this._super();
  },

  adWrapperStyle: function() {
    return `width: ${this.get('amazon_width')}px; height: ${this.get('amazon_height')}px;`.htmlSafe();
  }.property('amazon_width', 'amazon_height'),

  adWrapperStyleMobile: function() {
    return `width: ${this.get('mobile_amazon_width')}px; height: ${this.get('mobile_amazon_height')}px;`.htmlSafe();
  }.property('mobile_amazon_width', 'mobile_amazon_height'),

  adTitleStyleMobile: function() {
    return `width: ${this.get('mobile_amazon_width')}px;`.htmlSafe();
  }.property('mobile_amazon_width'),

  userInput: function() {
    return `${this.get('user_input')}`.htmlSafe();
  }.property('user_input'),

  userInputMobile: function() {
    return `${this.get('user_input_mobile')}`.htmlSafe();
  }.property('user_input_mobile'),

  checkTrustLevels: function() {
    return !((currentUser) && (currentUser.get('trust_level') > Discourse.SiteSettings.amazon_through_trust_level));
  }.property('trust_level'),

  checkTrustLevelsAndBadges: function() {
    if (currentUser) {
      if (currentUser.get('trust_level') > Discourse.SiteSettings.amazon_through_trust_level){
        return false;
      }

      var badges = currentUser.get('badges');
      //Get plugin badge name
      console.log(currentUser.get('badges')); // uncomment for debugging

      var no_ads_badges = Discourse.SiteSettings.amazon_through_badge.split("|");	
      var badge;
      for (badge of badges){
        var no_ad_badge;
        for (no_ad_badge of no_ads_badges){
          if (badge.name.toLowerCase() == no_ad_badge.toLowerCase()) {
            //console.log('Do NOT show the Ads for ' + badge.name.toLowerCase()); // uncomment for debugging
            return false;  //Uncomment to disable ad's
          } else {
            //console.log('Show the Ads for ' + badge.name.toLowerCase() );  // uncomment for debugging
          }
        }
      }

      //Terminate by returning true if successfully looping through each Badge
      return true;

    }else{
      return false;
    }
  }.property('trust_level'),


});
