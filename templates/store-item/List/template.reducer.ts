import { <%= storename %>Actions } from '../../actions/<%= namelower %>/<%= namelower %>.actions';
import { reimmutify<%= storename %> } from './<%= namelower %>.transformers';
import { I<%= storename %>, I<%= storename %>Item } from './<%= namelower %>.types';
import { INITIAL_STATE } from './<%= namelower %>.initial-state';

// Define the reducer that will initiate state changes for <%= namelower %>
export function <%= namelower %>Reducer(state: I<%= storename %> = INITIAL_STATE, action: any) {
  // will decide what state change is necessary based off the type
  switch (action.type) {
    case <%= storename %>Actions.EXAMPLE_STATE_INIT:
      return state.mergeWith((prev, next) => next, reimmutify<%= storename %>(action.payload));
    case <%= storename %>Actions.EXAMPLE_STATE_INSERT:
      let list = state.toJS();
      list.splice(action.payload.index, 0, action.payload.item);
      return state.mergeWith((prev, next) => next, reimmutify<%= storename %>(list)); 
    case <%= storename %>Actions.EXAMPLE_STATE_ERASE:
      return state.deleteIn([action.payload]);
    default:
      return state;
  }
}
