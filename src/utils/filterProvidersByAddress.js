// src/utils/filterProvidersByAddress.js
// 這個工具函數用來根據使用者的地址過濾店家列表
export function filterProvidersByAddress(providers, currentAddress) {
  if (!currentAddress) return providers;

  return providers.filter(provider =>
    provider.serviceArea.some(area => currentAddress.includes(area))
  );
}
