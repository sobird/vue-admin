/**
 * Languages Internationalization(语言国际化)
 * 
 * @author  Yang,junlong at 2018-08-07 18:33:40 build.
 * @version $Id$
 */
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Cookies from 'js-cookie';

import elementEnLocale from 'element-ui/lib/locale/lang/en';
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN';

// this.$cookie.set('key', 'value', 'expire', 'path', 'domain', 'secure');
Vue.use(VueI18n);

const messages = {
  en: {
    message: {
      hello: 'hello world'
    },
	...elementEnLocale
  },
  zh: {
    message: {
      hello: 'こんにちは、世界 {msg}'
    },
    ...elementZhLocale
  }
};

const i18n = new VueI18n({
  locale: Cookies.get('language') || 'zh', // set locale
  messages, // set locale messages
});

export default i18n;
