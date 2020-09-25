import md5 from "blueimp-md5";

import Event from "./lib/Event";
import browserEvent from "./lib/browserEvent";
import storage from "./lib/storage";
import config from "./lib/config";
import behavior from "./lib/behavior";
import activeTime from "./lib/activeTime";
import clientInfo from "./lib/client";
import browserTiming from "./lib/browserTiming";
import getPageInfo from "./lib/pageInfo";

export default class Statistic extends Event {
  constructor() {
    super();
    this._init();
  }

  _init() {
    activeTime.init();
    behavior.init();

    this.$emit("init", this);
    config.pageId = md5(config.appId + window.location.href);
    config.pvStartTime = new Date().valueOf();

    browserEvent.create(window, "load", () => {
      this.$emit("windowLoad", getPageInfo());
      this.$emit("pageStart", getPageInfo());
      this.$emit("clientInfo", clientInfo);
      setTimeout(() => {
        this.$emit("browserTiming", browserTiming());
      }, 5e3);
    });

    browserEvent.create(window, "unload", () => {
      storage.setData(
        config.namespaces + "_pageId_" + config.appId,
        config.pageId,
        true,
      );
      this.$emit(
        "windowUnload",
        Object.assign(behavior.getBehavior(), activeTime.getActiveTime()),
      );
      this.$emit(
        "pageClose",
        Object.assign(
          behavior.getUserBehavior(),
          activeTime.getUserActiveTime(),
        ),
      );
    });
  }

  pageStart() {
    activeTime.clearNoUse();
    config.pageId = md5(config.appId + window.location.href);
    config.pvStartTime = new Date().valueOf();
    this.$emit("pageStart", getPageInfo());
  }

  pageClose() {
    storage.setData(
      config.namespaces + "_pageId_" + config.appId,
      config.pageId,
      true,
    );
    config.parentPageId = config.pageId;
    this.$emit(
      "pageClose",
      Object.assign(behavior.getUserBehavior(), activeTime.getUserActiveTime()),
    );
  }

  userEvent(postData) {
    this.$emit("userEvent", postData);
  }
}
