/** Builds dot-notation keys for nested message objects, e.g. "hero.title" */
export type NestedKeyOf<T, Prefix extends string = ""> = T extends string
  ? Prefix extends "" ? never : Prefix
  : {
      [K in keyof T & string]: NestedKeyOf<
        T[K],
        Prefix extends "" ? K : `${Prefix}.${K}`
      >;
    }[keyof T & string];
