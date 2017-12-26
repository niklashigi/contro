export interface Control<QueryType> {

  label: string

  icons: string[]

  query(): QueryType

}
