// Generated with util/create-slice.js

import axios from 'axios';
import { AppThunk, RootState, useDispatch,  useSelector  } from '../../store';
import { actions } from './startUp.reducer';
 
import {
  accountFeatureEntityAdapters,
  BxPermEntityUserClaimAggregateViewModel,
  accountFeatureRequests,
  PmTypesApiFactory,
  PmEntityManagementApiFactory,
  PmApplicationManagementApiFactory

} from 'binaryblox-account-open-api-react-lib';
import { requestWrapper } from '../../utils/binaryblox/requestWrapper';  
// accountFeatureRequests.pmApplicationManagement.fetchGetAll_BxPermModuleRole_GetAll<RootState>(
//     PmApplicationManagementApiFactory,
//     requestWrapper('getAll', 'post', {}, 1, 200),
//     undefined,
//     '',
//     true
//   )
// Temporary Data to be provided by JWT token.
const clientApplicationId = 'd0a28076-1629-4558-6c33-08d9b8d14a96';
const entityId = '5154433e-f36b-1410-8fff-00f7ca0ad523';
const userId = '4b54433e-f36b-1410-8fff-00f7ca0ad523';

let entity: BxPermEntityUserClaimAggregateViewModel = {
  clientApplicationId: clientApplicationId,
  entityId: entityId,
  userId: userId,
};
 
export const fetchStartUps = (debug:boolean = false): AppThunk => async (dispatch) => {
  try {
    
    console.log('Retrieving StartUps data...');
 
    
    const entityApi = PmApplicationManagementApiFactory();
    dispatch(actions.getStartUps());

    let payload = null; //body;
    // if(debug){console.log(`PAYLOAD: ${JSON.stringify(payload, undefined, '\t')}`)};

    const pmTypesReqs = accountFeatureRequests.pmTypes;
    const pmEntityMgmtReqs = accountFeatureRequests.pmEntityManagement;
    const pmAppMgmtReqs = accountFeatureRequests.pmApplicationManagement;
    const defaultWrapper = requestWrapper('getAll', 'post', null, 1, 200);
    
    try {
 
      const res = await Promise.all([
        dispatch(pmTypesReqs.fetchGetAll_BxPermClaimType_GetAll<RootState>( PmTypesApiFactory, defaultWrapper, undefined, '', debug )), 
        dispatch(pmTypesReqs.fetchGetAll_BxPermEntityGroupType_GetAll<RootState>( PmTypesApiFactory, defaultWrapper, undefined, '', debug )), 
        dispatch(pmTypesReqs.fetchGetAll_BxPermEntityType_GetAll<RootState>( PmTypesApiFactory, defaultWrapper, undefined, '', debug )), 
        dispatch(pmTypesReqs.fetchGetAll_BxPermModuleType_GetAll<RootState>( PmTypesApiFactory, defaultWrapper, undefined, '', debug )), 
        dispatch(pmTypesReqs.fetchGetAll_BxPermRoleType_GetAll<RootState>( PmTypesApiFactory, defaultWrapper, undefined, '', debug )), 
        dispatch(pmTypesReqs.fetchGetAll_BxPermUserType_GetAll<RootState>( PmTypesApiFactory, defaultWrapper, undefined, '', debug )), 
        dispatch(pmEntityMgmtReqs.fetchGetAll_BxPermEntity_GetAll<RootState>( PmEntityManagementApiFactory, defaultWrapper, undefined, '', debug )), 
        dispatch(pmEntityMgmtReqs.fetchGetAll_BxPermEntityUserClaimsAggregate_GetAll<RootState>( PmEntityManagementApiFactory, requestWrapper('getAll', 'post', entity, 1, 200), undefined, '', debug )), 
        dispatch(pmAppMgmtReqs.fetchGetAll_BxPermClaim_GetAll<RootState>( PmApplicationManagementApiFactory, defaultWrapper, undefined, '', debug )), 
        dispatch(pmAppMgmtReqs.fetchGetAll_BxPermModuleClaim_GetAll<RootState>( PmApplicationManagementApiFactory, defaultWrapper, undefined, '', debug )), 
        dispatch(pmAppMgmtReqs.fetchGetAll_BxPermApplicationModuleRole_GetAll<RootState>( PmApplicationManagementApiFactory, defaultWrapper, undefined, '', debug )), 
        dispatch(pmAppMgmtReqs.fetchGetAll_BxPermModuleRoleClaim_GetAll<RootState>( PmApplicationManagementApiFactory, defaultWrapper, undefined, '', debug )), 
        dispatch(pmAppMgmtReqs.fetchGetAll_BxPermModuleRole_GetAll<RootState>( PmApplicationManagementApiFactory, defaultWrapper, undefined, '', debug )), 
        dispatch(pmAppMgmtReqs.fetchGetAll_BxPermModule_GetAll<RootState>( PmApplicationManagementApiFactory, defaultWrapper, undefined, '', debug )), 
      ])  

      if(debug)
        debugServiceResults(res);
       
      const result = res.map((res) => res.data);

      // console.log(result.flat()); 
      dispatch(actions.getStartUpsSuccess(result)); 
     
    } catch {
      throw Error('Promise failed');
    }
  } catch (err) { 
    dispatch(actions.getStartUpsFailure(err));
  }
};  

const debugServiceResults = (results: any[] ) => { 
    results.forEach(result => {
      if (result.action.error) {
        console.log(`ERROR: ${JSON.stringify(result.action.error, null, '\t')}`);
        // throw result.error
      }else{
        console.log(`SUCCESS: ${JSON.stringify(result.action, null, '\t')}`);
      }
    }); 
}