// Helper functions to get browser info
function getBrowserInfo() {
  const ua = navigator.userAgent;
  return {
    browser_name: getBrowserName(ua),
    browser_version: getBrowserVersion(ua),
    os: getOS(ua),
    os_version: getOSVersion(ua),
    device_model: navigator.platform,
    country: Intl.DateTimeFormat().resolvedOptions().locale,
    language: navigator.language,
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

function getBrowserName(ua) {
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari")) return "Safari";
  if (ua.includes("Edge")) return "Edge";
  return "Unknown";
}

function getBrowserVersion(ua) {
  const match = ua.match(/(Firefox|Chrome|Safari|Edge)\/(\d+\.\d+)/);
  return match ? match[2] : "Unknown";
}

function getOS(ua) {
  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Mac OS")) return "macOS";
  if (ua.includes("Linux")) return "Linux";
  if (ua.includes("iPhone")) return "iOS";
  if (ua.includes("Android")) return "Android";
  return "Unknown";
}

function getOSVersion(ua) {
  const match = ua.match(/(?:Windows NT|Mac OS X|Android) ([0-9._]+)/);
  return match ? match[1] : "Unknown";
}

function buildStatsigClient(sdkKey, user, options) {
  const ClientClass =
    window.StatsigClient ||
    (window.statsig && window.statsig.StatsigClient) ||
    (window.Statsig && window.Statsig.StatsigClient);

  if (!ClientClass) {
    return null;
  }

  try {
    if (typeof ClientClass.makeSingleton === "function") {
      return ClientClass.makeSingleton(sdkKey, user, options);
    }
    if (typeof ClientClass.instance === "function") {
      return ClientClass.instance(sdkKey, user, options);
    }
    if (typeof ClientClass.getInstance === "function") {
      return ClientClass.getInstance(sdkKey, user, options);
    }
    return new ClientClass(sdkKey, user, options);
  } catch (_) {
    return null;
  }
}

async function initializeClientIfNeeded(client) {
  if (!client) return;
  if (typeof client.initializeAsync === "function") {
    await client.initializeAsync();
    return;
  }
  if (typeof client.initialize === "function") {
    await client.initialize();
  }
}

function resolveDynamicConfigValue(config, fallbackValue) {
  if (!config) return fallbackValue;

  if (typeof config.value === "object" && config.value !== null) {
    return config.value;
  }

  if (typeof config.get === "function") {
    try {
      // js-client DynamicConfig objects expose typed getters.
      const fallback =
        fallbackValue && typeof fallbackValue === "object" ? fallbackValue : {};
      const keys = Object.keys(fallback);
      if (keys.length > 0) {
        const value = {};
        keys.forEach(function (key) {
          value[key] = config.get(key, fallback[key]);
        });
        return value;
      }

      return {
        inProgress: config.get("inProgress", []),
        finished: config.get("finished", []),
      };
    } catch (_) {}
  }

  if (typeof config.getValue === "function") {
    try {
      const value = config.getValue();
      if (typeof value === "object" && value !== null) {
        return value;
      }
    } catch (_) {}
  }

  if (typeof config.toJSON === "function") {
    try {
      const value = config.toJSON();
      if (typeof value === "object" && value !== null) {
        return value;
      }
    } catch (_) {}
  }

  return fallbackValue;
}

function normalizeReadingListValue(value, fallbackValue) {
  if (typeof value === "string") {
    try {
      value = JSON.parse(value);
    } catch (_) {
      return fallbackValue;
    }
  }

  if (!value || typeof value !== "object") {
    return fallbackValue;
  }

  const inProgress = value.inProgress || value.in_progress || [];
  const finished = value.finished || value.completed || [];

  return {
    inProgress: Array.isArray(inProgress) ? inProgress : [],
    finished: Array.isArray(finished) ? finished : [],
  };
}

function findConfigByName(node, configName, depth) {
  if (!node || depth > 20) {
    return null;
  }

  if (typeof node !== "object") {
    return null;
  }

  if (Object.prototype.hasOwnProperty.call(node, configName)) {
    const direct = node[configName];
    if (direct && typeof direct === "object") {
      return direct.value || direct;
    }
  }

  if (node.name === configName) {
    return node.value || node.json_value || node;
  }

  for (const key in node) {
    if (!Object.prototype.hasOwnProperty.call(node, key)) continue;
    const found = findConfigByName(node[key], configName, depth + 1);
    if (found) return found;
  }

  return null;
}

function getConfigFromStatsigStorage(configName, fallbackValue) {
  try {
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (!key || !key.toLowerCase().includes("statsig")) {
        continue;
      }

      const raw = localStorage.getItem(key);
      if (!raw) continue;

      let parsed = null;
      try {
        parsed = JSON.parse(raw);
      } catch (_) {
        continue;
      }

      const found = findConfigByName(parsed, configName, 0);
      if (found) {
        return normalizeReadingListValue(found, fallbackValue);
      }
    }
  } catch (_) {}

  return fallbackValue;
}

function getDynamicConfigValue(configName, fallbackValue = {}) {
  const fallback =
    configName === "reading_list_dynamic_config"
      ? normalizeReadingListValue(fallbackValue, {
          inProgress: [],
          finished: [],
        })
      : fallbackValue;

<<<<<<< Updated upstream
    await statsig.initialize(
      window.STATSIG_CLIENT_KEY,
      { userID: "WebsiteUser" },
      {
        environment: { tier: window.JEKYLL_ENV },
      }
    );

    console.log("Analytics enabled");

    // Get IP address
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    ip = data.ip;

    // Get browser and system info
    const userAgent = navigator.userAgent;
    const browserInfo = {
      browser_name: getBrowserName(userAgent),
      browser_version: getBrowserVersion(userAgent),
      os: getOS(userAgent),
      os_version: getOSVersion(userAgent),
      device_model: navigator.platform,
      country: Intl.DateTimeFormat().resolvedOptions().locale,
      language: navigator.language,
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    statsig.logEvent("Project Site Access", null, {
      ...browserInfo,
      ip_address: ip,
      page: page_title,
    });

    console.log("Successfully logged user access event");
  } catch (error) {
    console.log("Failed to log analytics event:", error.message);
  }
=======
  let result = fallback;

  try {
    if (
      window.statsigClientSingleton &&
      typeof window.statsigClientSingleton.getDynamicConfig === "function"
    ) {
      const config = window.statsigClientSingleton.getDynamicConfig(configName);
      result = resolveDynamicConfigValue(config, fallback);
    }

    if (
      result === fallback &&
      window.statsig &&
      typeof window.statsig.getDynamicConfig === "function"
    ) {
      const config = window.statsig.getDynamicConfig(configName);
      result = resolveDynamicConfigValue(config, fallback);
    }
  } catch (error) {
    console.log("Failed to resolve Statsig dynamic config:", error.message);
  }

  if (configName === "reading_list_dynamic_config") {
    const normalized = normalizeReadingListValue(result, fallback);
    const hasData =
      normalized.inProgress.length > 0 || normalized.finished.length > 0;
    if (hasData) {
      return normalized;
    }

    return getConfigFromStatsigStorage(configName, fallback);
  }

  return result;
}

window.getStatsigDynamicConfigValue = getDynamicConfigValue;

async function initializeStatsig(page_title) {
  if (window.statsigInitPromise) {
    return window.statsigInitPromise;
  }

  window.statsigInitPromise = (async function () {
    let ip = "";
    try {
      console.log("Initializing Statsig");

      const baseUser = { userID: "WebsiteUser" };
      const options = {
        environment: { tier: window.JEKYLL_ENV },
      };
      let activeClient = null;
      let stableID = null;
      const legacyStatsig = window.statsig;

      // Prefer client-based SDKs (js-client + bundled variants).
      activeClient = buildStatsigClient(
        window.STATSIG_CLIENT_KEY,
        baseUser,
        options
      );

      if (activeClient) {
        await initializeClientIfNeeded(activeClient);
        const context = activeClient.getContext();
        stableID = context ? context.stableID : null;

        if (
          stableID &&
          typeof activeClient.updateUserAsync === "function"
        ) {
          await activeClient.updateUserAsync({
            ...baseUser,
            customIDs: { stableID },
          });
        }
      } else if (legacyStatsig && typeof legacyStatsig.initialize === "function") {
        await legacyStatsig.initialize(
          window.STATSIG_CLIENT_KEY,
          baseUser,
          options
        );
        const context =
          typeof legacyStatsig.getContext === "function"
            ? legacyStatsig.getContext()
            : null;
        stableID = context ? context.stableID : null;

        if (stableID && typeof legacyStatsig.updateUser === "function") {
          await legacyStatsig.updateUser({
            ...baseUser,
            customIDs: { stableID },
          });
        }
      }

      window.statsigClientSingleton = activeClient;
      window.getStatsigDynamicConfigValue = getDynamicConfigValue;

      if (!activeClient && !legacyStatsig) {
        console.log(
          "Statsig SDK global not detected. Expected StatsigClient or legacy statsig."
        );
      }

      console.log("Statsig StableID:", stableID);

      console.log("Analytics enabled");

      // Get IP address
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      ip = data.ip;

      // Get browser and system info
      const userAgent = navigator.userAgent;
      const browserInfo = {
        browser_name: getBrowserName(userAgent),
        browser_version: getBrowserVersion(userAgent),
        os: getOS(userAgent),
        os_version: getOSVersion(userAgent),
        device_model: navigator.platform,
        country: Intl.DateTimeFormat().resolvedOptions().locale,
        language: navigator.language,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };

      let didLogEvent = false;
      if (activeClient && typeof activeClient.logEvent === "function") {
        activeClient.logEvent("Project Site Access", null, {
          ...browserInfo,
          ip_address: ip,
          page: page_title,
          stable_id: stableID,
        });
        didLogEvent = true;
      } else if (
        legacyStatsig &&
        typeof legacyStatsig.logEvent === "function"
      ) {
        legacyStatsig.logEvent("Project Site Access", null, {
          ...browserInfo,
          ip_address: ip,
          page: page_title,
          stable_id: stableID,
        });
        didLogEvent = true;
      } else {
        console.log("Statsig client unavailable, skipping analytics event log");
      }

      if (didLogEvent) {
        console.log("Successfully logged user access event");
      }
    } catch (error) {
      console.log("Failed to log analytics event:", error.message);
    }
  })();

  return window.statsigInitPromise;
>>>>>>> Stashed changes
}

window.whenStatsigReady = function () {
  return window.statsigInitPromise || Promise.resolve();
};
