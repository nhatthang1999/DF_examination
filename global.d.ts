// Use type safe message keys with `next-intl`
type Messages = typeof import('./src/languages/vi.json');
declare interface IntlMessages extends Messages {}
