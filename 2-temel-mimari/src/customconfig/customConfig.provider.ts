export const CUSTOM_CONFIG = {
  customUrl: 'http://customapi.com',
  customKey: 'custom123',
};

export const CUSTOM_CONFIG_PROVIDER = {
  provide: 'CUSTOM_CONFIG',
  useValue: CUSTOM_CONFIG,
};
