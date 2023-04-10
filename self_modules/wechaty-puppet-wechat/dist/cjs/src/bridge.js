"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bridge = void 0;
/**
 *   Wechaty - https://github.com/chatie/wechaty
 *
 *   @copyright 2016-2018 Huan LI <zixia@zixia.net>
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */
const events_1 = require("events");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const puppeteer_extra_1 = __importDefault(require("puppeteer-extra"));
const puppeteer_extra_plugin_stealth_1 = __importDefault(
  require("puppeteer-extra-plugin-stealth")
);
const state_switch_1 = require("state-switch");
const xml2js_1 = require("xml2js");
const gerror_1 = require("gerror");
const wechaty_puppet_1 = require("wechaty-puppet");
const config_js_1 = require("./config.js");
const cjs_js_1 = require("./cjs.js");
const mod_js_1 = require("./pure-function-helpers/mod.js");
const path = require("path");
class Bridge extends events_1.EventEmitter {
  options;
  browser;
  page;
  state;
  wrapAsync = (0, gerror_1.wrapAsyncError)((e) => this.emit("error", e));
  constructor(options) {
    super();
    this.options = options;
    wechaty_puppet_1.log.verbose("PuppetWeChatBridge", "constructor()");
    this.state = new state_switch_1.StateSwitch("PuppetWeChatBridge", {
      log: wechaty_puppet_1.log,
    });
  }
  async start() {
    wechaty_puppet_1.log.verbose("PuppetWeChatBridge", "start()");
    this.state.active("pending");
    try {
      this.browser = await this.initBrowser();
      wechaty_puppet_1.log.verbose(
        "PuppetWeChatBridge",
        "start() initBrowser() done"
      );
      this.on("load", this.wrapAsync(this.onLoad.bind(this)));
      const ready = new Promise((resolve) => this.once("ready", resolve));
      this.page = await this.initPage(this.browser);
      await ready;
      this.state.active(true);
      wechaty_puppet_1.log.verbose(
        "PuppetWeChatBridge",
        "start() initPage() done"
      );
    } catch (e) {
      wechaty_puppet_1.log.error(
        "PuppetWeChatBridge",
        "start() exception: %s",
        e
      );
      this.state.inactive(true);
      try {
        if (this.page) {
          await this.page.close();
        }
        if (this.browser) {
          await this.browser.close();
        }
      } catch (e2) {
        wechaty_puppet_1.log.error(
          "PuppetWeChatBridge",
          "start() exception %s, close page/browser exception %s",
          e,
          e2
        );
      }
      this.emit("error", e);
      throw e;
    }
  }
  async initBrowser() {
    wechaty_puppet_1.log.verbose("PuppetWeChatBridge", "initBrowser()");
    const launchOptions = { ...this.options.launchOptions };
    const headless = !this.options.head;
    const launchOptionsArgs = launchOptions.args || [];
    if (this.options.endpoint) {
      launchOptions.executablePath = this.options.endpoint;
    }
    let browserDir =
      path.join(__dirname).split("app.asar")[0] +
      "app.asar.unpacked\\node_modules\\puppeteer\\.local-chromium\\win64-982053\\chrome-win\\chrome.exe";
    const options = {
      ...launchOptions,
      args: [
        "--audio-output-channels=0",
        "--disable-default-apps",
        "--disable-translate",
        "--disable-gpu",
        "--disable-setuid-sandbox",
        "--disable-sync",
        "--hide-scrollbars",
        "--mute-audio",
        "--no-sandbox",
        ...launchOptionsArgs,
      ],
      headless,
      // executablePath: browserDir
      // executablePath: "D:\\FUTURE\\APP\\wx-bot-client\\node_modules\\.pnpm\\registry.npmmirror.com+puppeteer@13.7.0\\node_modules\\puppeteer\\.local-chromium\\win64-982053\\chrome-win\\chrome.exe"
    };
    console.log("项目目录：", path.join(__dirname));
    wechaty_puppet_1.log.verbose(
      "PuppetWeChatBridge",
      "initBrowser() with options=%s",
      JSON.stringify(options)
    );
    let browser;
    if (!this.options.stealthless) {
      /**
       * Puppeteer 4.0
       *   https://github.com/berstend/puppeteer-extra/issues/211#issuecomment-636283110
       */
      const plugin = (0, puppeteer_extra_plugin_stealth_1.default)();
      plugin.onBrowser = () => {};
      puppeteer_extra_1.default.use(plugin);
      browser = await window.ipc.launchBrowser({
        plugin,
        options,
      });
      // browser = await puppeteer_extra_1.default.launch(options);
    } else {
      // console.log('puppeteerExtra.options2：', options);
      browser = await puppeteer_1.default.launch(options);
    }
    const version = await browser.version();
    wechaty_puppet_1.log.verbose(
      "PuppetWeChatBridge",
      "initBrowser() version: %s",
      version
    );
    return browser;
  }
  async onDialog(dialog) {
    wechaty_puppet_1.log.warn(
      "PuppetWeChatBridge",
      "onDialog() page.on(dialog) type:%s message:%s",
      dialog.type,
      dialog.message()
    );
    try {
      // XXX: Which ONE is better?
      await dialog.accept();
      // await dialog.dismiss()
    } catch (e) {
      wechaty_puppet_1.log.error(
        "PuppetWeChatBridge",
        "onDialog() dialog.dismiss() reject: %s",
        e
      );
    }
    this.emit(
      "error",
      gerror_1.GError.from(`${dialog.type}(${dialog.message()})`)
    );
  }
  async onLoad(page) {
    wechaty_puppet_1.log.verbose(
      "PuppetWeChatBridge",
      "onLoad() page.url=%s",
      page.url()
    );
    if (this.state.inactive()) {
      wechaty_puppet_1.log.verbose(
        "PuppetWeChatBridge",
        "onLoad() OFF state detected. NOP"
      );
      return; // reject(new Error('onLoad() OFF state detected'))
    }
    try {
      const emitExist = await page.evaluate(() => {
        return typeof window["wechatyPuppetBridgeEmit"] === "function";
      });
      if (!emitExist) {
        /**
         * expose window['wechatyPuppetBridgeEmit'] at here.
         * enable wechaty-bro.js to emit message to bridge
         */
        await page.exposeFunction(
          "wechatyPuppetBridgeEmit",
          this.emit.bind(this)
        );
      }
      await this.readyAngular(page);
      await this.inject(page);
      await this.clickSwitchAccount(page);
      this.emit("ready");
    } catch (e) {
      wechaty_puppet_1.log.error(
        "PuppetWeChatBridge",
        "onLoad() exception: %s",
        e
      );
      await page.close();
      this.emit("error", e);
    }
  }
  async initPage(browser) {
    wechaty_puppet_1.log.verbose("PuppetWeChatBridge", "initPage()");
    // set this in time because the following callbacks
    // might be called before initPage() return.
    const page = (this.page = await browser.newPage());
    /**
     * Can we support UOS with puppeteer? #127
     *  https://github.com/wechaty/wechaty-puppet-wechat/issues/127
     */
    if (this.options.uos) {
      await this.uosPatch(page);
    }
    page.on("error", (e) => this.emit("error", e));
    page.on("dialog", this.wrapAsync(this.onDialog.bind(this)));
    const cookieList =
      (await this.options.memory.get(config_js_1.MEMORY_SLOT)) || [];
    let url = this.entryUrl(cookieList);
    if (this.options.uos) {
      url = url + "?lang=zh_CN&target=t";
    }
    wechaty_puppet_1.log.verbose(
      "PuppetWeChatBridge",
      "initPage() before page.goto(url)"
    );
    // set timeout 60000 ms，30000ms always timeout
    page.setDefaultTimeout(60000);
    // Does this related to(?) the CI Error: exception: Navigation Timeout Exceeded: 30000ms exceeded
    await page.goto(url);
    wechaty_puppet_1.log.verbose(
      "PuppetWeChatBridge",
      "initPage() after page.goto(url)"
    );
    // await this.uosPatch(page)
    void this.uosPatch;
    if (cookieList.length) {
      await page.setCookie(...cookieList);
      wechaty_puppet_1.log.silly(
        "PuppetWeChatBridge",
        "initPage() page.setCookie() %s cookies set back",
        cookieList.length
      );
    }
    page.on("load", () => this.emit("load", page));
    await page.reload(); // reload page to make effect of the new cookie.
    return page;
  }
  async uosPatch(page) {
    /**
     * Can we support UOS with puppeteer? #127
     *  https://github.com/wechaty/wechaty-puppet-wechat/issues/127
     *
     * Credit: @luvletter2333 https://github.com/luvletter2333
     */
    const UOS_PATCH_CLIENT_VERSION = "2.0.0";
    const UOS_PATCH_EXTSPAM =
      this.options.uosExtSpam ??
      "Go8FCIkFEokFCggwMDAwMDAwMRAGGvAESySibk50w5Wb3uTl2c2h64jVVrV7gNs06GFlWplHQbY/5FfiO++1yH4ykCyNPWKXmco+wfQzK5R98D3so7rJ5LmGFvBLjGceleySrc3SOf2Pc1gVehzJgODeS0lDL3/I/0S2SSE98YgKleq6Uqx6ndTy9yaL9qFxJL7eiA/R3SEfTaW1SBoSITIu+EEkXff+Pv8NHOk7N57rcGk1w0ZzRrQDkXTOXFN2iHYIzAAZPIOY45Lsh+A4slpgnDiaOvRtlQYCt97nmPLuTipOJ8Qc5pM7ZsOsAPPrCQL7nK0I7aPrFDF0q4ziUUKettzW8MrAaiVfmbD1/VkmLNVqqZVvBCtRblXb5FHmtS8FxnqCzYP4WFvz3T0TcrOqwLX1M/DQvcHaGGw0B0y4bZMs7lVScGBFxMj3vbFi2SRKbKhaitxHfYHAOAa0X7/MSS0RNAjdwoyGHeOepXOKY+h3iHeqCvgOH6LOifdHf/1aaZNwSkGotYnYScW8Yx63LnSwba7+hESrtPa/huRmB9KWvMCKbDThL/nne14hnL277EDCSocPu3rOSYjuB9gKSOdVmWsj9Dxb/iZIe+S6AiG29Esm+/eUacSba0k8wn5HhHg9d4tIcixrxveflc8vi2/wNQGVFNsGO6tB5WF0xf/plngOvQ1/ivGV/C1Qpdhzznh0ExAVJ6dwzNg7qIEBaw+BzTJTUuRcPk92Sn6QDn2Pu3mpONaEumacjW4w6ipPnPw+g2TfywJjeEcpSZaP4Q3YV5HG8D6UjWA4GSkBKculWpdCMadx0usMomsSS/74QgpYqcPkmamB4nVv1JxczYITIqItIKjD35IGKAUwAA==";
    const uosHeaders = {
      "client-version": UOS_PATCH_CLIENT_VERSION,
      extspam: UOS_PATCH_EXTSPAM,
    };
    // add RequestInterception
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      const url = new URL(req.url());
      if (url.pathname === "/cgi-bin/mmwebwx-bin/webwxnewloginpage") {
        const override = {
          headers: {
            ...req.headers(),
            ...uosHeaders,
          },
        };
        this.wrapAsync(req.continue(override));
      } else {
        this.wrapAsync(req.continue());
      }
    });
  }
  async readyAngular(page) {
    wechaty_puppet_1.log.verbose("PuppetWeChatBridge", "readyAngular()");
    try {
      await page.waitForFunction("typeof window.angular !== 'undefined'");
    } catch (e) {
      wechaty_puppet_1.log.verbose(
        "PuppetWeChatBridge",
        "readyAngular() exception: %s",
        e
      );
      const blockedMessage = await this.testBlockedMessage();
      if (blockedMessage) {
        // Wechat Account Blocked
        // TODO: advertise for puppet-padchat
        wechaty_puppet_1.log.info(
          "PuppetWeChatBridge",
          `

        Please see: Account Login Issue <https://github.com/wechaty/wechaty/issues/872>

        `
        );
        throw new Error(blockedMessage);
      } else {
        throw e;
      }
    }
  }
  async inject(page) {
    wechaty_puppet_1.log.verbose("PuppetWeChatBridge", "inject()");
    const WECHATY_BRO_JS_FILE = path_1.default.join(
      cjs_js_1.codeRoot,
      "src",
      "wechaty-bro.js"
    );
    try {
      const sourceCode = fs_1.default
        .readFileSync(WECHATY_BRO_JS_FILE)
        .toString();
      let retObj = await page.evaluate(sourceCode);
      if (retObj && /^(2|3)/.test(retObj.code.toString())) {
        // HTTP Code 2XX & 3XX
        wechaty_puppet_1.log.silly(
          "PuppetWeChatBridge",
          "inject() eval(Wechaty) return code[%d] message[%s]",
          retObj.code,
          retObj.message
        );
      } else {
        // HTTP Code 4XX & 5XX
        throw new Error(
          "execute injectio error: " + retObj?.code + ", " + retObj?.message
        );
      }
      retObj = await this.proxyWechaty("init");
      if (retObj && /^(2|3)/.test(retObj.code.toString())) {
        // HTTP Code 2XX & 3XX
        wechaty_puppet_1.log.silly(
          "PuppetWeChatBridge",
          "inject() Wechaty.init() return code[%d] message[%s]",
          retObj.code,
          retObj.message
        );
      } else {
        // HTTP Code 4XX & 5XX
        throw new Error(
          "execute proxyWechaty(init) error: " +
            retObj?.code +
            ", " +
            retObj?.message
        );
      }
      const SUCCESS_CIPHER = "ding() OK!";
      const future = new Promise((resolve) => this.once("dong", resolve));
      this.ding(SUCCESS_CIPHER);
      const r = await future;
      if (r !== SUCCESS_CIPHER) {
        throw new Error("fail to get right return from call ding()");
      }
      wechaty_puppet_1.log.silly("PuppetWeChatBridge", "inject() ding success");
    } catch (e) {
      wechaty_puppet_1.log.verbose(
        "PuppetWeChatBridge",
        "inject() exception: %s. stack: %s",
        e.message,
        e.stack
      );
      throw e;
    }
  }
  async logout() {
    wechaty_puppet_1.log.verbose("PuppetWeChatBridge", "logout()");
    try {
      return await this.proxyWechaty("logout");
    } catch (e) {
      wechaty_puppet_1.log.error(
        "PuppetWeChatBridge",
        "logout() exception: %s",
        e.message
      );
      throw e;
    }
  }
  async stop() {
    wechaty_puppet_1.log.verbose("PuppetWeChatBridge", "stop()");
    if (!this.page) {
      throw new Error("no page");
    }
    if (!this.browser) {
      throw new Error("no browser");
    }
    this.state.inactive("pending");
    try {
      await this.page.close();
      wechaty_puppet_1.log.silly(
        "PuppetWeChatBridge",
        "stop() page.close()-ed"
      );
    } catch (e) {
      wechaty_puppet_1.log.warn(
        "PuppetWeChatBridge",
        "stop() page.close() exception: %s",
        e
      );
    }
    try {
      await this.browser.close();
      wechaty_puppet_1.log.silly(
        "PuppetWeChatBridge",
        "stop() browser.close()-ed"
      );
    } catch (e) {
      wechaty_puppet_1.log.warn(
        "PuppetWeChatBridge",
        "stop() browser.close() exception: %s",
        e
      );
    }
    this.state.inactive(true);
  }
  async getUserName() {
    wechaty_puppet_1.log.verbose("PuppetWeChatBridge", "getUserName()");
    try {
      const userName = await this.proxyWechaty("getUserName");
      return userName;
    } catch (e) {
      wechaty_puppet_1.log.error(
        "PuppetWeChatBridge",
        "getUserName() exception: %s",
        e.message
      );
      throw e;
    }
  }
  async contactAlias(contactId, alias) {
    try {
      return await this.proxyWechaty("contactRemark", contactId, alias);
    } catch (e) {
      wechaty_puppet_1.log.verbose(
        "PuppetWeChatBridge",
        "contactRemark() exception: %s",
        e.message
      );
      // Issue #509 return false instead of throw when contact is not a friend.
      // throw e
      wechaty_puppet_1.log.warn(
        "PuppetWeChatBridge",
        "contactRemark() does not work on contact is not a friend"
      );
      return false;
    }
  }
  async contactList() {
    try {
      return await this.proxyWechaty("contactList");
    } catch (e) {
      wechaty_puppet_1.log.error(
        "PuppetWeChatBridge",
        "contactList() exception: %s",
        e.message
      );
      throw e;
    }
  }
  async roomList() {
    try {
      return await this.proxyWechaty("roomList");
    } catch (e) {
      wechaty_puppet_1.log.error(
        "PuppetWeChatBridge",
        "roomList() exception: %s",
        e.message
      );
      throw e;
    }
  }
  async roomDelMember(roomId, contactId) {
    if (!roomId || !contactId) {
      throw new Error("no roomId or contactId");
    }
    try {
      return await this.proxyWechaty("roomDelMember", roomId, contactId);
    } catch (e) {
      wechaty_puppet_1.log.error(
        "PuppetWeChatBridge",
        "roomDelMember(%s, %s) exception: %s",
        roomId,
        contactId,
        e.message
      );
      throw e;
    }
  }
  async roomAddMember(roomId, contactId) {
    wechaty_puppet_1.log.verbose(
      "PuppetWeChatBridge",
      "roomAddMember(%s, %s)",
      roomId,
      contactId
    );
    if (!roomId || !contactId) {
      throw new Error("no roomId or contactId");
    }
    try {
      return await this.proxyWechaty("roomAddMember", roomId, contactId);
    } catch (e) {
      wechaty_puppet_1.log.error(
        "PuppetWeChatBridge",
        "roomAddMember(%s, %s) exception: %s",
        roomId,
        contactId,
        e.message
      );
      throw e;
    }
  }
  async roomModTopic(roomId, topic) {
    if (!roomId) {
      throw new Error("no roomId");
    }
    try {
      await this.proxyWechaty("roomModTopic", roomId, topic);
      return topic;
    } catch (e) {
      wechaty_puppet_1.log.error(
        "PuppetWeChatBridge",
        "roomModTopic(%s, %s) exception: %s",
        roomId,
        topic,
        e.message
      );
      throw e;
    }
  }
  async roomCreate(contactIdList, topic) {
    if (!Array.isArray(contactIdList)) {
      throw new Error("no valid contactIdList");
    }
    try {
      const roomId = await this.proxyWechaty(
        "roomCreate",
        contactIdList,
        topic
      );
      if (typeof roomId === "object") {
        // It is a Error Object send back by callback in browser(WechatyBro)
        throw roomId;
      }
      return roomId;
    } catch (e) {
      wechaty_puppet_1.log.error(
        "PuppetWeChatBridge",
        "roomCreate(%s) exception: %s",
        contactIdList,
        e.message
      );
      throw e;
    }
  }
  async verifyUserRequest(contactId, hello) {
    wechaty_puppet_1.log.verbose(
      "PuppetWeChatBridge",
      "verifyUserRequest(%s, %s)",
      contactId,
      hello
    );
    if (!contactId) {
      throw new Error("no valid contactId");
    }
    try {
      return await this.proxyWechaty("verifyUserRequest", contactId, hello);
    } catch (e) {
      wechaty_puppet_1.log.error(
        "PuppetWeChatBridge",
        "verifyUserRequest(%s, %s) exception: %s",
        contactId,
        hello,
        e.message
      );
      throw e;
    }
  }
  async verifyUserOk(contactId, ticket) {
    wechaty_puppet_1.log.verbose(
      "PuppetWeChatBridge",
      "verifyUserOk(%s, %s)",
      contactId,
      ticket
    );
    if (!contactId || !ticket) {
      throw new Error("no valid contactId or ticket");
    }
    try {
      return await this.proxyWechaty("verifyUserOk", contactId, ticket);
    } catch (e) {
      wechaty_puppet_1.log.error(
        "PuppetWeChatBridge",
        "verifyUserOk(%s, %s) exception: %s",
        contactId,
        ticket,
        e.message
      );
      throw e;
    }
  }
  async send(toUserName, text) {
    wechaty_puppet_1.log.verbose(
      "PuppetWeChatBridge",
      "send(%s, %s)",
      toUserName,
      text
    );
    if (!toUserName) {
      throw new Error("UserName not found");
    }
    if (!text) {
      throw new Error("cannot say nothing");
    }
    try {
      const ret = await this.proxyWechaty("send", toUserName, text);
      if (!ret) {
        throw new Error("send fail");
      }
    } catch (e) {
      wechaty_puppet_1.log.error(
        "PuppetWeChatBridge",
        "send() exception: %s",
        e.message
      );
      throw e;
    }
  }
  async getMsgImg(id) {
    wechaty_puppet_1.log.verbose("PuppetWeChatBridge", "getMsgImg(%s)", id);
    try {
      return await this.proxyWechaty("getMsgImg", id);
    } catch (e) {
      wechaty_puppet_1.log.silly(
        "PuppetWeChatBridge",
        "proxyWechaty(getMsgImg, %d) exception: %s",
        id,
        e.message
      );
      throw e;
    }
  }
  async getMsgEmoticon(id) {
    wechaty_puppet_1.log.verbose(
      "PuppetWeChatBridge",
      "getMsgEmoticon(%s)",
      id
    );
    try {
      return await this.proxyWechaty("getMsgEmoticon", id);
    } catch (e) {
      wechaty_puppet_1.log.silly(
        "PuppetWeChatBridge",
        "proxyWechaty(getMsgEmoticon, %d) exception: %s",
        id,
        e.message
      );
      throw e;
    }
  }
  async getMsgVideo(id) {
    wechaty_puppet_1.log.verbose("PuppetWeChatBridge", "getMsgVideo(%s)", id);
    try {
      return await this.proxyWechaty("getMsgVideo", id);
    } catch (e) {
      wechaty_puppet_1.log.silly(
        "PuppetWeChatBridge",
        "proxyWechaty(getMsgVideo, %d) exception: %s",
        id,
        e.message
      );
      throw e;
    }
  }
  async getMsgVoice(id) {
    wechaty_puppet_1.log.verbose("PuppetWeChatBridge", "getMsgVoice(%s)", id);
    try {
      return await this.proxyWechaty("getMsgVoice", id);
    } catch (e) {
      wechaty_puppet_1.log.silly(
        "PuppetWeChatBridge",
        "proxyWechaty(getMsgVoice, %d) exception: %s",
        id,
        e.message
      );
      throw e;
    }
  }
  async getMsgPublicLinkImg(id) {
    wechaty_puppet_1.log.verbose(
      "PuppetWeChatBridge",
      "getMsgPublicLinkImg(%s)",
      id
    );
    try {
      return await this.proxyWechaty("getMsgPublicLinkImg", id);
    } catch (e) {
      wechaty_puppet_1.log.silly(
        "PuppetWeChatBridge",
        "proxyWechaty(getMsgPublicLinkImg, %d) exception: %s",
        id,
        e.message
      );
      throw e;
    }
  }
  async getMessage(id) {
    const doGet = async () => {
      const rawPayload = await this.proxyWechaty("getMessage", id);
      if (rawPayload && Object.keys(rawPayload).length > 0) {
        return rawPayload;
      }
      throw new Error("doGet fail");
    };
    try {
      const rawPayload = await mod_js_1.retryPolicy.execute(doGet);
      return rawPayload;
    } catch (e) {
      wechaty_puppet_1.log.error(
        "PuppetWeChatBridge",
        "getMessage() rejection: %s",
        e.message
      );
      throw e;
    }
  }
  async getContact(id) {
    const doGet = async () => {
      const rawPayload = await this.proxyWechaty("getContact", id);
      if (rawPayload && Object.keys(rawPayload).length > 0) {
        return rawPayload;
      }
      throw new Error("doGet fail");
    };
    try {
      const rawPayload = await mod_js_1.retryPolicy.execute(doGet);
      return rawPayload;
    } catch (e) {
      wechaty_puppet_1.log.error(
        "PuppetWeChatBridge",
        "getContact() rejection: %s",
        e.message
      );
      throw e;
    }
  }
  async getBaseRequest() {
    wechaty_puppet_1.log.verbose("PuppetWeChatBridge", "getBaseRequest()");
    try {
      return await this.proxyWechaty("getBaseRequest");
    } catch (e) {
      wechaty_puppet_1.log.silly(
        "PuppetWeChatBridge",
        "proxyWechaty(getBaseRequest) exception: %s",
        e.message
      );
      throw e;
    }
  }
  async getPassticket() {
    wechaty_puppet_1.log.verbose("PuppetWeChatBridge", "getPassticket()");
    try {
      return await this.proxyWechaty("getPassticket");
    } catch (e) {
      wechaty_puppet_1.log.silly(
        "PuppetWeChatBridge",
        "proxyWechaty(getPassticket) exception: %s",
        e.message
      );
      throw e;
    }
  }
  async getCheckUploadUrl() {
    wechaty_puppet_1.log.verbose("PuppetWeChatBridge", "getCheckUploadUrl()");
    try {
      return await this.proxyWechaty("getCheckUploadUrl");
    } catch (e) {
      wechaty_puppet_1.log.silly(
        "PuppetWeChatBridge",
        "proxyWechaty(getCheckUploadUrl) exception: %s",
        e.message
      );
      throw e;
    }
  }
  async getUploadMediaUrl() {
    wechaty_puppet_1.log.verbose("PuppetWeChatBridge", "getUploadMediaUrl()");
    try {
      return await this.proxyWechaty("getUploadMediaUrl");
    } catch (e) {
      wechaty_puppet_1.log.silly(
        "PuppetWeChatBridge",
        "proxyWechaty(getUploadMediaUrl) exception: %s",
        e.message
      );
      throw e;
    }
  }
  async sendMedia(mediaData) {
    wechaty_puppet_1.log.verbose("PuppetWeChatBridge", "sendMedia(mediaData)");
    if (!mediaData.ToUserName) {
      throw new Error("UserName not found");
    }
    if (!mediaData.MediaId) {
      throw new Error("cannot say nothing");
    }
    try {
      return await this.proxyWechaty("sendMedia", mediaData);
    } catch (e) {
      wechaty_puppet_1.log.error(
        "PuppetWeChatBridge",
        "sendMedia() exception: %s",
        e.message
      );
      throw e;
    }
  }
  async forward(baseData, patchData) {
    wechaty_puppet_1.log.verbose("PuppetWeChatBridge", "forward()");
    if (!baseData.ToUserName) {
      throw new Error("UserName not found");
    }
    if (
      !patchData.MMActualContent &&
      !patchData.MMSendContent &&
      !patchData.Content
    ) {
      throw new Error("cannot say nothing");
    }
    try {
      return await this.proxyWechaty("forward", baseData, patchData);
    } catch (e) {
      wechaty_puppet_1.log.error(
        "PuppetWeChatBridge",
        "forward() exception: %s",
        e.message
      );
      throw e;
    }
  }
  /**
   * Proxy Call to Wechaty in Bridge
   */
  async proxyWechaty(wechatyFunc, ...args) {
    wechaty_puppet_1.log.silly(
      "PuppetWeChatBridge",
      "proxyWechaty(%s%s)",
      wechatyFunc,
      args.length === 0 ? "" : ", " + args.join(", ")
    );
    if (!this.page) {
      throw new Error("no page");
    }
    try {
      const noWechaty = await this.page.evaluate(() => {
        return typeof WechatyBro === "undefined";
      });
      if (noWechaty) {
        const e = new Error("there is no WechatyBro in browser(yet)");
        throw e;
      }
    } catch (e) {
      wechaty_puppet_1.log.warn(
        "PuppetWeChatBridge",
        "proxyWechaty() noWechaty exception: %s",
        e
      );
      throw e;
    }
    const argsEncoded = Buffer.from(
      encodeURIComponent(JSON.stringify(args))
    ).toString("base64");
    // see: http://blog.sqrtthree.com/2015/08/29/utf8-to-b64/
    const argsDecoded = `JSON.parse(decodeURIComponent(window.atob('${argsEncoded}')))`;
    const wechatyScript = `
      WechatyBro
        .${wechatyFunc}
        .apply(
          undefined,
          ${argsDecoded},
        )
    `.replace(/[\n\s]+/, " ");
    // log.silly('PuppetWeChatBridge', 'proxyWechaty(%s, ...args) %s', wechatyFunc, wechatyScript)
    // console.log('proxyWechaty wechatyFunc args[0]: ')
    // console.log(args[0])
    try {
      const ret = await this.page.evaluate(wechatyScript);
      return ret;
    } catch (e) {
      wechaty_puppet_1.log.verbose(
        "PuppetWeChatBridge",
        "proxyWechaty(%s, %s) ",
        wechatyFunc,
        args.join(", ")
      );
      wechaty_puppet_1.log.warn(
        "PuppetWeChatBridge",
        "proxyWechaty() exception: %s",
        e.message
      );
      throw e;
    }
  }
  ding(data) {
    wechaty_puppet_1.log.verbose("PuppetWeChatBridge", "ding(%s)", data || "");
    this.proxyWechaty("ding", data)
      .then((dongData) => {
        return this.emit("dong", dongData);
      })
      .catch((e) => {
        wechaty_puppet_1.log.error(
          "PuppetWeChatBridge",
          "ding(%s) exception: %s",
          data,
          e.message
        );
        this.emit("error", e);
      });
  }
  preHtmlToXml(text) {
    wechaty_puppet_1.log.verbose("PuppetWeChatBridge", "preHtmlToXml()");
    const preRegex = /^<pre[^>]*>([^<]+)<\/pre>$/i;
    const matches = text.match(preRegex);
    if (!matches) {
      return text;
    }
    return (0, mod_js_1.unescapeHtml)(matches[1]);
  }
  async innerHTML() {
    const html = await this.evaluate(() => {
      return window.document.body.innerHTML;
    });
    return html;
  }
  /**
   * Throw if there's a blocked message
   */
  async testBlockedMessage(text) {
    if (!text) {
      text = await this.innerHTML();
    }
    if (!text) {
      throw new Error("testBlockedMessage() no text found!");
    }
    const textSnip = text.substr(0, 50).replace(/\n/, "");
    wechaty_puppet_1.log.verbose(
      "PuppetWeChatBridge",
      "testBlockedMessage(%s)",
      textSnip
    );
    let obj;
    try {
      // see unit test for detail
      const tryXmlText = this.preHtmlToXml(text);
      // obj = JSON.parse(toJson(tryXmlText))
      obj = await new Promise((resolve, reject) => {
        (0, xml2js_1.parseString)(
          tryXmlText,
          { explicitArray: false },
          (err, result) => {
            if (err) {
              return reject(err);
            }
            return resolve(result);
          }
        );
      });
    } catch (e) {
      wechaty_puppet_1.log.warn(
        "PuppetWeChatBridge",
        "testBlockedMessage() toJson() exception: %s",
        e
      );
      return false;
    }
    if (!obj) {
      // FIXME: when will this happen?
      wechaty_puppet_1.log.warn(
        "PuppetWeChatBridge",
        "testBlockedMessage() toJson(%s) return empty obj",
        textSnip
      );
      return false;
    }
    if (!obj.error) {
      return false;
    }
    const ret = +obj.error.ret;
    const message = obj.error.message;
    wechaty_puppet_1.log.warn(
      "PuppetWeChatBridge",
      "testBlockedMessage() error.ret=%s",
      ret
    );
    if (ret === 1203) {
      // <error>
      // <ret>1203</ret>
      // <message>当前登录环境异常。为了你的帐号安全，暂时不能登录web微信。你可以通过手机客户端或者windows微信登录。</message>
      // </error>
      return message;
    }
    return message; // other error message
    // return new Promise<string | false>(resolve => {
    //   parseString(tryXmlText, { explicitArray: false }, (err, obj: BlockedMessage) => {
    //     if (err) {  // HTML can not be parsed to JSON
    //       return resolve(false)
    //     }
    //     if (!obj) {
    //       // FIXME: when will this happen?
    //       log.warn('PuppetWeChatBridge', 'testBlockedMessage() parseString(%s) return empty obj', textSnip)
    //       return resolve(false)
    //     }
    //     if (!obj.error) {
    //       return resolve(false)
    //     }
    //     const ret     = +obj.error.ret
    //     const message =  obj.error.message
    //     log.warn('PuppetWeChatBridge', 'testBlockedMessage() error.ret=%s', ret)
    //     if (ret === 1203) {
    //       // <error>
    //       // <ret>1203</ret>
    //       // <message>当前登录环境异常。为了你的帐号安全，暂时不能登录web微信。你可以通过手机客户端或者windows微信登录。</message>
    //       // </error>
    //       return resolve(message)
    //     }
    //     return resolve(message) // other error message
    //   })
    // })
  }
  async clickSwitchAccount(page) {
    wechaty_puppet_1.log.verbose("PuppetWeChatBridge", "clickSwitchAccount()");
    // https://github.com/GoogleChrome/puppeteer/issues/537#issuecomment-334918553
    // async function listXpath(thePage: Page, xpath: string): Promise<ElementHandle[]> {
    //   log.verbose('PuppetWeChatBridge', 'clickSwitchAccount() listXpath()')
    //   try {
    //     const nodeHandleList = await (thePage as any).evaluateHandle(xpathInner => {
    //       const nodeList: Node[] = []
    //       const query = document.evaluate(xpathInner, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
    //       for (let i = 0, length = query.snapshotLength; i < length; ++i) {
    //         nodeList.push(query.snapshotItem(i))
    //       }
    //       return nodeList
    //     }, xpath)
    //     const properties = await nodeHandleList.getProperties()
    //     const elementHandleList:  ElementHandle[] = []
    //     const releasePromises:    Promise<void>[] = []
    //     for (const property of properties.values()) {
    //       const element = property.asElement()
    //       if (element)
    //         elementHandleList.push(element)
    //       else
    //         releasePromises.push(property.dispose())
    //     }
    //     await Promise.all(releasePromises)
    //     return elementHandleList
    //   } catch (e) {
    //     log.verbose('PuppetWeChatBridge', 'clickSwitchAccount() listXpath() exception: %s', e as Error)
    //     return []
    //   }
    // }
    // TODO: use page.$x() (with puppeteer v1.1 or above) to replace DIY version of listXpath() instead.
    // See: https://github.com/GoogleChrome/puppeteer/blob/v1.1.0/docs/api.md#pagexexpression
    const XPATH_SELECTOR =
      "//div[contains(@class,'association') and contains(@class,'show')]/a[@ng-click='qrcodeLogin()']";
    try {
      // const [button] = await listXpath(page, XPATH_SELECTOR)
      const [button] = await page.$x(XPATH_SELECTOR);
      if (button) {
        await button.click();
        wechaty_puppet_1.log.silly(
          "PuppetWeChatBridge",
          "clickSwitchAccount() clicked!"
        );
        return true;
      } else {
        wechaty_puppet_1.log.silly(
          "PuppetWeChatBridge",
          "clickSwitchAccount() button not found"
        );
        return false;
      }
    } catch (e) {
      wechaty_puppet_1.log.silly(
        "PuppetWeChatBridge",
        "clickSwitchAccount() exception: %s",
        e
      );
      throw e;
    }
  }
  async hostname() {
    wechaty_puppet_1.log.verbose("PuppetWeChatBridge", "hostname()");
    if (!this.page) {
      throw new Error("no page");
    }
    try {
      const hostname = await this.page.evaluate(() => window.location.hostname);
      wechaty_puppet_1.log.silly(
        "PuppetWeChatBridge",
        "hostname() got %s",
        hostname
      );
      return hostname;
    } catch (e) {
      wechaty_puppet_1.log.error(
        "PuppetWeChatBridge",
        "hostname() exception: %s",
        e
      );
      this.emit("error", e);
      return null;
    }
  }
  async cookies(cookieList) {
    if (!this.page) {
      throw new Error("no page");
    }
    if (cookieList) {
      try {
        await this.page.setCookie(...cookieList);
      } catch (e) {
        wechaty_puppet_1.log.error(
          "PuppetWeChatBridge",
          "cookies(%s) reject: %s",
          cookieList,
          e
        );
        this.emit("error", e);
      }
      // RETURN
    } else {
      cookieList = await this.page.cookies();
      return cookieList;
    }
  }
  /**
   * name
   */
  entryUrl(cookieList) {
    wechaty_puppet_1.log.verbose(
      "PuppetWeChatBridge",
      "cookieDomain(%s)",
      cookieList
    );
    /**
     * `?target=t` is from https://github.com/wechaty/wechaty-puppet-wechat/pull/129
     */
    const DEFAULT_URL = "https://wx.qq.com";
    if (!cookieList || cookieList.length === 0) {
      wechaty_puppet_1.log.silly(
        "PuppetWeChatBridge",
        "cookieDomain() no cookie, return default %s",
        DEFAULT_URL
      );
      return DEFAULT_URL;
    }
    const wxCookieList = cookieList.filter((c) =>
      /^webwx_auth_ticket|webwxuvid$/.test(c.name)
    );
    if (!wxCookieList.length) {
      wechaty_puppet_1.log.silly(
        "PuppetWeChatBridge",
        "cookieDomain() no valid cookie, return default hostname"
      );
      return DEFAULT_URL;
    }
    let domain = wxCookieList[0].domain;
    if (!domain) {
      wechaty_puppet_1.log.silly(
        "PuppetWeChatBridge",
        "cookieDomain() no valid domain in cookies, return default hostname"
      );
      return DEFAULT_URL;
    }
    domain = domain.slice(1);
    if (domain === "wechat.com") {
      domain = "web.wechat.com";
    }
    let url;
    if (/^http/.test(domain)) {
      url = domain;
    } else {
      // Protocol error (Page.navigate): Cannot navigate to invalid URL undefined
      url = `https://${domain}`;
    }
    wechaty_puppet_1.log.silly(
      "PuppetWeChatBridge",
      "cookieDomain() got %s",
      url
    );
    return url;
  }
  async reload() {
    wechaty_puppet_1.log.verbose("PuppetWeChatBridge", "reload()");
    if (!this.page) {
      throw new Error("no page");
    }
    await this.page.reload();
  }
  async evaluate(fn, ...args) {
    wechaty_puppet_1.log.silly("PuppetWeChatBridge", "evaluate()");
    if (!this.page) {
      throw new Error("no page");
    }
    try {
      return await this.page.evaluate(fn, ...args);
    } catch (e) {
      wechaty_puppet_1.log.error(
        "PuppetWeChatBridge",
        "evaluate() exception: %s",
        e
      );
      this.emit("error", e);
      return null;
    }
  }
}
exports.Bridge = Bridge;
exports.default = Bridge;
//# sourceMappingURL=bridge.js.map
