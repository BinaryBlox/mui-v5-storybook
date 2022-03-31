
//   color?: 'inherit' | 'primary' | 'secondary';
//   variant?: 'text' | 'outlined' | 'contained';


export type BxRequestType = 'getAll'|  'get'| 'create' | 'update' |  'deleate'; 
export type BxRequestAction = 'post'|  'put'| 'delete' | 'update' ; 

const defaultPageSize = 200;
const defaultPage = 1;

export const requestWrapper = (type: BxRequestType, action: BxRequestAction, entity?: any, page?: number, pageSize?: number, itemId?: string | number,  ): any => {
 
  const bxEntity = entity ? entity : {};

  const bxRequest = {
    metadata: {
      appAction: action,
      requestType:  type,
      page: page ? page : defaultPage,
      pageSize: pageSize ?  pageSize : defaultPageSize,
    },
    requestBody: {
      id: itemId,
      entity: bxEntity,
    },
  };

  return bxRequest;

};

export default requestWrapper;
