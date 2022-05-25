export interface PageQuery {
    pageNumber: number;
    pageSize: number;
}

export interface QueryBuilder {
    pageQuery: PageQuery;
    aditionalQuery: Map<string, string>;
    buildQueryMap(): Map<string, string>;
    BuildQueryString(): string;
    buildPageQueryMap(): Map<string, string>;
}

export class PageRequest implements QueryBuilder {

    constructor(public pageQuery: PageQuery,public aditionalQuery: Map<string, string>){}

    buildQueryMap(): Map<string, string> {
        let buildQueryMap = new Map<string, string>([...this.buildPageQueryMap()]);

        if(this.aditionalQuery){
            buildQueryMap = new Map<string, string>([...buildQueryMap, ...this.aditionalQuery])
        }

        return buildQueryMap;
    }

    BuildQueryString(): string {
        return Array.from(this.buildQueryMap()).map(itemArray=>`${itemArray[0]}=${itemArray[1]}}`).join("&");
    }

    buildPageQueryMap(): Map<string, string> {
        let buildPageQueryMap = new Map<string,string>();
        buildPageQueryMap.set("page", `${this.pageQuery.pageNumber}`);
        buildPageQueryMap.set("size", `${this.pageQuery.pageSize}`);

        return buildPageQueryMap;
    }

}


//export class Page<T>{

  //  constructor(public content: T[], public totalElements: Number){}

    //static fromResponse<T>(response: any){
      //  return new Page<T>(response.body, response.header.get)
    //}
//}