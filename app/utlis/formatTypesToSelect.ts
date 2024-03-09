type Option<K extends string> = { label: K; value: K };

export function mapItemToOption<T, K extends keyof T>(
  item: T,
  labelKey: K,
  valueKey: K
) {
  const label = item[labelKey];
  const value = item[valueKey];
  return { label, value };
}
