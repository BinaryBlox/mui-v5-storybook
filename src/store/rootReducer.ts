import { combineReducers } from '@reduxjs/toolkit';
// import { reducer as calendarReducer } from '../slices/calendar';
// import { reducer as chatReducer } from '../slices/chat';
// import { reducer as kanbanReducer } from '../slices/kanban';
// import { reducer as mailReducer } from '../slices/mail';
// import { globalReducer as globalReducer } from '../slices/globalApp';
import { reducer as startUpReducer } from '../slices/startUp';
import { accountFeatureReducers, accountFeatureEntityAdapters} from 'binaryblox-account-open-api-react-lib'; 
import { configurationFeatureReducers } from 'binaryblox-configuration-open-api-react-lib';
// export const rootReducer = combineReducers({
  
//   calendar: calendarReducer,
//   chat: chatReducer,
//   kanban: kanbanReducer,
//   mail: mailReducer
// });

const rootReducer = combineReducers({
  accountApi_PmTypes: accountFeatureReducers.pmTypes,
  accountApi_PmApplicationManagement: accountFeatureReducers.pmApplicationManagement,
  accountApi_PmEntityManagement: accountFeatureReducers.pmEntityManagement,
  accountApi_ClientApplication: accountFeatureReducers.clientApplication,
  accountApi_ApiUser: accountFeatureReducers.apiUser,
  accountApi_IdentityClient: accountFeatureReducers.identityClient,
  configurationApi_MapData: configurationFeatureReducers.mapData, 
  // calendar: calendarReducer,
  // chat: chatReducer,
  // kanban: kanbanReducer,
  // mail: mailReducer,
  startUp: startUpReducer,
  // global: globalReducer 
});

export default rootReducer;
