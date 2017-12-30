export interface Control<QueryType> {

  label: string

  fromGamepad?: boolean

  query(): QueryType

  /* Required for utility function in `or.spec.ts` to work. */
  [ key: string ]: any;

}
