export function filterProvidersByAddress(providers, currentAddress) {
  if (!currentAddress) return providers;

  return providers.filter((provider) =>
    provider.serviceArea.some((area) => currentAddress.includes(area))
  );
}
