const FEATURE_FLAGS_API_URL = "https://featureflags.logoas.xyz/api/featureflags";
const FEATURE_FLAGS_USER = "project-website";
const FEATURE_FLAGS_API_KEY = "ff_client_k9nDg2_3i13IO9cIcMcg3RF0a1umbhfU";

const EMPTY_FEATURE_FLAG_RESPONSE = {
  featureFlags: {},
  configs: {},
};

function normalizeLookupKey(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/(?:[_\-\s]*dynamic)?[_\-\s]*config$/i, "")
    .replace(/[^a-z0-9]/g, "");
}

function valueByFlexibleName(values, name) {
  if (!values || typeof values !== "object") {
    return undefined;
  }

  if (Object.prototype.hasOwnProperty.call(values, name)) {
    return values[name];
  }

  const normalizedName = normalizeLookupKey(name);
  const matchingKey = Object.keys(values).find(function (key) {
    return normalizeLookupKey(key) === normalizedName;
  });

  return matchingKey ? values[matchingKey] : undefined;
}

function getStoredFeatureFlagResponse() {
  return window.featureFlagResponse || EMPTY_FEATURE_FLAG_RESPONSE;
}

function setStoredFeatureFlagResponse(response) {
  window.featureFlagResponse = {
    featureFlags:
      response && response.featureFlags && typeof response.featureFlags === "object"
        ? response.featureFlags
        : {},
    configs:
      response && response.configs && typeof response.configs === "object"
        ? response.configs
        : {},
  };

  return window.featureFlagResponse;
}

async function fetchFeatureFlagResponse() {
  const response = await fetch(FEATURE_FLAGS_API_URL, {
    method: "GET",
    headers: {
      user: FEATURE_FLAGS_USER,
      "X-API-Key": FEATURE_FLAGS_API_KEY,
    },
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error("Feature flag request failed with status " + response.status);
  }

  return response.json();
}

function getFeatureFlagValue(flagName, fallbackValue = false) {
  const value = valueByFlexibleName(
    getStoredFeatureFlagResponse().featureFlags,
    flagName
  );

  return typeof value === "boolean" ? value : fallbackValue;
}

function getFeatureConfigValue(configName, fallbackValue = {}) {
  const value = valueByFlexibleName(
    getStoredFeatureFlagResponse().configs,
    configName
  );

  return value === undefined ? fallbackValue : value;
}

function getAllFeatureFlags() {
  return getStoredFeatureFlagResponse().featureFlags;
}

function getAllFeatureConfigs() {
  return getStoredFeatureFlagResponse().configs;
}

async function initializeFeatureFlags() {
  if (window.featureFlagsInitPromise) {
    return window.featureFlagsInitPromise;
  }

  window.featureFlagsInitPromise = (async function () {
    try {
      const response = await fetchFeatureFlagResponse();
      setStoredFeatureFlagResponse(response);
    } catch (error) {
      setStoredFeatureFlagResponse(EMPTY_FEATURE_FLAG_RESPONSE);
      console.log("Failed to initialize feature flags:", error.message);
    }
  })();

  return window.featureFlagsInitPromise;
}

function whenFeatureFlagsReady() {
  return window.featureFlagsInitPromise || Promise.resolve();
}

window.featureFlagResponse = window.featureFlagResponse || EMPTY_FEATURE_FLAG_RESPONSE;
window.initializeFeatureFlags = initializeFeatureFlags;
window.initFeatureFlags = initializeFeatureFlags;
window.whenFeatureFlagsReady = whenFeatureFlagsReady;
window.getFeatureFlagValue = getFeatureFlagValue;
window.getFeatureConfigValue = getFeatureConfigValue;
window.getAllFeatureFlags = getAllFeatureFlags;
window.getAllFeatureConfigs = getAllFeatureConfigs;
